<template>
  <q-page class="q-px-lg pageContainer" style="background-color: #121212">
    <div>
      <div class="row q-col-gutter-md nameDiv">
        <div class="col-2 q-mt-xl">
          <img
            class="q-mb-lg q-mt-xl q-ml-md"
            ratio="1"
            src="https://placeimg.com/200/200/nature"
            spinner-color="primary"
            spinner-size="82px"
            style="border: 1px solid #3e3e3e; border-radius: 100px"
          />
        </div>
        <div class="col-4 q-mt-xl">
          <p class="text-white q-mt-xl">Profil</p>
          <h2 class="text-white text-bold no-margin">Sevgi</h2>
          <p class="text-white q-mt-xl">
            5 public playlists - 4 Followers - 5 Following
          </p>
        </div>
      </div>
      <div class="row q-col-gutter-lg">
        <div class="col-10">
          <h6 class="text-white text-bold">Public Playlists</h6>
        </div>
        <div class="col-2">
          <q-btn class="float-right q-mt-xl pageContainer" text-color="white" label="SEE ALL" />
        </div>
        <div class="col-2 no-margin">
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
      <h6 class="text-white text-bold">Followers</h6>
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
      <h6 class="text-white text-bold">Following</h6>
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
import SongBox from "../components/SongBox";

export default {
  name: "Profile",

  components: {
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
  padding-bottom: 0px !important;
  margin-bottom: 0px !important;
}

.nameDiv {
  background-image: linear-gradient(
    to right top,
    #282828,
    #2b2b2b,
    #2f2f2f,
    #323232,
    #363636,
    #393939,
    #3d3d3d,
    #404040,
    #444444,
    #484848,
    #4c4c4c,
    #505050
  );
}
</style>
