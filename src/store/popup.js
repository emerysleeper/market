const popup = {
    namespaced: true,
    state: {
        mode: null
    },
    getters: {
        getPopupMode: state => state.mode
    },
    mutations: {
        SET_POPUP_MODE(state, payload) {
            state.mode = payload
        }
    },
    actions: {
        setPopupMode({ commit }, payload) {
            commit('SET_POPUP_MODE', payload)
        }
    }
}

export default popup
