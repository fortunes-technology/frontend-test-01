<template>
  <div class="login-wrapper">
      <div class="login">
          <img
                  src="../assets/logo_dark.png"
                  class="logo"
                  width="300"
          />

          <GoogleLogin :client_id="clientId" :onSuccess="onSuccess" :onFailure="onFailure" class="login-button">LOGIN WITH MY GOOGLE ACCOUNT</GoogleLogin>
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import GoogleLogin from 'vue-google-login';
import router from '../router';


export default {
  computed: {
    ...mapGetters({
      albums: 'GET_ALBUMS',
      isLoading: 'IS_LOADING',
      searchFailed: 'SEARCH_FAILED',
      settings: 'GET_SETTINGS',
      isMobile: 'IS_MOBILE',
      clientId: 'GET_CLIENT_ID'
    })
  },
  methods: {
    onClickLogin () {
      this.$store.commit('SET_IS_LOGGED_IN', true)
    },
    onSuccess(googleUser) {
      console.log(googleUser)
      this.$store.commit('SET_IS_LOGGED_IN', true)
      router.push({ name: 'home' })
    },
    onFailure(error) {
      console.log(error)
    }
  },
  components: {
    GoogleLogin
  },
};
</script>

<style scoped>
    .login-wrapper {
        height: 100%;
        width: 100%;
        background-color:rgba(20, 20, 20, 0.7);
    }

    .login-wrapper .login{
        margin: auto;
        top: 50%;
        position:relative;
        transform: perspective(1px) translateY(-50%);
        text-align: center;
    }

    .login-wrapper .login .login-button {
        width: 300px;
        height: 50px;
        margin:auto;
        margin-top: 30px;
        cursor:pointer;
        border:none;
        font-size: 15px;
        background:url(../assets/button.svg) no-repeat;
        background-size: 100%;
        position:relative;
        display:block;
        color: #A99E7E;
    }

</style>
