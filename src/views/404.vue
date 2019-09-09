<template>
  <div class="not-found">{{msg}}</div>
</template>

<script>
export default {
  data() {
    return {
      msg: "404..."
    };
  }
};
</script>

<style lang='less' scoped>
.not-found {
  font-size: 50px;
  font-weight: bold;
  font-style: italic;
}
</style>