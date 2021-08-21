import Vue from 'vue'
import Vuex from 'vuex'
import fakexios from "@/store/modules/fakexios";

const createError = (source, err) => {
  console.groupCollapsed('Errors')
  console.log(new Date().toLocaleTimeString() + " " + source + "\n" + err)
}

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    curGoods: {},
    nameDatabase: {},
    goodsDatabase: [],
    pollInterval: 15,
    dollarToRuble: 80
  },
  mutations: {
    SET_GOODS_DATABASE(state, payload) {
      state.goodsDatabase = payload
    },
    SET_NAME_DATABASE(state, payload) {
      // Just in case we scrap the original object, we create new one specifically for vuex
      Object.assign(state.nameDatabase, payload)
    },
    SET_CURRENT_DATABASE(state, payload) {
      console.log(payload)
      state.curGoods = payload
    }
  },
  actions: {
    // Start the whole program internally
    async jumpStart ({ dispatch }) {
      await dispatch('getGoods')
      await dispatch('getNames')
      dispatch('compileGoods')
    },
    //Get the goods themselves
    async getGoods ({ commit }) {
      try {
        const fetchedData = await fakexios.get('/goods')
        if(fetchedData.Error !== "") {
          console.log("Errored!", fetchedData.Error)
        } else if(fetchedData.Success === true && fetchedData.Value.Goods.length) {
          commit('SET_GOODS_DATABASE', fetchedData.Value.Goods)
        } else {
          createError("getGoods", "Unknown error or the response is empty")
        }
      } catch (e) {
        createError("getGoods", e)
      }
    },

    //Get the names database
    async getNames ({ commit }) {
      try {
        const fetchedNames = await fakexios.get('/names')
        if(fetchedNames) {
          commit('SET_NAME_DATABASE', fetchedNames)
        } else {
          createError("getNames ", "Unknown error or the response is empty")
        }
      } catch (e) {
        createError("getNames ", e)
      }
    },
    //Creating one united array for trade goods, with easy-to-read fieldnames and categories;
    //Also prevents asking "names.json" (remember, it's in some "distant"
    //database) for goods name and category everytime we need it
    async compileGoods ({ state, commit }) {
      const goods = state.goodsDatabase
      const names = state.nameDatabase
      const current = {}
      for (let tradeGood in goods) {
        const newGood = {
          groupId: goods[tradeGood]["G"],
          itemId: goods[tradeGood]["T"],
          price: goods[tradeGood]["C"],
          quantity: goods[tradeGood]["P"],
          groupName: names[goods[tradeGood]["G"]]["G"],
          itemName: names[goods[tradeGood]["G"]]["B"][goods[tradeGood]["T"]]["N"]
        }
        //Check if this group of goods exist; if not - create new one
        if(current[newGood.groupName]) {
          current[newGood.groupName].push(newGood)
        } else {
          current[newGood.groupName] = []
          current[newGood.groupName] = newGood.groupName
          current[newGood.groupName].push(newGood)
        }
      }
      console.log(current)
      commit('SET_CURRENT_DATABASE', current)
    }
  },
  modules: {
  }
})
