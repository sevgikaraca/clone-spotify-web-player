<template>
  <q-page class="q-px-lg pageContainer" style="background-color: #121212">
    <div>
      <div class="row">
        <div class="col-2 q-mt-md">
          <h4 class="text-white text-bold">{{ this.greeetingMessage }}</h4>
        </div>
      </div>
      <div class="row q-col-gutter-lg">
        <div class="col-4">
          <MiniBox />
        </div>
        <div class="col-4">
          <MiniBox />
        </div>
        <div class="col-4">
          <MiniBox />
        </div>
        <div class="col-4">
          <MiniBox />
        </div>
        <div class="col-4">
          <MiniBox />
        </div>
        <div class="col-4">
          <MiniBox />
        </div>
      </div>
      <h6 class="text-white text-bold">Günlük müzik ihtiyacın</h6>
      <div class="row q-col-gutter-lg">
        <div class="col-2">
          <SongBox />
        </div>
        <div class="col-2">
          <SongBox />
        </div>
        <div class="col-2">
          <SongBox />
        </div>
        <div class="col-2">
          <SongBox />
        </div>
        <div class="col-2">
          <SongBox />
        </div>
        <div class="col-2">
          <SongBox />
        </div>
      </div>
      <h6 class="text-white text-bold">Made for you</h6>
      <div class="row q-col-gutter-lg">
        <div class="col-2">
          <SongBox />
        </div>
        <div class="col-2">
          <SongBox />
        </div>
        <div class="col-2">
          <SongBox />
        </div>
        <div class="col-2">
          <SongBox />
        </div>
        <div class="col-2">
          <SongBox />
        </div>
        <div class="col-2">
          <SongBox />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import MiniBox from "../components/MiniBox";
import SongBox from "../components/SongBox";

export default {
  name: "LandingPage",

  components: {
    MiniBox,
    SongBox,
  },

  data() {
    return {
      greeetingMessage: "",
    };
  },
  methods: {
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
</style>
