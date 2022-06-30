<template>
  <q-page class="pageContainer" style="background-color: #202020">
    <div class="row header-box q-col-gutter-xs">
      <div class="col-12 q-mt-xl">
        <p class="text-white text-bold q-mt-md" style="font-size: 30px">
          Playlists
        </p>
      </div>
      <div
        class="col-3 likedSongs text-bold text-white q-s q-px-lg q-mt-md"
        style="font-weight: 700; border: 1px solid #121212; border-radius: 7px"
      >
        <div class="row q-col-gutter-xs" @click="gotoLiked()" >
          <div class="col-12 q-mt-xl">
              <span v-for=" song in user.favoriteSongs" :key="song" > {{ song.artists[0].name }}
              <span class="text-grey-5"> {{ song.name }}  </span></span>
          </div>
          <div class="col-10">
            <br />
            <p style="font-size: 30px">Liked Songs</p>
            <p> {{ user.favoriteSongs.length }} liked songs</p>
          </div>
          <div class="col-2 q-mt-xl hidden-child float-right">
            <q-btn
              v-if="!isPlaying"
              color="green"
              text-color="black "
              size="lg"
              icon="play_arrow"
              dense
              round
              @click="playStopSong()"
            />
            <q-btn
              v-else
              color="green"
              text-color="black "
              size="lg"
              icon="pause"
              dense
              round
              @click="playStopSong()"
            />
          </div>
        </div>
      </div>
      <!-- <div class="row header-box q-col-gutter-sm" v-if="allMyPlaylists.length"> -->
        <div class="box" v-for="(playlist, index) in allMyPlaylists" :key="index">
          <ListBox v-if="index < 8" :playlist="playlist" />
        </div>
      </div>
  </q-page>
</template>

<script>
import ListBox from "../../components/ListBox";
import { mapActions } from "vuex";

export default {
  name: "Library",

  components: {
    ListBox,
  },

  data() {
    return {
      allMyPlaylists: [],
      user: {},
    };
  },
  mounted() {
    this.user = this.$q.sessionStorage.getItem("user");
    this.getPlaylists();
  },
  methods: {
    ...mapActions("songs", ["addToQueue", "addSongToLibrary"]),
    async addToFavorite(song) {
      const response = await this.addSongToLibrary(song);
    },
    getPlaylists() {
      this.$axios.get("/lists").then((response) => {
        this.allMyPlaylists = response.data;
      });
    },
    gotoLiked(){
      this.$router.push("/playlists/liked_songs");
    }
  },
};
</script>

<style lang="scss">
.pageContainer {
  padding-top: 0px !important;
  margin-top: 0px !important;
  margin-bottom: 2vh !important;
  margin-left: 1vw;
  margin-right: 1vw;
}

.box {
  width: 10vw !important;
  margin-top: 25px;
}

.header-box {
  justify-content: space-between;
}

.likedSongs {
  background: #8c8be6; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to left,
    #8c8be6,
    #460df4
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to left,
    #8c8be6,
    #460df4
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.likedSongs .hidden-child {
  visibility: hidden;
}

.likedSongs:hover {
  background-color: #465052;
  cursor: pointer;
}

.likedSongs:hover .hidden-child {
  visibility: visible;
}

.box {
  width: 10vw !important;
}
</style>
