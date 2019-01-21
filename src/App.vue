<template>
  <div id="app" :class="settings.theme">
    <div class="columns app-wrapper" v-if="isLoggedIn"  :class="{'mobile-view': isMobile}">
      <div class="column is-one-third navvar-wrapper">
        <navbar
          @clickMenuIem="setPageType"
          :pageType="pageType"
          :theme="settings.theme"
          :settings="settings"
          :isMobile="isMobile">
        </navbar>
      </div>
      <div class="column is-two-thirds content-wrapper">
        <router-view/>
      </div>
    </div>
    <div class="app-wrapper" v-if="!isLoggedIn">
      <router-view/>
    </div>
  </div>
</template>

<script>
  import Navbar from './components/Navbar'
  import AlbumList from './components/AlbumList'
  import { mapGetters } from 'vuex'

  export default {
    name: 'app',
    data() {
      return {
        isMobile: false,
        windowWidth: window.innerWidth,
      }
    },
    components: {
      Navbar,
      AlbumList
    },
    computed: {
      ...mapGetters({
        albums: 'GET_ALBUMS',
        pageType: 'PAGE_TYPE',
        isLoading: 'IS_LOADING',
        searchFailed: 'SEARCH_FAILED',
        settings: 'GET_SETTINGS',
        isLoggedIn: 'IS_LOGGED_IN'
      })
    },
    created() {
      this.$store.dispatch('GET_SETTINGS')
      this.loadAlbums()
      this.$store.commit('SET_PAGE_TYPE', 'trailers')
    },
    mounted() {
      window.onresize = () => {
        this.windowWidth = window.innerWidth
        if (this.windowWidth <= 768) {
          this.isMobile = true
          this.$store.commit('SET_IS_MOBILE', true)
        } else {
          this.isMobile = false
          this.$store.commit('SET_IS_MOBILE', false)
        }
      }
    },
    methods: {
      loadAlbums() {
        const payload = {'url': `/api/youtube/v3/playlistItems?playlistId=${this.$store.state.playlistId}&part=snippet,contentDetails&maxResults=5&key=${this.$store.state.youtubeKey}`}
        this.$store.dispatch('LOAD_ALBUMS', payload)
      },
      updateSettings(settingName, settingValue) {
        const payload = {'settingName': settingName, 'settingValue': settingValue}
        this.$store.dispatch('UPDATE_SETTINGS', payload)
      },
      setPageType(pageType) {
        if (pageType !== this.pageType) {
          this.$store.commit('SET_PAGE_TYPE', pageType)
        }
      }
    }
  }
</script>
<style lang="scss">
  // Import Bulma's core
  @import "~bulma/sass/utilities/_all";

  // Set your colors
  $primary: #A99E7E;
  $primary-invert: findColorInvert($primary);

  // Setup $colors to use as bulma classes (e.g. 'is-twitter')
  $colors: (
    "white": ($white, $black),
    "black": ($black, $white),
    "light": ($light, $light-invert),
    "dark": ($dark, $dark-invert),
    "primary": ($primary, $primary-invert),
    "info": ($info, $info-invert),
    "success": ($success, $success-invert),
    "warning": ($warning, $warning-invert),
    "danger": ($danger, $danger-invert),
  );

  // Links
  $link: $primary;
  $link-invert: $primary-invert;
  $link-focus-border: $primary;

  // Import Bulma and Buefy styles
  @import "~bulma";
  @import "~buefy/src/scss/buefy";

  .list-enter-active {
    transition: all .5s;
  }

  .list-leave-active {
    transition: all .5s;
  }

  .list-enter,
  .list-leave-to {
    opacity: 0;
    transform: translateY(20px);
  }

  html,
  body {
    height: 100%;
    overflow: hidden;
  }

  #app {
    background: url("./assets/background.png") no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    height: 100%
  }

  #app .app-wrapper {
    height: 100%;
    margin: 0px;
  }

  #app .app-wrapper.mobile-view {
    overflow: scroll
  }

  #app .app-wrapper .navvar-wrapper {
    padding: 0px;
    background-image: url("./assets/separator.svg");
    background-repeat: no-repeat;
    background-position: right;
    background-size: auto 100%;
  }

  #app.light .app-wrapper .content-wrapper {
    padding: 0px;
    color: rgb(0, 0, 0);
    /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#1e5799+0,ffffff+0,ffffff+100&1+0,1+0,0.7+100 */
    background: -moz-linear-gradient(left, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.7) 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(left, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.7) 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to right, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.7) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffffff', endColorstr='#b3ffffff', GradientType=1); /* IE6-9 */
  }

  #app.dark .app-wrapper .content-wrapper {
    padding: 0px;
    color: rgb(255, 255, 255);
    background: -moz-linear-gradient(left, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.7) 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(left, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.7) 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to right, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.7) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#e6000000', endColorstr='#b3000000', GradientType=1); /* IE6-9 */
  }

  /* width */
  ::-webkit-scrollbar {
    width: 5px;
    padding-right: 5px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    width: 1px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: $primary;
    border-radius: 5px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
</style>
