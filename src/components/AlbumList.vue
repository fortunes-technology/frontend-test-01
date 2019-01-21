<template>
  <div class="section album-list">
    <transition name="list" mode="out-in">
      <div class="columns is-multiline is-mobile" v-if="!isLoading && displayedAlbums.length > 0">
        <div
          class="column card-wrapper"
          :class="['is-6-widescreen  is-6-desktop is-6-tablet is-12-mobile']"
          @click="onClickPlayVideo(album)"
          v-for="album in displayedAlbums" :key="album.id"
        >
          <div class="card-image">
            <div class="frame">

            </div>
            <figure class="image is-16by9">
              <img :src="album.snippet.thumbnails.medium.url" :alt="album.snippet.title">
            </figure>
            <div class="card-content">
              <div class="overflow-content">
                <div class="is-6">
                  <span>{{album.snippet.title}}</span>
                </div>
              </div>
            </div>
          </div>
          <!-- Media -->
        </div>

        <div  class="column card-wrapper" :class="['is-6-widescreen  is-6-desktop is-6-tablet is-12-mobile']" v-if="!isEndOfPage">

          <div class="card-image">
            <div
              class="loadmore-button"
              @click="onClickLoadMore"
            >
              <p>LOAD MORE</p>
            </div>
          </div>
          <!-- Media -->
        </div>
      </div>
    </transition>
    <div v-if="isLoading">
      <div class="loading">
        <b-loading :is-full-page="false" :active.sync="isLoading" :can-cancel="false"></b-loading>
      </div>
    </div>
    <template v-if="searchFailed && !isLoading">
      <div class="columns is-multiline is-mobile">
        <div class="column">
          <h3 class="title is-4 has-text-centered">Nothing found. </h3>
        </div>
      </div>
    </template>

    <b-modal
      :active.sync="isPlayerModalActive"
      has-modal-card>
      <player :videoId="videoId">
      </player>
    </b-modal>
  </div>


</template>

<script>
  import Player from '../components/Player'

  export default {
    name: 'AlbumList',
    data () {
      return {
        current: 1,
        order: 'is-centered',
        size: '',
        isSimple: false,
        isRounded: false,
        isPlayerModalActive: false,
        videoId: ''
      }
    },
    props: {
      albums: {
        type: Array,
        required: true
      },
      isLoading: {
        type: Boolean,
        required: true
      },
      searchFailed: {
        type: Boolean,
        required: true
      },
      settings: {
        type: Object,
        required: true
      },
      isMobile: {
        type: Boolean,
        required: true
      },
      isEndOfPage: {
        type: Boolean,
        required: true
      }
    },
    computed: {
      displayedAlbums () {
        return this.paginate(this.albums)
      }
    },
    components: {
      Player
    },
    methods: {
      paginate (albums) {
        let current = this.current
        let perPage = this.settings.perPage
        let from = (current * perPage) - perPage
        let to = (current * perPage)
        return albums.slice(from, to)
      },
      onClickLoadMore () {
        this.$emit('loadMore')
      },
      onClickPlayVideo(album) {
        this.isPlayerModalActive = true;
        this.videoId = album.contentDetails.videoId;
      }
    }
  }
</script>

<style scoped>

  .album-list {
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    position: relative;
    /*position: absolute;*/
    margin: 0px;
  }

  .album-list .card-wrapper {
    background-size: 100%;
    color: #ffffff;
    text-align: center;
    max-width: 380px;
  }

  .album-list .card-wrapper .frame {
    background-size: 100%;
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 2;
  }
  #app.light .album-list .card-wrapper .frame {
    background: url("../assets/frame_light.svg") no-repeat;
  }

  #app.dark .album-list .card-wrapper .frame {
    background: url("../assets/frame_dark.svg") no-repeat;
  }

  .album-list .card-wrapper .card-image {
    height: 100%;
  }

  .album-list .card-wrapper .card-image .image {
    margin: 2px;
    top: 1px;
  }

  .album-list .card-wrapper .card-content {
    background-color:rgba(20, 20, 20, 0.7);
    margin: 2px;
    margin-top: -64px;
    position: relative;
  }
  .album-list .card-wrapper .loadmore-button {
    width: 220px;
    height: 50px;
    margin:auto;
    cursor:pointer;
    border:none;
    font-size: 15px;
    background:url(../assets/button.svg) no-repeat;
    top: 50%;
    position:relative;
    transform: perspective(1px) translateY(-50%);
  }
  .album-list .card-wrapper .loadmore-button p {
    text-align: center;
    color: #A99E7E;
    padding-top: 8px;
  }
  .loading {
    padding-top:50px;
    height: 300px;
  }
  .overflow-content div {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
  }
</style>
