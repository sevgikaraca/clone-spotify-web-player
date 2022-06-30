<template>
  <q-page class="pageContainer" style="background-color: #202020">
    <div class="row headerDiv">
      <div class="col-2 q-ml-md q-mt-xl">
        <h4 class="text-white text-bold">{{ this.greeetingMessage }}</h4>
      </div>
    </div>
    <div class="q-px-sm">
      <div class="row q-col-gutter-lg ">
        <div
          class="col-4 text-white"
          v-for="(song, index) in this.recommendedSongs"
          :key="song"
        >
          <MiniBox v-if="index < 6" :song="song" v-on:play="onPlaySong" />
        </div>
      </div>
      <div class="row header-box q-col-gutter-sm q-my-sm">
        <div
          class="text-white text-bold col-10 q-mt-md"
          style="font-size: 22px"
        >
          Your Daily Music Needs
        </div>
        <div class="col-2 float-right flex justify-end q-mt-md">
          <q-btn
            flat
            style="color: #fff"
            label="See All"
            size="md"
            v-if="allPlaylists.length > 8"
          />
        </div>
      </div>
      <div class="row header-box q-col-gutter-sm" v-if="allPlaylists.length">
        <div class="box" v-for="(playlist, index) in allPlaylists" :key="playlist">
          <ListBox v-if="index < 8" :playlist="playlist" />
        </div>
      </div>
      <!-- <h6 class="text-white text-bold">Made for you</h6>
      <div class="row q-col-gutter-lg">
        <div class="box">
          <ListBox />
        </div>
      </div> -->
    </div>
  </q-page>
</template>

<script>
import MiniBox from "../components/MiniBox";
import ListBox from "../components/ListBox";
import { mapActions } from "vuex";

export default {
  name: "LandingPage",

  components: {
    MiniBox,
    ListBox,
  },

  data() {
    return {
      greeetingMessage: "",
      recommendedSongs: [],
      allPlaylists: [],
    };
  },
  methods: {
    ...mapActions("songs", ["addToQueue", "playSong"]),
    getTime() {
      const date = new Date();
      let hours = date.getHours();
      let status =
        hours < 12
          ? "Good Morning"
          : hours <= 18 && hours >= 12
          ? "Good Afternoon"
          : "Good Night";
      this.greeetingMessage = status;
      this.$axios.get("/songs").then((response) => {
        let songs = response.data;
        songs.forEach((song) => {
          this.recommendedSongs.push(song);
        });
      });
    },
    onPlaySong(song) {
      this.playSong(song);
    },
    getPlaylists() {
      this.$axios.get("/lists").then((response) => {
        this.allPlaylists = response.data;
      });
    },
  },
  mounted() {
    this.getTime();
    this.getPlaylists();
  },
};
</script>

<style lang="scss">
.boxcolor {
  background-color: #282828;
  color: #fff;
}
.darkcolor {
  background-color: #282828;
  color: #fff;
}

.pageContainer {
  padding-top: 0px !important;
  margin-top: 0px !important;
  margin-left: 1vw;
  margin-right: 1vw;
}

.headerDiv {
  background: #202020;
}

.box {
  width: 10vw !important;
}

.header-box {
  // justify-content: space-between;
}
</style>
