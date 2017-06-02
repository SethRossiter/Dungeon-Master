import axios from 'axios'
import router from '../router'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


let api = axios.create({
  baseURL: 'https://vue-kanban-vail.herokuapp.com/api/',
  timeout: 2000,
  withCredentials: true
})
let auth = axios.create({
  baseURL: 'https://vue-kanban-vail.herokuapp.com/',
  timeout: 2000,
  withCredentials: true
})

// REGISTER ALL DATA HERE
let state = {
  boards: [],
  activeBoard: {},
  activeLists: [],
  createLists: {},
  removeLists: {},
  removeBoard: {},
  activeTasks: {},
  createTasks: {},
  createNewTask: {},
  removeTasks: {},
  moveTasks: {},
  activeComments: {},
  createComments: {},
  removeComments: {},
  error: {},
  user: {}
}

let handleError = (state, err) => {
  state.error = err
}

export default new Vuex.Store({
  // ALL DATA LIVES IN THE STATE
  state,

  mutations: {
    setBoards(state, boards) {
      state.boards = boards
    },
    setActiveBoard(state, activeBoard) {
      state.activeBoard = activeBoard
    },
    activeLists(state, activeLists) {
      state.activeLists = activeLists.lists
    },
    activeTasks(state, activeTasks){
      Vue.set(state.activeTasks, activeTasks._id, activeTasks.tasks)
      //state.activeTasks[activeTasks._id] = activeTasks.tasks
    },
    activeComments(state, activeComments){
      Vue.set(state.activeComments, activeComments._id, activeComments.comments)
      //state.activeComments[activeComments._id] = activeComments.comments
    },
    user(state, user){
      state.user = user
    }
  },

  // ACTIONS ARE RESPONSIBLE FOR MANAGING ALL ASYNC REQUESTS
  actions: {
    getBoards({ commit, dispatch }) {
      api('userboards')
        .then(res => {
          commit('setBoards', res.data.data)
        })
        .catch(handleError)
    },
    getBoard({ commit, dispatch }, id) {
      api('boards/' + id)
        .then(res => {
          commit('setActiveBoard', res.data.data)
        })
        .catch(handleError)
    },
    createBoard({ commit, dispatch }, board) {
      api.post('boards/', board)
        .then(res => {
          dispatch('getBoards')
        })
        .catch(handleError)
    },
    removeBoard({ commit, dispatch }, board) {
      api.delete('boards/' + board._id)
        .then(res => {
          dispatch('removeBoard')
        })
        .catch(handleError)
    },
    getLists({ commit, dispatch }, id) {
      api('/boards/' + id + '/lists/')
        .then(res => {
          commit('activeLists', res.data.data)
        })
        .catch(handleError)
    },
    createLists({ commit, dispatch }, list) {
      api.post('lists/', list)
        .then(res => {
          dispatch('getLists', list.boardId)
        })
        .catch(handleError)
    },
    removeLists({ commit, dispatch }, list) {
      api.delete('lists/' + list._id)
        .then(res => {
          dispatch('removeLists', list.boardId)
        })
        .catch(handleError)
    },
    getTasks({ commit, dispatch }, task) {
      api('boards/' + task.boardId + '/lists/' + task._id + '/tasks')
        .then(res => {
          commit('activeTasks', res.data.data)
        })
        .catch(handleError)
    },
    moveTasks({ commit, dispatch }, task) {
      api.put('tasks/'+ task._id, task)
        .then(res => {
          dispatch('getTasks', {boardId: task.boardId, _id:task.listId})
        })
        .catch(handleError)
    },
    // createTasks({ commit, dispatch }, task) {
    //   api.post('task/', task)
    //     .then(res => {
    //       dispatch('getTasks', task.boardId, task.listId)
    //     })
    //     .catch(handleError)
    // },
    createNewTask({ commit, dispatch }, task) {
      api.post('tasks/', task)
        .then(res => {
          dispatch('getTasks', {boardId: task.boardId, _id:task.listId})
        })
        .catch(handleError)
    },
    removeTasks({ commit, dispatch }, task) {
      api.delete('tasks/' + task._id)
        .then(res => {
          dispatch('getTasks', {boardId: task.boardId, listId: task.listId})
        })
        .catch(handleError)
    },
    getComments({ commit, dispatch }, comments) {
      api('boards/' + comments.boardId + '/lists/' + comments.listId + '/tasks/' + comments._id + '/comments')
        .then(res => {
          commit('activeComments', res.data.data)
        })
        .catch(handleError)
    },
    removeComments({ commit, dispatch }, comments) {
      api.delete('comments/' + comments._id)
        .then(res => {
        dispatch('removeComments', {boardId: comments.boardId, listId:comments.listId, taskId: comments.taskId})
        })
        .catch(handleError)
    },
    createComments({ commit, dispatch }, comments) {
      api.post('comments/', comments)
        .then(res => {
          dispatch('getComments', {boardId: comments.boardId, listId:comments.listId, _id: comments.taskId})
        })
        .catch(handleError)
    },
    login({ commit, dispatch }, user) {
      auth.post('login', user)
        .then(res => {
          console.log(res)
          if (res.data.error) {
            return handleError(res.data.error)
          }
          commit('user', res.data.data)
          router.push('/boards')
        })
        .catch(handleError)
    },
    register({ commit, dispatch }, user) {
      auth.post('register', user)
        .then(res => {
          console.log(res)
          if (res.data.error) {
            return handleError(res.data.error)
          }
          //LETS REDIRECT THE PAGE
          state.user = res.data//commit
          router.push('/boards')
        })
        .catch(handleError)
    },
    getAuth() {
      auth('authenticate')
        .then(res => {
          if (!res.data.data) {
            return router.push('/login')
          }
          state.user = res.data.data
          router.push('/boards')
        }).catch(err => {
          router.push('/login')
        })
    },
    clearError() {
      state.error = {}
    }
  }
})