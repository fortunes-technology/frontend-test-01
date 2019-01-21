<template>
    <div class="options-wrapper">
        <div class="options">
            <div class="theme-title">
                Theme
            </div>

            <b-switch
                    class="theme-switch"
                    v-model="settings.theme"
                    false-value="light"
                    true-value="dark">
                {{ settings.theme }}
            </b-switch>
        </div>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import AlbumList from '../components/AlbumList'

  export default {
    computed: {
      ...mapGetters({
        albums: 'GET_ALBUMS',
        isLoading: 'IS_LOADING',
        searchFailed: 'SEARCH_FAILED',
        settings: 'GET_SETTINGS',
        isMobile: 'IS_MOBILE'
      })
    },
    watch: {
      'settings.theme'(settingValue) {
        console.log('theme setting updated', settingValue);
        this.updateSettings('theme', settingValue)
      }
    },
    methods: {
      updateSettings (settingName, settingValue) {
        const payload = { 'settingName': settingName, 'settingValue': settingValue }
        this.$store.dispatch('UPDATE_SETTINGS', payload)
      },
    },
    components: {
    },
  }
</script>

<style scoped>
    .options-wrapper {
        height: 100%;
    }

    .options-wrapper .options{
        margin: auto;
        top: 50%;
        position:relative;
        transform: perspective(1px) translateY(-50%);
        padding-left:50px;
    }

    .options-wrapper .options .theme-title{
        font-size: 32px;
        padding-bottom: 10px;
    }
    .options-wrapper .options .theme-switch {
        text-transform: capitalize;
    }
    .mobile-view .options-wrapper .options{
        transform: none;
        position: inherit;
    }
</style>
