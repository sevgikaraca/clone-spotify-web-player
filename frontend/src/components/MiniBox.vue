<template>
  <div class="row q-col-gutter-sm text-bold miniBox">
    <div class="col-3 no-padding no-margin float-left">
      <q-img
        :src="`${$axios.defaults.baseURL}/albums/albumCover/${song.album.albumCoverId}`"
        :ratio="1"
        class="image"
        height="100px"
        width="100px"
      />
    </div>
    <div class="col-7 q-mt-md">
      {{ song.name }}
      <br />
      {{ song.artists.length && song.artists[0].name }}
    </div>
    <div class="col-1 q-mt-md hidden-child">
      <q-btn
        v-if="!isPlaying"
        color="green"
        text-color="black "
        size="lg"
        icon="play_arrow"
        dense
        round
        @click="playSong(song), isPlaying = true"
      />
      <q-btn
        v-else
        color="green"
        text-color="black "
        size="lg"
        icon="pause"
        dense
        round
        @click="playSong(song), isPlaying = false"
      />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "MiniBox",

  data() {
    return {
      isPlaying: false,
    };
  },

  props: {
    song: {
      type: Object,
      required: true,
    },
    playButton: {
      type: Boolean,
      required: false,
      default: false,
    },
    iconName: {
      type: String,
      required: false,
      default: "play_arrow",
    },
  },
  methods: {
    ...mapActions("songs", ["addToQueue", "playSong"]),
    // playStopSong() {
    //   if (this.isPlaying == true) {
    //     this.isPlaying = false;
    //   } else {
    //     this.isPlaying = true;
    //     this.$emit("play", this.song);
    //   }
    // },
  },
};
</script>

<style lang="scss">
.miniBox {
  border: 0 solid #282828;
  border-radius: 5px;
  background-color: #303030 !important;
}

.image {
  border-left: 0 solid #282828;
  border-radius: 3px;
  padding: 20px;
  margin-right: 25px;
}

.miniBox .hidden-child {
  visibility: hidden;
}

.miniBox:hover {
  background-color: #465052;
  cursor: pointer
}
.miniBox:hover .hidden-child {
  visibility: visible;
}
</style>
