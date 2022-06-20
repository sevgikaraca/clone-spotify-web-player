<template>
  <div class="row q-col-gutter-sm boxcolor text-bold miniBox">
    <div class="col-3 float-left">
      <img ratio="1" src="https://placeimg.com/80/80/nature" />
    </div>
    <div class="col-7 q-mt-md">
      {{ song.name }}
      <br />
      {{ song.artists.length && song.artists[0].name }}
    </div>
    <div class="col-2 q-mt-md hidden-child">
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

    <q-menu content-class="songBox" touch-position context-menu>
      <q-list dense style="min-width: 100px">
        <q-item clickable v-close-popup>
          <q-item-section @click.stop="addToQueue(song)">
            Add to queue</q-item-section
          >
        </q-item>
        <q-separator dark />
        <q-item clickable>
          <q-item-section>Add to playlist</q-item-section>
          <q-item-section side>
            <q-icon name="keyboard_arrow_right" />
          </q-item-section>

          <q-menu content-class="songBox" anchor="top end" self="top start">
            <q-list dense style="min-width: 100px">
              <q-item clickable v-close-popup>
                <q-item-section>Create playlist</q-item-section>
              </q-item>
              <q-separator dark />
              <q-item v-for="n in 3" :key="n" dense clickable>
                <q-item-section>Submenu Label</q-item-section>
                <q-menu auto-close anchor="top end" self="top start">
                  <q-list>
                    <q-item v-for="n in 3" :key="n" dense clickable>
                      <q-item-section>3rd level Label</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-item>
            </q-list>
          </q-menu>
        </q-item>
      </q-list>
    </q-menu>
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
    playStopSong() {
      if (this.isPlaying == true) {
        this.isPlaying = false;
      } else {
        this.isPlaying = true;
        this.$emit("play", this.song);
      }
    },
  },
};
</script>

<style lang="scss">
.miniBox {
  border: 0 solid #282828;
  border-radius: 5px;
  background-color: #303b3e;
}

.miniBox .hidden-child {
  visibility: hidden;
}

.miniBox:hover {
  background-color: #465052;
}
.miniBox:hover .hidden-child {
  visibility: visible;
}
</style>
