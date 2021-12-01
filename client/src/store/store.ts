import { createStore } from "vuex";
import { COLORS } from "../constants";

interface StoreState { 
    playerColor: string 
    colorPickerOpen: boolean
}

export const store = createStore({
  state(): StoreState {
    return {
        playerColor: COLORS[0],
        colorPickerOpen: false
    }
  },
  mutations: {
      setColor(state: StoreState, color: string) {
        state.playerColor= color
      },
      showColorPicker(state: StoreState) {
          state.colorPickerOpen= true
      },
      hideColorPicker(state: StoreState) {
          state.colorPickerOpen= false
      }
  },
  actions: {
    setColor({ commit, dispatch }, color: string) {
      commit('setColor', color)
      dispatch('hideColorPicker')
    },
    showColorPicker({ commit }) {
        commit('showColorPicker')
    },
    hideColorPicker({ commit }) {
        commit('hideColorPicker')
    },
  },
  modules: {}
});

export default store;