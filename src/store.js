import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    settings: {
      panelType: 'card',
      perPage: '20',
      theme: 'dark'
    },
    albums: [],
    searchFailed: false,
    isLoading: false,
    language: 'en_us',
    pageType: 'trailers',
    nextPageToken: null,
    isEndOfPage: false,
    isMobile: false,
    isLoggedIn: false,
    clientId: '149567073095-00dhjgk3le1j1v658enk23j4j6pelvos.apps.googleusercontent.com',
    playlistId: 'PL6t93nUFQQ1ZiXMfhPyhjb0PX3LgEVMcF',
    youtubeKey: 'AIzaSyCsGHePtETnZ7ui9X9Un2mgNX_pNWSqXM8'
  },
  getters: {
    GET_ALBUMS(state) {
      return state.albums
    },
    GET_NEXT_PAGE_TOKEN(state) {
      return state.nextPageToken
    },
    IS_LOGGED_IN(state) {
      return state.isLoggedIn
    },
    IS_MOBILE(state) {
      return state.isMobile
    },
    IS_LOADING(state) {
      return state.isLoading
    },
    IS_END_OF_PAGE(state) {
      return state.isEndOfPage
    },
    SEARCH_FAILED(state) {
      return state.searchFailed
    },
    PAGE_TYPE(state) {
      return state.pageType
    },
    GET_SETTINGS(state) {
      return state.settings
    },
    GET_CLIENT_ID(state) {
      return state.clientId;
    }
  },
  mutations: {
    SET_ALBUM(state, data) {
      state.albums = data
    },
    PUSH_ALBUM(state, albums) {
      for(const album of albums) {
        state.albums.push(album)
      }
    },
    SET_IS_LOGGED_IN(state, data) {
      state.isLoggedIn = data
    },
    SET_IS_MOBILE(state, data) {
      state.isMobile = data
    },
    SEARCH_FAILED(state, action) {
      state.searchFailed = action
    },
    IS_LOADING(state, action) {
      state.isLoading = action
    },
    SET_PAGE_TYPE(state, type) {
      state.pageType = type
    },
    SET_NEXT_PAGE_TOKEN(state, token) {
      state.nextPageToken = token
      if (!token) {
        state.isEndOfPage = true
      }
    },
    SET_SETTINGS(state, settings) {
      state.settings = settings
    }
  },
  actions: {
    LOAD_ALBUMS({commit, dispatch}, payload) {
      // show loading animation
      if (!payload.loadMore) {
        commit('IS_LOADING', true)
      }
      return axios.get(`${payload.url}`)
        .then((response) => {
          if (response.data.items.length === 0) {
            // if search response data results is empty commit search failed and clear the search input
            if (!payload.loadMore) {
              commit('SEARCH_FAILED', true)
              commit('IS_LOADING', false)
            }
          } else {
            // assign the search data results to set album state and query to set search query state
            if (!payload.loadMore) {
              commit('IS_LOADING', false)
              commit('SEARCH_FAILED', false)
              commit('SET_ALBUM', response.data.items)
            } else {
              commit('PUSH_ALBUM', response.data.items)
            }

            commit('SET_NEXT_PAGE_TOKEN', response.data.nextPageToken)
          }
        })
        .catch(() => {
          // if error commit search failed and clear the search input
          commit('SEARCH_FAILED', true)
          commit('IS_LOADING', false)
        })
    },
    GET_SETTINGS({commit, state}) {
      try {
        // assign settings localstorage to settings variable
        const settings = localStorage.getItem('settings')
        // check if settings variable is not null
        if (settings !== null) {
          // if not null assign the new setting array to the setting state
          commit('SET_SETTINGS', JSON.parse(settings))
        } else {
          // if null set the default state settings to localstorage
          localStorage.setItem('settings', JSON.stringify(state.settings))
        }
      } catch (e) {
        alert(e.message)
      }
    },
    UPDATE_SETTINGS({commit, state}, payload) {
      // destructure and assign payload objects and state to the new variables
      const {settingValue, settingName} = payload
      const {settings} = state
      // update settings by reassigning the settings object name to the payload object name
      settings[settingName] = settingValue
      // assign the new settings array to the settings state
      commit('SET_SETTINGS', settings)
      // assign the new settings array to the settings localstorage
      localStorage.setItem('settings', JSON.stringify(settings))
    }
  }
})
