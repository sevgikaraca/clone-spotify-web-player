<template>
  <div
    class="row q-col-gutter-xs q-pa-xs text-bold listBox"
    @click="goToPlaylist(playlist)"
  >
    <div class="col-12 text-center" v-if="playlist">
      <q-img
        v-if="playlist && playlist.playlistCoverId"
        ratio="1"
        width="150px"
        height="150px"
        class="img q-my-md"
        :src="`${$axios.defaults.baseURL}/lists/playlistCover/${
          playlist && playlist.playlistCoverId
        }`"
      >
        <div class="hidden-child float-right">
          <q-btn
            v-if="!isPlaying"
            color="green"
            text-color="black"
            size="lg"
            icon="play_arrow"
            dense
            round
            @click.stop="playPlaylist(playlist.songs), isPlaying = true"
          />
          <q-btn
            v-else
            color="green"
            text-color="black "
            size="lg"
            icon="pause"
            dense
            round
            @click.stop="playPlaylist(playlist.songs), isPlaying = false"
          />
        </div>
      </q-img>
      <q-img
        v-else
        src="../statics/nota.png"
        :ratio="1"
        width="150px"
        height="150px"
        class="img q-my-md"
      >
        <div class="hidden-child float-right">
          <q-btn
            v-if="!isPlaying"
            color="green"
            text-color="black"
            size="lg"
            icon="play_arrow"
            dense
            round
            @click.stop="playPlaylist(playlist.songs), isPlaying = true"
          />
          <q-btn
            v-else
            color="green"
            text-color="black "
            size="lg"
            icon="pause"
            dense
            round
            @click.stop="playPlaylist(playlist.songs), isPlaying = false"
          />
        </div>
      </q-img>
    </div>
    <div class="col-12 text-left">
      <span class="text-white q-ml-md"> {{ playlist && playlist.name }} </span>
    </div>
    <div class="text-grey col-12 text-left">
      <span class="q-ml-md">
        {{ playlist && playlist.ownerId && playlist.ownerId.name }}
      </span>
    </div>

    <q-menu touch-position context-menu>
      <q-list
        dense
        style="min-width: 100px; background: #181818"
        class="text-white"
      >
        <q-item clickable>
          <q-item-section>Add to Library</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "ListBox",

  data() {
    return {
      isPlaying: false
    };
  },

  props: {
    playlist: {
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
    ...mapActions("songs", ["playPlaylist"]),

    goToPlaylist(playlist) {
      this.$router.push(`/playlists/detail/${playlist._id}`);
    },
  },
};
</script>

<style lang="scss">
.listBox {
  margin: 0 !important;
  padding-bottom: 40px !important;
  border: 0 solid #181818;
  border-radius: 7px;
  background: #181818 !important;
}

.img {
  border: 0 solid #181818;
  border-radius: 5px;
  background: #181818;
}

.listBox .hidden-child {
  visibility: hidden;
  position: relative;
  top: 50% !important;
  background-color: transparent;
}
.listBox:hover {
  background-color: #282828;
  cursor: pointer;
  .img {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
}
.listBox:hover .hidden-child {
  visibility: visible;
}
</style>
