<template>
  <div class="not-found">
    <div class="wrap">
      <img
        src="https://hbimg.huabanimg.com/d27b52c653e7fdc05ee435e875102a20178b4e3e17118-ECREXz_fw658"
        alt
      />
      <div class="title">{{title}}</div>
      <div class="subtitle">
        {{subTitle}}
        <a src="/" @click="$router.push('/')">homepage</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "Page not found",
      subTitle: "The page you are looking for is not here.Why don’t you try the"
    };
  }
};
</script>

<style lang='less' scoped>
.not-found {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: clarendon-text-pro, Georgia, "Times New Roman", Times, serif;
  .title {
    font-size: 50px;
    font-weight: bold;
  }
}
</style>