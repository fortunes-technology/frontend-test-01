<template>
  <nav class="sidebar" role="navigation" aria-label="main navigation">
    <div class="has-text-centered logo-container">
      <img
        :src="require(settings.theme === 'light' ? '../assets/logo_light.png' : '../assets/logo_dark.png')"
        class="logo"
        width="200"
      />
    </div>

    <div class="buttons-list">
      <div
        class="sidebar-button"
        :class="{active: pageType === 'trailers'}"
        @click="onClickItem('trailers')">
        <router-link to="/">
          <p>TRAILERS</p>
        </router-link>
      </div>
      <div
        class="sidebar-button"
        :class="{active: pageType === 'options'}"
        @click="onClickItem('options')">
        <router-link to="/options">
          <p>OPTIONS</p>
        </router-link>
      </div>
      <div class="sidebar-button" @click="onClickItem('logout')">
        <p>LOGOUT</p>
      </div>
    </div>
  </nav>
</template>

<script>
  import router from '../router';

  export default {
    name: 'Navbar',
    props: {
      pageType: {
        type: String,
        required: true
      },
      settings: {
        type: Object,
        required: true
      },
      isMobile: {
        type: Boolean,
        required: true
      }
    },
    methods: {
      onClickItem: function (pageType){
        if (pageType === 'logout') {
          this.$store.commit('SET_IS_LOGGED_IN', false);
          router.go('/login');
        } else {
          this.$emit('clickMenuIem', pageType);
        }
      }
    }
  }
</script>

<style scoped >
  #app.light .sidebar {
    height: 100%;
    background-color:rgba(240, 240, 240, 0.8);
  }
  #app.dark .sidebar {
    height: 100%;
    background-color:rgba(20, 20, 20, 0.5);
  }
  .sidebar .logo-container {
    padding-top: 50px;
    height: 40%
  }
  .sidebar .sidebar-button {
    width: 220px;
    height: 50px;
    margin:auto;
    cursor:pointer;
    border:none;
    font-size: 15px;
  }
  .sidebar .sidebar-button.active {
    background:url(../assets/button.svg) no-repeat;
  }
  .sidebar .sidebar-button p{
    text-align: center;
    color: rgb(0, 0, 0);
    padding-top: 8px;
  }
  #app.light .sidebar .sidebar-button p {
    color: rgb(0, 0, 0);
  }
  #app.dark .sidebar .sidebar-button p {
    color: rgb(255, 255, 255);
  }
  .sidebar .buttons-list {
    width: 100%;
    padding-top: 60px;
    height: 60%
  }
  .mobile-view .logo-container{
    padding-top: 5px;
  }
  .mobile-view .buttons-list {
    padding-top: 0px;
  }
  .mobile-view .sidebar-button {
    height: 40px;
  }
</style>
