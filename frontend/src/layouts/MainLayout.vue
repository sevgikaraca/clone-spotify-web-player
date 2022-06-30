<template>
  <q-layout view="lHr LpR fFf">
    <q-header elevated class="header-class text-white">
      <div class="row q-col-gutter-sm">
        <div class="col-11">
          <q-btn
            color="white"
            class="bg-grey-9 q-ma-sm q-ml-lg"
            round
            flat
            icon="chevron_left"
            @click="$router.go(-1)"
          />
          <q-btn
            color="white"
            class="bg-grey-9"
            round
            flat
            icon="chevron_right"
            @click="$router.go(1)"
          />
        </div>
        <div class="col-1">
          <q-btn-dropdown
            auto-close
            flat
            :label="user.name"
            class="q-mt-md bg-grey-"
            no-caps
            v-if="user"
          >
            <q-list padding style="width: 250px" class="bg-dark text-white">
              <q-item clickable to="/profile">
                <q-item-section avatar>
                  <q-avatar
                    icon="account_circle"
                    size="40px"
                    font-size="40px"
                    text-color="primary"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ user.userName }}</q-item-label>
                  <q-item-label caption>{{ user.email }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable @click="logout">
                <q-item-section avatar>
                  <q-avatar
                    icon="logout"
                    size="40px"
                    font-size="40px"
                    text-color="primary"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Logout</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
          <q-btn
            color="white"
            class="bg-grey-9 q-mr-xl q-mt-sm q-px-sm float-right"
            label="Login/Register"
            no-caps
            flat
            icon="person"
            to="/login"
            v-else
          />
        </div>
      </div>
    </q-header>

    <q-drawer
      show-if-above
      content-class="bg-black text-white q-pl-sm"
      :width="240"
    >
      <q-img
        src="../statics/logo-white.png"
        :ratio="16 / 9"
        class="q-my-lg"
        style="width: 130px; height: 39px"
      />
      <q-list class="text-grey-7 left-drawer-list" no-border>
        <q-item
          clickable
          v-ripple
          to="/"
          class="q-pl-sm bg-black text-grey"
          active-class="custom-color text-bold text-white"
          exact
        >
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>
            <q-item-label> Home </q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          v-ripple
          to="/playlists"
          class="q-pl-sm bg-black text-grey"
          active-class="custom-color text-bold text-white"
          exact
        >
          <q-item-section avatar>
            <q-icon name="person" />
          </q-item-section>
          <q-item-section>
            <q-item-label> Your Library </q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          v-ripple
          to="/playlists/create"
          class="q-pl-sm bg-black text-grey"
          active-class="custom-color text-bold text-white"
          exact
        >
          <q-item-section avatar>
            <q-icon name="add" />
          </q-item-section>
          <q-item-section>
            <q-item-label> Create Playlist </q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          v-ripple
          to="/playlists/liked_songs"
          class="q-pl-sm bg-black text-grey"
          active-class="custom-color text-bold text-white"
          exact
        >
          <q-item-section avatar>
            <q-icon name="favorite" />
          </q-item-section>
          <q-item-section>
            <q-item-label> Liked Songs </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <q-separator class="q-my-md" dark />
      <q-scroll-area style="height: 520px; max-height: 520px">
        <q-list bordered v-for="list in allPlaylists" :key="list">
          <q-item clickable v-ripple dense @click="goToPlaylist(list._id)">
            <q-item-section> {{ list.name }} </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container
      style="padding-top: 0; background-color: #202020 !important"
      class="q-my-none"
    >
      <router-view v-on:userLogined="userLogin" />
    </q-page-container>
    <q-footer elevated class="no-margin no-padding bg-secondary text-white">
      <div class="row q-col-gutter-sm">
        <div class="col-2">
          <div class="row q-col-gutter-xs">
            <div class="col-2 text-center text-bold text-white">
            {{ queue[0] && queue[0].name ? "" : "No Queue"}}
              <q-img
              v-if="queue[0]"
                :src="`${$axios.defaults.baseURL}/albums/albumCover/${queue[0].album.albumCoverId}`"
                :ratio="1"
                class="q-mt-sm q-ml-sm"
                height="80px"
                width="80px"
              />
            </div>
          </div>
        </div>
        <div class="col-9">
          <div class="row flex justify-center">
            <div class="q-my-md col-10">
              <player v-if="queue" :song="queue[0]" v-on:loading="loading" />
            </div>
          </div>
        </div>
        <div class="col-1 flex justify-center items-center">
          <q-icon
            name="menu"
            class="cursor-pointer"
            @click="$router.push('/queue')"
          />
        </div>
      </div>
    </q-footer>
  </q-layout>
</template>

<script>
import { mapState, mapActions } from "vuex";
import PlayerVue from "../components/player/Player";

export default {
  name: "MainLayout",
  components: {
    player: PlayerVue,
  },
  data() {
    return {
      leftDrawerOpen: false,
      trackPath: "",
      isLoading: true,
      myPlaylists: [],
      allPlaylists: [],
      isPlaying: false,
      user: {},
    };
  },
  computed: {
    ...mapState("songs", ["queue"]),
  },
  mounted() {
    this.user = this.$q.sessionStorage.getItem("user");
    this.$axios.get(`/users/${this.user._id}`)
      .then(({data}) => {
        this.$q.sessionStorage.set("user", data);
      });
    this.isLoading = false;
    this.getMyPlaylists();
    this.getPlaylists();
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
    getPlaylists() {
      this.$axios.get("/lists").then((response) => {
        this.allPlaylists = response.data;
      });
    },
    getMyPlaylists() {
      this.$axios.get("/lists").then((response) => {
        let allPlaylists = response.data;
        allPlaylists.forEach((list) => {
          if (list.ownerId && list.ownerId._id == this.user.userId) {
            this.myPlaylists.push(list.name);
          }
        });
      });
    },
    goToPlaylist(id) {
      this.$router.push(`/playlists/detail/${id}`);
    },
  },
};
</script>

<style lang="scss">
.header-class {
  background-color: #202020;
}

.player-item {
  min-height: 20px;
}

.left-drawer-list {
  .q-item__section--avatar {
    min-width: 42px;
  }
  .q-expansion-item .q-item {
    padding: 8px !important;
  }
}

.custom-color {
  color: #fff !important;
}
</style>
