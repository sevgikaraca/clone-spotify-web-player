<template>
  <q-page class="pageContainer" style="background-color: #121212">
    <div class="row headerDiv">
      <div class="col-2 q-ml-md q-mt-xl">
        <h4 class="text-white text-bold">{{ this.greeetingMessage }}</h4>
      </div>
    </div>
    <div class="q-px-lg">
      <div class="row q-col-gutter-lg">
        <div
          class="col-4 text-white"
          v-for="song in this.recommendedSongs"
          :key="song"
        >
          <MiniBox :song="song" v-on:play="onPlaySong" />
        </div>
      </div>
      <div class="row q-col-gutter-sm">
        <div class="text-white text-bold col-10 q-mt-md" style="font-size:18px" >
           Günlük müzik ihtiyacın
        </div>
        <div class="col-2 float-right flex justify-end">
          <q-btn flat style="color: #fff" label="See All    " />
        </div>
        <div class="test">
          <SongBox />
        </div>
        <div class="test">
          <SongBox />
        </div>
        <div class="test">
          <SongBox />
        </div>
        <div class="test">
          <SongBox />
        </div>
        <div class="test">
          <SongBox />
        </div>
        <div class="test">
          <SongBox />
        </div>
        <div class="test">
          <SongBox />
        </div>
        <div class="test">
          <SongBox />
        </div>
      </div>
      <h6 class="text-white text-bold">Made for you</h6>
      <div class="row q-col-gutter-lg">
        <div class="test">
          <SongBox />
        </div>
        <div class="test">
          <SongBox />
        </div>
        <div class="test">
          <SongBox />
        </div>
        <div class="test">
          <SongBox />
        </div>
        <div class="test">
          <SongBox />
        </div>
        <div class="test">
          <SongBox />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import MiniBox from "../components/MiniBox";
import SongBox from "../components/SongBox";
import { mapActions } from "vuex";

export default {
  name: "LandingPage",

  components: {
    MiniBox,
    SongBox,
  },

  data() {
    return {
      greeetingMessage: "",
      recommendedSongs: [],
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
  },
  mounted() {
    this.getTime();
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
}

.headerDiv {
  background: #ed213a; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to top,
    #121212,
    #303b3e
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to top,
    #121212,
    #303b3e
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.test {
  width: 10vw !important;
}
</style>
