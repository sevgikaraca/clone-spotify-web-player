<template>
  <q-layout view="lHr LpR fFf">
    <q-header elevated class="header-class text-white">
      <!-- <q-toolbar> -->
      <div class="row q-col-gutter-sm">
        <div class="col-10">
          <q-btn
            color="white"
            class="bg-grey-9 q-ma-sm q-ml-lg"
            round
            flat
            icon="chevron_left"
          />
          <q-btn
            color="white"
            class="bg-grey-9"
            round
            flat
            icon="chevron_right"
          />
        </div>
        <div class="col-2">
          <q-btn
            color="white"
            class="bg-grey-9 q-mr-xl q-mt-sm q-px-sm float-right"
            label="Profile"
            no-caps
            flat
            icon="person"
            to="/profile"
          />
        </div>
      </div>
      <!-- </q-toolbar> -->
    </q-header>

    <q-drawer show-if-above content-class="bg-dark text-white">
      <q-img
        src="../statics/logo-white.png"
        :ratio="16 / 9"
        class="q-ma-lg"
        style="width: 130px; height: 39px"
      />
      <q-list>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />

        <q-separator class="q-my-md" dark />
      </q-list>
    </q-drawer>

    <q-page-container
      style="padding-top: 0; background-color: #121212 !important"
      class="q-my-none"
    >
      <router-view />
    </q-page-container>
    <q-footer elevated class="bg-secondary text-white">
      <!-- <q-toolbar>
        <q-toolbar-title>
          Title
        </q-toolbar-title>
      </q-toolbar> -->

      <div class="row q-col-gutter-sm">
        <div class="col-2">
          <div class="row q-col-gutter-xs">
            <div class="col-4 q-mt-sm">
              <q-img
                src="https://placeimg.com/500/300/nature"
                style="height: 60px; width: 60px"
                class="q-mt-sm q-ml-sm "
              />
            </div>
            <div class="col-8 q-mt-lg">
              <q-item class="player-item no-padding no-margin">{{ queue[0] && queue[0].name }} </q-item>
              <q-item to="" class="player-item no-padding no-margin" >
                {{
                  queue[0] &&
                  queue[0].artists.length &&
                  queue[0].artists.map((a) => a.name).join(", ")
                }}
              </q-item>
              <!-- <p>{{queue[0] && queue[0].name}}</p>
              <p>{{queue[0] && queue[0].artists.length && queue[0].artists.map((a) => a.name).join(', ')}}</p> -->
            </div>
          </div>
        </div>
        <div class="col-10">
          <div class="row flex justify-center">
            <div class="q-my-md col-10">
              <player v-if="queue" :song="queue[0]" v-on:loading="loading" />
            </div>
          </div>
        </div>
      </div>
    </q-footer>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";
import { mapState, mapActions } from "vuex";
import PlayerVue from "../components/player/Player";

const linksData = [
  {
    title: "Home",
    icon: "home",
    to: "/",
  },
  {
    title: "Search",
    icon: "search",
    link: "https://github.com/quasarframework",
  },
  {
    title: "Your Library",
    icon: "library_books",
    link: "https://chat.quasar.dev",
  },
  {
    title: "Create Playlist",
    icon: "playlist_add",
    link: "https://forum.quasar.dev",
  },
  {
    title: "Liked Songs",
    icon: "favorite",
    link: "https://twitter.quasar.dev",
  },
];

export default {
  name: "MainLayout",
  components: {
    EssentialLink,
    player: PlayerVue,
  },
  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData,
      trackPath: "",
      isLoading: true,
    };
  },
  computed: {
    ...mapState("songs", ["queue"]),
  },
  mounted() {
    setInterval(() => {
      console.log(this.queue);
    }, 2000);
    // this.user = this.$q.sessionStorage.getItem('user');
    this.isLoading = false;
  },
  watch: {
    isLoading() {
      if (this.isLoading) {
        this.$q.loading.show({
          delay: 400, // ms
        });
      } else {
        this.$q.loading.hide();
      }
    },
  },
  methods: {
    ...mapActions("songs", ["addToQueue", "playFromQueue", "removeFromQueue"]),
    logout() {
      this.$q.sessionStorage.remove("user");
      this.user = null;
    },
    loading(v) {
      this.isLoading = v;
    },
    userLogin(val) {
      if (val) {
        this.user = this.$q.sessionStorage.getItem("user");
      }
    },
  },
};
</script>

<style lang="scss">
.header-class {
  background-color: rgba(0, 0, 0, 0) !important;
}

.player-item{
  min-height: 20px;
}
</style>
