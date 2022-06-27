<template>
  <q-layout view="lHr LpR fFf"  style="padding-top: 0; background-color: #121212 !important">
    <q-header elevated class="header-class text-white">
      <div class="row q-col-gutter-sm">
        <div class="col-10">
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
        <div class="col-2">
          <q-btn
            color="white"
            class="bg-grey-9 q-mr-xl q-mt-sm q-px-sm float-right"
            label="Login"
            no-caps
            flat
            to="/login"
          />
        </div>
      </div>
    </q-header>

    <q-drawer show-if-above content-class="bg-black text-white q-pl-sm"
        :width="240" >
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
      </q-list>
      <q-separator class="q-my-md" dark />
      <q-scroll-area style="height: 530px; max-height: 530px;">
      </q-scroll-area>
    </q-drawer>

    <q-page-container
      style="padding-top: 0; background-color: #121212 !important"
      class="q-my-none"
    >
      <router-view />
    </q-page-container>
    <!-- <q-footer elevated class="bg-secondary text-white">
      <div class="row q-col-gutter-sm">
        <div class="col-12">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum temporibus voluptates labore numquam, iure omnis architecto, aliquam minus pariatur illum maiores consequatur mollitia dolorem ab recusandae nemo. Nam, cumque placeat?</p>
            </div>
      </div>
    </q-footer> -->
  </q-layout>
</template>

<script>
import { mapState, mapActions } from "vuex";


export default {
  name: "GuestLayout",
  components: {
  },
  data() {
    return {
      leftDrawerOpen: false
    };
  },
  computed: {
    ...mapState("songs"),
  },
  mounted() {
    setInterval(() => {
      // console.log(this.queue);
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
  // background-color: rgba(0, 0, 0, 0) !important;
  background-color:#202020;
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
