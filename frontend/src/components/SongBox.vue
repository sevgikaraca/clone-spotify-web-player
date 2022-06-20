<template>
  <div class="row q-col-gutter-xs secondary q-pb-md q-pt-md text-bold songBox">
    <div class="col-12 text-center">
      <img ratio="1" src="https://placeimg.com/120/120/nature" />
    </div>
    <div class="col-12 text-left">
      <span class="q-ml-md">song name </span>
    </div>
    <div class="col-12 text-caption text-left">
      <span class="q-ml-md">artist name</span>
    </div>
    <q-menu content-class="songBox" touch-position context-menu>
      <q-list dense style="min-width: 100px">
        <q-item clickable v-close-popup>
          <q-item-section>Add to queue</q-item-section>
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
export default {
  name: "SongBox",

  data() {
    return {};
  },
};
</script>

<style lang="scss">
.songBox {
  margin: 0 !important;
  border: 0 solid #181818;
  border-radius: 5px;
  background: #181818;
  color: white;
}

.songBox:hover {
  background: #282828;
}
</style>
