// import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    task: {},
    tasks:[],
    doctor: {},
    doctors:[],
    search: []
  },
  getters: {
    searTodos(state){
      return state.search
    }
  },
  mutations: {
    DELETE_DOC(state, id){
      const index = state.doctors.findIndex(doctor => doctor.id == id)
      state.doctors.splice(index, 1)
    },
    DELETE_TASK (state, id){
      const index = state.tasks.findIndex(task => task.id == id)
      state.tasks.splice(index, 1)
    },
    DELETE_SEC (state, id){
      const index = state.sections.findIndex(section => section.id == id)
      state.sections.splice(index, 1)
    },
    searchMut(state,items){
      state.search = items
    }
  },
  actions: {
    deleteDoctor ({commit}, id) {
      this.$http.delete('http://localhost:3000/doctors/' + id)
        .then(() => {              
            commit('DELETE_DOC', id)
        }); 
    },
    deleteTask ({commit}, id) {
      this.$http.delete('http://localhost:3000/tasks/' + id)
        .then(() => {              
            commit('DELETE_TASK', id)
        })
    },
    deleteSection ({commit}, id) {
      this.$http.delete('http://localhost:3000/sections/' + id)
        .then(() => {              
            commit('DELETE_SEC', id)
        })
    },
    searchPas({commit},data){
      commit('searchMut',data)
    }
  },
  modules: {
  }
})
