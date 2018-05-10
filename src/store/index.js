import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  allPVs: [],
  selectedPVs: [],
  timeRange: [],
  historicalData: {},
  metaData: {},
  queryFormat: 'qw',
  downloadFormat: 'csv',
  dialogTableVisible: false,
  dialogDownloadVisible: false,
  dialogStatisticsVisible: false
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
  setMetaData (state, payload) {
    state.metaData = payload.meta
  },
  setDialogTableVisible (state, payload) {
    state.dialogTableVisible = payload.visible
  },
  setDialogDownloadVisible (state, payload) {
    state.dialogDownloadVisible = payload.visible
  },
  setDialogStatisticsVisible (state, payload) {
    state.dialogStatisticsVisible = payload.visible
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
    var promiseArray = context.getters.queryURLs
      .map(url => Vue.axios.get(url))
    Vue.axios.all(promiseArray)
      .then(function (result) {
        console.log('get Data from AA', result)
        let dataTmp = {}
        let metaTmp = {}
        result.map(function (resultItem) {
          let pvName = resultItem.data[0].meta.name
          let meta = resultItem.data[0].meta
          let data = resultItem.data[0].data
          dataTmp[pvName] = data
          metaTmp[pvName] = meta
        })
        context.commit({
          type: 'setHistoricalData',
          data: dataTmp
        })
        context.commit({
          type: 'setMetaData',
          data: metaTmp
        })
      })
      .catch(function (error) {
        console.log('error', error)
      })
  }
}

const getters = {
  // allPVs: state => state.allPVs,
  // selectedPVs: state => state.selectedPVs,
  // historicalData: state => state.historicalData,
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
