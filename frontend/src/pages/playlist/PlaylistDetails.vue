<template>
  <q-page class="pageContainer" style="background-color: #202020">
    <div class="row header-box q-col-gutter-xs">
          <div class="col-2 q-mt-xl">
        <img
          class="q-mb-lg q-mt-xl q-ml-md"
          ratio="1"
          src="../../statics/likes.png"
          width="170px"
          height="170px"
        />
      </div>.
      <div class="col-4 q-mt-xl">
        <p class="text-white q-mt-xl">Playlist</p>
        <h2 class="text-white text-bold no-margin"> {{ this.playlist.name }} </h2>
        <p class="text-white q-mt-xl">
          <a class="text-white text-bold" href="#/profile">{{ this.playlist.ownerId.name }}</a> -
          {{ this.playlist.songs.length }} songs
        </p>
      </div>
      <div class="col-4 text-white q-ma-sm"> #TITLE </div>
      <div class="col-6  text-white q-ma-sm"> ALBUM </div>
      <div class="col-9 ">
        <q-list
          class="text-white"
          bordered
          v-for="(song, index) in this.playlist.songs"
          :key="index"
        >
          <q-item
            clickable
            v-ripple
            style="
              border: 1px solid #121212;
              border-radius: 10px;
              background-color: #121212;
            "
          >
            <q-item-section avatar class="float-right no-margin text-right">
              <p class="text-primary q-mt-md">
                {{ index + 1 }}
              </p>
            </q-item-section>
            <q-item-section avatar class="float-left no-margin text-right">
              <q-icon color="white" name="play_arrow" />
            </q-item-section>
            <q-item-section class="text-primary">
              {{ song.name }}
              <br />
              <p class="text-white">{{ song.artists[0].name }}</p>
            </q-item-section>
            <q-item-section>
              {{ song.album.name }}
            </q-item-section>
            <q-item-section avatar class="float-left no-margin text-right" @click="addToFavorite(song)" >
              <q-icon outlined color="white" name="favorite_border" />
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "PlaylistDetail",

  data() {
    return {
      playlist: {},
    };
  },

  methods: {
    ...mapActions("songs", ["addToQueue", "addSongToLibrary"]),
    fetch() {
      this.$axios.get(`lists/${this.$route.params.id}`).then((response) => {
        this.playlist = response.data;
      });
    },
    async addToFavorite(song){
      const response = await this.addSongToLibrary(song);
      console.log(response);
    }
  },
  mounted() {
    this.fetch();
  },
};
</script>

<style lang="scss">
.pageContainer {
  margin-left: 1vw;
  margin-right: 1vw;
}
</style>
