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
        // Setting it so that we would see, what item is going to be deleted in the popup;
        // ATTENTION: the payload here is a place in basket array, not internal itemId from goods
        setItemToDelete({ commit }, payload) {
            commit('SET_ITEM_ID', payload)
        },
        //Setting the sum so that we would see the sum of all prices when we click "buy"
        setSum({ commit }, payload) {
            commit('SET_SUM', payload)
        }
    }
}

export default popup
