import Vue from 'vue'
import Vuex from 'vuex'
import fakexios from "@/store/services/fakexios";

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
    dollarToRuble: 80,
    basket: []
  },
  getters: {
    getCurGoods: state => state.curGoods,
    getBasket: state => state.basket,
    getDollarCourse: state => state.dollarToRuble
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
      state.curGoods = payload
    },
    ADD_ITEM_TO_BASKET(state, payload) {
      state.basket.push(payload)
    },
    DELETE_ITEM_FROM_BASKET(state, payload) {
      state.basket.splice(payload, 1)
    },
    CHANGE_AMOUNT(state, payload) {
      state.basket[payload.id].amount = parseInt(payload.amount, 10)
    }
  },
  actions: {
    // Start the whole program internally
    async jumpStart ({ dispatch }) {
      // dispatch('compileGoods')
      await dispatch('getGoods')
      await dispatch('getNames')
      dispatch('startTimer', 5)
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
          current[newGood.groupName].push(newGood)
        }
      }
      commit('SET_CURRENT_DATABASE', current)
    },
    addToBasket({ state, commit }, payload) {
      //Check if we have already added the good to basket
      for (let good of state.basket) {
        if (good.itemId === payload.id) {
          return false
        }
      }
      //If we haven't add the good, then add it from the existing list of good by id search
      for (let good of state.curGoods[payload.name]) {
        if (good.itemId === payload.id) {
          const item = {}
          Object.assign(item, good)
          item.amount = 1
          commit('ADD_ITEM_TO_BASKET', item)
        }
      }
    },
    deleteFromBasket({ state, commit }, payload) {
      for (let num in state.basket) {
        if (state.basket[num].itemId === payload) {
          commit('DELETE_ITEM_FROM_BASKET', num)
        }
      }
    },
    changeAmount({ state, commit }, payload) {
      if(parseInt(payload.amount, 10) === 0 || payload.amount > state.basket[payload.id].quantity) {
        commit('CHANGE_AMOUNT', { id: payload.id, amount: 1 })
        // return false
      } else {
        commit('CHANGE_AMOUNT', payload)
      }
    },
    startTimer({ dispatch }, payload) {
      setInterval(async () => {
        await dispatch('getGoods')
        await dispatch('getNames')
      }, payload * 1000)
    }
  },
  modules: {
  }
})
