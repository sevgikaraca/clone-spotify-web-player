<template>
  <div class="row q-col-gutter-sm boxcolor text-bold miniBox">
    <div class="col-3 float-left">
      <img
        ratio="1"
        src="https://placeimg.com/80/80/nature"
      />
    </div>
    <div class="col-9 q-mt-md">music name</div>
  </div>
</template>

<script>
export default {
  name: "MiniBox",

  data() {
    return {}
  }
}

</script>

<style lang="scss">
.miniBox {
  border: 0 solid #282828;
  border-radius: 12px;
}
</style>
