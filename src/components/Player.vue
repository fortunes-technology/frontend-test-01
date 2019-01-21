<template>
    <div class="modal-card" style="width: 640px; height: 385px" >
        <div class="frame">

        </div>
        <section class="modal-card-body">
            <iframe width="630" height="370"
                    :src="'https://www.youtube.com/embed/' + videoId">
            </iframe>
        </section>
    </div>
</template>

<script>
  export default {
    name: 'Player',
    props: {
      videoId: {
        type: String,
        required: true
      }
    }
  }
</script>

<style scoped>
    #app.light .modal-card {
        background-color: rgb(255, 255, 255)
    }
    #app.dark .modal-card {
        background-color: rgb(0, 0, 0)
    }
    #app .modal-card-body {
        background: none;
        padding: 5px;
        z-index: 1;
        overflow: hidden;
    }
    .modal-card {
        width: 100%;
        height: 100%;
    }
    #app.dark .modal-card .frame{
      background: url("../assets/frame_dark.svg") no-repeat;
      background-size: 100%;
      width: 100%;
      height: 100%;
      position:absolute;
      z-index: 2;
    }
    #app.light .modal-card .frame{
      background: url("../assets/frame_light.svg") no-repeat;
      background-size: 100%;
      width: 100%;
      height: 100%;
      position:absolute;
      z-index: 2;
    }
</style>
