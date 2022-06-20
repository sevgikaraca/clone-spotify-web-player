<template>
  <q-layout view="lHr LpR fFf">
    <q-header elevated class="header-class text-white">
      <q-toolbar>
        <q-btn color="white" class="bg-grey-9 q-mr-sm" round flat icon="chevron_left"/>
        <q-btn color="white" class="bg-grey-9" round flat icon="chevron_right"/>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer elevated class="bg-secondary text-white">
      <!-- <q-toolbar>
        <q-toolbar-title>
          Title
        </q-toolbar-title>
      </q-toolbar> -->

    </q-footer>
  </q-layout>
</template>

<script>
// import EssentialLink from "components/EssentialLink.vue";
import Vue from "vue";

const linksData = [
  {
    title: "Home",
    icon: "home",
    link: "https://quasar.dev",
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
    // EssentialLink,
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
