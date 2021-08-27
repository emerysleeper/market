const popup = {
    namespaced: true,
    state: {
        mode: null,
        itemId: null,
        sum: null
    },
    getters: {
        getPopupMode: state => state.mode,
        getItemId: state => state.itemId,
        getSum: state => state.sum
    },
    mutations: {
        SET_POPUP_MODE(state, payload) {
            state.mode = payload
        },
        SET_ITEM_ID(state, payload) {
            state.itemId = payload
        },
        SET_SUM(state, payload) {
            state.sum = payload
        }
    },
    actions: {
        setPopupMode({ commit }, payload) {
            commit('SET_POPUP_MODE', payload)
        },
        setItemToDelete({ commit }, payload) {
            commit('SET_ITEM_ID', payload)
        },
        setSum({ commit }, payload) {
            commit('SET_SUM', payload)
        }
    }
}

export default popup
