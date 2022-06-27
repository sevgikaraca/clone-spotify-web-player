<template>
  <q-page class="pageContainer" style="background-color: #121212">
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
        <p class="text-white q-mt-xl">Profile</p>
        <h2 class="text-white text-bold no-margin">Sevgi</h2>
        <p class="text-white q-mt-xl">
          5 public playlists - 4 Followers - 5 Following
        </p>
      </div>
    </div>
    <div class="row header-box q-col-gutter-md q-my-sm">
      <div class="col-12">
        <div class="row q-col-gutter-lg">
          <div class="col-10">
            <p style="font-size: 20px" class="q-mt-lg text-white text-bold">
              Public Playlists
            </p>
          </div>
          <div class="col-2 float-right flex justify-end q-mt-md">
            <q-btn
              v-if="this.playlistCount > 8"
              flat
              style="color: #fff"
              label="See All"
              size="md"
            />
          </div>
          <div class="box">
            <ListBox />
          </div>
          <div class="box">
            <ListBox />
          </div>
          <div class="box">
            <ListBox />
          </div>
          <div class="box">
            <ListBox />
          </div>
          <div class="box">
            <ListBox />
          </div>
          <div class="box">
            <ListBox />
          </div>
          <div class="box">
            <ListBox />
          </div>
        </div>
        <div class="row q-col-gutter-lg">
          <div class="col-10">
            <p style="font-size: 20px" class="q-mt-lg text-white text-bold">
              Followers
            </p>
          </div>
          <div class="col-2 float-right flex justify-end q-mt-md">
            <q-btn
              v-if="this.followersCount > 8"
              flat
              style="color: #fff"
              label="See All"
              size="md"
            />
          </div>
          <div class="box">
            <ListBox />
          </div>
          <div class="box">
            <ListBox />
          </div>
          <div class="box">
            <ListBox />
          </div>
          <div class="box">
            <ListBox />
          </div>
          <div class="box">
            <ListBox />
          </div>
          <div class="box">
            <ListBox />
          </div>
          <div class="box">
            <ListBox />
          </div>
        </div>
        <div class="row q-col-gutter-lg">
          <div class="col-10">
            <p style="font-size: 20px" class="q-mt-lg text-white text-bold">
              Following
            </p>
          </div>
          <div class="col-2 float-right flex justify-end q-mt-md">
            <q-btn
              v-if="this.followingCount > 8"
              flat
              style="color: #fff"
              label="See All"
              size="md"
            />
          </div>
          <div class="box">
            <ListBox />
          </div>
          <div class="box">
            <ListBox />
          </div>
          <div class="box">
            <ListBox />
          </div>
          <div class="box">
            <ListBox />
          </div>
          <div class="box">
            <ListBox />
          </div>
          <div class="box">
            <ListBox />
          </div>
          <div class="box">
            <ListBox />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import ListBox from "../components/ListBox";

export default {
  name: "Profile",

  components: {
    ListBox,
  },

  data() {
    return {
      playlistCount: 0,
      followersCount: 0,
      followingCount: 0,
    };
  }
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

.box {
  width: 10vw !important;
}

.header-box {
  justify-content: space-between;
  margin-left: 10px;
}
</style>
