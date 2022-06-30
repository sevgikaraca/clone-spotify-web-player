<template>
  <q-page class="pageContainer" style="background-color: #202020">
    <div class="row header-box q-col-gutter-xs">
      <div class="col-2 q-mt-xl">
        <img
          class="q-mb-lg q-mt-xl q-ml-md"
          ratio="1"
          src="../../statics/nota.png"
          width="170px"
          height="170px"
        />
      </div>
      <div class="col-6 q-mt-xl">
        <h3 class="text-white text-bold q-mt-xl">Create Playlist</h3>
        <q-input
          dark
          class="q-mt-xl"
          label="Playlist Name"
          v-model="playlistName"
        >
          <template v-slot:prepend>
            <q-icon name="playlist_add" color="primary" />
          </template>
        </q-input>
      </div>
      <div class="col-3 q-ma-xl flex self-end">
        <q-checkbox
          left-label
          v-model="isPublic"
          label="Public List"
          size="md"
          color="orange-9"
          class="text-white"
        />
        <q-btn
          color="primary"
          icon="add"
          label="Create"
          no-caps
          @click="createNewList"
          size="md"
        />
      </div>
      <div class="col-6 text-white q-my-sm">#TITLE</div>
      <div class="col-6 text-white q-my-sm">ALBUM</div>
      <div class="col-11">
        <q-list
          class="text-white"
          bordered
          v-for="(song, index) in this.addedSongs"
          :key="song._id"
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
            <q-item-section avatar class="float-left no-margin text-right">
              <q-icon
                color="white"
                name="close"
                @click="removeFromAdded(song)"
              />
            </q-item-section>
          </q-item>
        </q-list>

        <q-separator dark class="q-my-md bg-primary" />

        <q-list
          class="text-white"
          bordered
          v-for="(song, index) in this.songs"
          :key="song._id"
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
            <q-item-section avatar class="float-left no-margin text-right">
              <q-icon color="white" name="add" @click="addToList(song)" />
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "PlaylistDetail",

  data() {
    return {
      addedSongs: [],
      songs: [],
      user: {},
      playlistName: "",
      isPublic: true,
    };
  },
  methods: {
    createNewList() {
      this.$axios
        .post("lists/playlist", {
          userId: this.user._id,
          name: this.playlistName,
          isPublic: this.isPublic,
          songs: this.addedSongs,
        })
        .then(() => {
          this.$router.push("/");
        });
    },
    getSongs() {
      this.$axios.get("/songs").then((response) => {
        let songs = response.data;
        songs.forEach((song) => {
          this.songs.push(song);
        });
      });
    },
    addToList(song) {
      const index = this.songs.findIndex((s) => {
        return s._id === song._id;
      });
      this.addedSongs.push(this.songs[index]);
      this.songs.splice(index, 1);
    },
    removeFromAdded(song) {
      const index = this.addedSongs.findIndex((s) => {
        return s._id === song._id;
      });
      this.songs.push(this.addedSongs[index]);
      this.addedSongs.splice(index, 1);
    },
  },
  mounted() {
    this.user = this.$q.sessionStorage.getItem("user");
    this.getSongs();
  },
};
</script>

<style lang="scss">
.pageContainer {
  margin-left: 1vw;
  margin-right: 1vw;
}
</style>
