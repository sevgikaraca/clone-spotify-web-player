<template>
  <div class="row q-col-gutter-sm boxcolor text-bold songBox">
    <div class="col-12 text-center">
      <img
        ratio="1"
        src="https://placeimg.com/150/150/nature"
      />
    </div>
    <div class="col-12 text-left q-ml-xl">
      song name
      </div>
    <div class="col-12 text-caption text-left q-ml-xl q-mb-md">
      artist name
    </div>
  </div>
</template>

<script>
export default {
  name: "SongBox",

  data() {
    return {}
  }
}

</script>

<style lang="scss">
.songBox {
  margin: 0;
  padding: 0;
  border: 0 solid #282828;
  border-radius: 12px;
}
</style>
