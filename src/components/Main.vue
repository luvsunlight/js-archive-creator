<template>
  <div class="main">
    <Nav></Nav>
    <div class="main-item">
      <span class="main-item-title">标题:</span>
      <Input width="300px" v-model="title" @change="handleChange" />
    </div>
    <div class="main-item">
      <span class="main-item-title">描述:</span>
      <Input width="300px" v-model="desc" @change="handleChange" />
    </div>
    <div class="main-item">
      <span class="main-item-title">代码:</span>
      <Input width="300px" v-model="code" @change="handleChange" />
    </div>
    <div class="main-item">
      <span class="main-item-title">总结:</span>
      <Input width="300px" v-model="summary" @change="handleChange" />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
import Nav from "./Nav";
import Input from "./Input";

export default {
  components: { Nav, Input },
  data() {
    return {
      title: "title",
      desc: "desc",
      code: "code",
      summary: "summary"
    };
  },
  watch: {
    "$route.params.filename"(name) {
      Object.assign(this, this.getFileStatsByName(name));
      console.log("read" + name);
      console.log(this.getFileStatsByName(name));
    }
  },
  computed: {
    ...mapState(["fileStats"]),
    ...mapGetters(["getFileStatsByName"])
  },
  methods: {
    ...mapMutations(["setFileStatsByName"]),
    handleChange() {
      let name = this.$route.params.filename;
      let { title, desc, code, summary } = this;
      this.setFileStatsByName({
        name,
        title,
        desc,
        code,
        summary
      });
      console.log("set" + name);
      console.log(this.getFileStatsByName(name));
    }
  }
};
</script>

<style lang='less' scoped>
@import "../common/style/index.less";

.main {
  .anim-normal;
  height: 100%;
  padding: @offset-base;
  background: @color-blue-2;
  z-index: 1000;

  &-item {
    padding: @offset-small;
    margin: @offset-base 0;
    text-align: left;
    background: @color-light;

    &-title {
      font-size: 20px;
      font-weight: bold;
    }
  }
}
</style>