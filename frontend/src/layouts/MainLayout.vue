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

    <q-page-container style="padding-top: 0; background-color: #121212 !important;" class="q-my-none">
      <router-view />
    </q-page-container>
    <q-footer elevated class="bg-secondary text-white">
      <!-- <q-toolbar>
        <q-toolbar-title>
          Title
        </q-toolbar-title>
      </q-toolbar> -->

      <vue-plyr>
        <div class="row q-col-gutter-sm">
          <div class="col-2">
            <div class="row q-col-gutter-sm">
              <div class="col-4 q-mt-sm">
                <q-img
                  src="https://placeimg.com/500/300/nature"
                  style="height: 75px; width: 75px"
                  class="q-ma-sm"
                />
              </div>
              <div class="col-8 q-mt-md">
                <p>Song Name</p>
                <p>Artist Name</p>
              </div>
            </div>
          </div>
          <div class="q-my-md col-10">
            <audio class="full-width" controls crossorigin playsinline>
              <source src="/path/to/audio.mp3" type="audio/mp3" />
              <source src="/path/to/audio.ogg" type="audio/ogg" />
            </audio>
          </div>
        </div>
      </vue-plyr>
    </q-footer>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";
import Vue from "vue";
import VuePlyr from "vue-plyr";
import "vue-plyr/dist/vue-plyr.css";

const linksData = [
  {
    title: "Home",
    icon: "home",
    link: "/",
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
  },
  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData,
    };
  },
};
</script>

<style lang="scss">
.header-class {
  background: #000000; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to bottom,
    #434343,
    #000000
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to bottom,
    #434343,
    #000000
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
