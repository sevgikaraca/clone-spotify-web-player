<template>
  <q-page class="pageContainer" style="background-color: #202020">
    <div class="row header-box q-col-gutter-xs">
      <div class="col-12 q-mt-xl">
        <p class="text-white text-bold q-mt-md" style="font-size: 24px">
          Queue
        </p>
      </div>
      <div class="col-11 q-mt-xl">
        <q-list
          class="text-white"
          bordered
          v-for="(item, index) in queue"
          :key="index"
        >
          <q-item clickable v-ripple style="border: 1px solid #121212; border-radius:10px; background-color: #121212">
            <q-item-section avatar class="float-right no-margin text-right">
              <p class="text-primary q-mt-md">
                {{ index + 1 }}
              </p> </q-item-section
            ><q-item-section avatar class="float-left no-margin text-right">
              <q-icon class="" color="white" name="play_arrow" />
            </q-item-section>
            <q-item-section class="text-primary">
              {{ item.name }}
              <br />
              <p class="text-white">{{ item.artists[0].name }}</p>
            </q-item-section>
            <q-item-section>
              {{ item.album.name }}
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Queue",

  data() {
    return {};
  },

  computed: {
    ...mapState("songs", ["queue"]),
  },

  methods: {
    ...mapActions("songs", ["addToQueue", "playFromQueue", "removeFromQueue"]),
  },
};
</script>

<style lang="scss">
.pageContainer {
  margin-left: 1vw;
  margin-right: 1vw;
}
</style>
