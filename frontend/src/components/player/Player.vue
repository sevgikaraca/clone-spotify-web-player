<template>
  <div
    class="col-6 row play"
    style="border-radius: 1rem"
  >
    <div class="col-lg-2 col-sm-3 q-py-sm q-pl-md">
      <q-btn
        color="primary"
        flat
        round
        icon="skip_previous"
        size="md"
        @click="
          () => {
            wavesurfer.stop();
          }
        "
      />
      <q-btn
        color="primary"
        round
        :icon="isPlaying ? 'pause' : 'play_arrow'"
        size="md"
        @click="
          () => {
            wavesurfer.playPause();
          }
        "
      />
      <q-btn
        color="primary"
        flat
        round
        icon="skip_next"
        size="md"
        @click="
          () => {
            playNext();
            wavesurfer.play();
            isPlaying = true;
          }
        "
      />
    </div>
    <div v-if="$q.screen.width < 1440" class="col-9 text-center">
      <marquee>
        <a
          :href="`#/artists/${song ? song.artists[0]._id : ''}`"
          class="artist-link"
        >
          {{ song ? song.artists[0].name : "" }}
        </a>
        {{ song ? " - " + song.name : "" }}
      </marquee>
    </div>
    <div class="col-lg-10 col-sm-12">
      <!-- <div v-if="!song" class="q-ml-md">
        <marquee>Add song to queue or play.</marquee>
      </div> -->
      <div  id="waveform" class="col-12 q-ml-md"></div>
    </div>
  </div>
</template>
<script>
import WaveSurfer from "wavesurfer.js";
import { mapState, mapActions } from "vuex";

export default {
  props: ["song"],
  data() {
    return {
      isLoading: true,
      leftDrawerOpen: false,
      wavesurfer: null,
      isPlaying: false,
      backendUrl: 'http://localhost:3000',
    };
  },
  methods: {
    ...mapActions("songs", ["playNext"]),
    createWaveSurfer() {
      if (this.song) {
        this.$emit("loading", true);
      }
      this.wavesurfer = WaveSurfer.create({
        container: "#waveform",
        barWidth: 1,
        waveColor: "white",
        progressColor: "#1ED760",
        scrollParent: false,
        barGap: 3,
        barHeight: 2,
        cursorColor: "#4EF790",
        cursorWidth: 2.5,
        height: 20,
        hideScrollbar: true,
        mediaControls: true,
        responsive: true,
      });
      this.wavesurfer.on("play", () => {
        this.isPlaying = true;
      });
      this.wavesurfer.on("pause", () => {
        this.isPlaying = false;
      });
      this.wavesurfer.on("ready", () => {
        this.$emit("loading", false);
        this.wavesurfer.play();
      });
      this.wavesurfer.on("finish", () => {
        // TODO: song's listener + 1
        this.wavesurfer.empty();
        this.playNext();
      });
      this.wavesurfer.load(`${this.backendUrl}/songs/track/${this.song.trackId}`);
    },
  },
  computed: {
    ...mapState("songs", ["queue"]),
  },
  beforeCreate() {
    this.backendUrl = this.$axios.defaults.baseURL;
  },
  mounted() {
    window.addEventListener("keydown", (event) => {
      if (event.keyCode == 32 && event.target == document.body) {
        this.wavesurfer.playPause();
        event.preventDefault();
      }
    });
    window.addEventListener("keyup", (e) => {
      const evtobj = window.event ? event : e;
      if (evtobj.keyCode == 39 && evtobj.ctrlKey) {
        this.playNext();
      }
    });
  },
  watch: {
    song() {
      if (this.song) {
        this.$emit("loading", true);
      }
      if (!this.wavesurfer) {
        this.createWaveSurfer();
      } else {
        this.wavesurfer.empty();
      }
      this.wavesurfer.load(`${this.backendUrl}/songs/track/${this.song.trackId}`);
    },
    queue() {
      setTimeout(() => {
        if (!this.wavesurfer) this.createWaveSurfer();
      }, 100);
    },
  },
};
</script>
<style scoped>
#waveform {
  cursor: pointer;
  margin-top: 10px;
}
.artist-link {
  color: #d65f0a !important;
  text-decoration: none;
}
.artist-link:hover {
  color: #ff8f4a !important;
}
</style>
