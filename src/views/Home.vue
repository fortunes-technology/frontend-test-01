<template>
  <album-list
          @loadMore="loadMore"
          :albums="albums"
          :isLoading="isLoading"
          :searchFailed="searchFailed"
          :settings="settings"
          :isMobile="isMobile"
          :isEndOfPage="isEndOfPage"
  >
  </album-list>
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
      isMobile: 'IS_MOBILE',
      isEndOfPage: 'IS_END_OF_PAGE'
    })
  },
  components: {
    AlbumList
  },
  methods: {
    loadMore() {
      const payload = {
        url: `/api/youtube/v3/playlistItems?playlistId=${this.$store.state.playlistId}&part=snippet,contentDetails&maxResults=5&key=${this.$store.state.youtubeKey}&pageToken=${this.$store.state.nextPageToken}`,
        loadMore: true
      }
      this.$store.dispatch('LOAD_ALBUMS', payload)
    },
  }
};
</script>

<style scoped>

</style>
