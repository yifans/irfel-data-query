import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  allPVs: [],
  selectedPVs: [],
  timeRange: [],
  historicalData: [],
  dialogTableVisible: false
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
    let url = '/retrieval/data/getData.qw?'
    let from = context.state.timeRange[0].toISOString()
    let to = context.state.timeRange[1].toISOString()
    var promiseArray = context.state.selectedPVs
      .map(pv => Vue.axios.get(url, {params: {pv, from, to}}))
    // console.log(context.state.selectedPVs.map(pv => url + '?pv=' + pv + '&from=' + from + '&to=' + to))
    Vue.axios.all(promiseArray)
      .then(function (result) {
        console.log(result)
        context.commit({
          type: 'setHistoricalData',
          data: result.map(resultItem => resultItem.data[0])
        })
      })
      .catch(function (error) {
        console.log('error', error)
      })
  }
}

const getters = {
  allPVs: state => state.allPVs,
  selectedPVs: state => state.selectedPVs,
  historicalData: state => state.historicalData,
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
          // console.log(tree)
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
