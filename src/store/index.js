import Vue from 'vue'
import Vuex from 'vuex'
import config from './config'

Vue.use(Vuex)

const state = {
  allPVs: [],
  selectedPVs: [],
  timeRange: [],
  historicalData: [],
  queryFormat: 'qw',
  downloadFormat: 'csv',
  dialogTableVisible: false,
  dialogDownloadVisible: false,
  dialogStatisticsVisible: false,
  logarithmic: false
}

const mutations = {
  setAllPVs (state, payload) {
    state.allPVs = payload.pvs
  },
  setSelectedPVs (state, payload) {
    state.selectedPVs = payload.pvs
  },
  setTimeRange (state, payload) {
    state.timeRange = payload.timeRange
  },
  setHistoricalData (state, payload) {
    state.historicalData = payload.data
  },
  setDialogTableVisible (state, payload) {
    state.dialogTableVisible = payload.visible
  },
  setDialogDownloadVisible (state, payload) {
    state.dialogDownloadVisible = payload.visible
  },
  setDialogStatisticsVisible (state, payload) {
    state.dialogStatisticsVisible = payload.visible
  },
  setLogarithmic (state, payload) {
    state.logarithmic = payload.value
  }
}

const actions = {
  getAllPVs (context) {
    var url = '/bpl/getAllPVs'
    Vue.axios.get(url, {
      params: {
        limit: -1
      }
    })
      .then(response => {
        context.commit({
          type: 'setAllPVs',
          pvs: response.data
        })
      })
      .catch(error => {
        console.log(error)
      })
  },
  getHistoricalData (context) {
    // console.log('query urls', context.getters.queryURLs)
    var promiseArray = context.getters.queryURLs
      .map(url => Vue.axios.get(url))
    Vue.axios.all(promiseArray)
      .then(function (result) {
        // console.log('get Data from AA', result)
        let dataTmp = []
        result.map(function (resultItem) {
          let obj = {}
          obj.pvName = resultItem.data[0].meta.name
          obj.EGU = resultItem.data[0].meta.EGU
          obj.PREC = resultItem.data[0].meta.PREC
          obj.waveform = resultItem.data[0].meta.waveform
          obj.data = resultItem.data[0].data
          // data format
          let point = 4
          obj.data.map(function (item) {
            if (item.val > Math.pow(10, -point)) {
              item.val = Number(item.val.toFixed(point))
            }
          })
          dataTmp.push(obj)
        })
        context.commit({
          type: 'setHistoricalData',
          data: dataTmp
        })
      })
      .catch(function (error) {
        console.log('error', error)
      })
  }
}

const getters = {
  queryURLs: function (state) {
    let urlHeader = '/retrieval/data/getData.' + state.queryFormat
    let from = state.timeRange[0].toISOString()
    let to = state.timeRange[1].toISOString()
    let urls = state.selectedPVs.map(pv => urlHeader + '?pv=' + pv + '&from=' + from + '&to=' + to)
    return urls
  },
  downloadURLs: function (state) {
    let urlHeader = '/retrieval/data/getData.' + state.downloadFormat
    if (state.timeRange.length === 0) return []
    let from = state.timeRange[0].toISOString()
    let to = state.timeRange[1].toISOString()
    let urls = state.selectedPVs.map(pv => urlHeader + '?pv=' + pv + '&from=' + from + '&to=' + to)
    return urls
  },
  pvChartOptions (state) {
    let options = config.chartDefaultConfig
    let isLogarithmic = state.logarithmic
    let rawData = state.historicalData
    if (JSON.stringify(state.historicalData) === '{}') return options
    options.yAxis = rawData.map(function (dataItem, index, arr) {
      let obj = {
        id: dataItem.pvName,
        visible: false,
        title: {
          text: dataItem.pvName + ' (' + dataItem.EGU + ')'
        }
      }
      if (dataItem.pvName === config.referencePV) {
        obj.opposite = true
        obj.visible = true
      } else {
        if (isLogarithmic === true) {
          obj.type = 'logarithmic'
        }
        if ((arr[0].pvName === config.referencePV && index === 1) || (arr[0].pvName !== config.referencePV && index === 0)) {
          // 只有选择的第一个变量轴可见
          obj.visible = true
        }
        obj.opposite = false
      }
      return obj
    })
    options.series = rawData.map(function (dataItem) {
      return {
        yAxis: dataItem.pvName,
        name: dataItem.pvName,
        data: dataItem.data.map(data => [data.millis, data.val])
      }
    })
    return options
  },
  pvTree: function (state) {
    var allPVs = state.allPVs
    var tree = {
      label: 'pvtree',
      children: []
    }
    for (let pvIndex in allPVs) {
      var pointer = tree
      let pvNameString = allPVs[pvIndex].split(/[:_-]/)
      for (let i in pvNameString) {
        let flag = false
        for (let j in pointer['children']) {
          if (pointer['children'][j]['label'] === pvNameString[i]) {
            pointer = pointer['children'][j]
            flag = true
            break
          }
        }
        if (flag === false) {
          let obj = {}
          if (i === (pvNameString.length - 1).toString()) {
            // 叶节点
            obj = {
              'label': pvNameString[i],
              'pvName': allPVs[pvIndex]
            }
          } else {
            obj = {
              'label': pvNameString[i],
              'children': []
            }
          }

          pointer['children'].push(obj)
          let childrenCount = pointer['children'].length
          pointer = pointer['children'][childrenCount - 1]
        }
      }
    }
    return tree['children']
  }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
