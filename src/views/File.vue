<template>
  <div :class="wrapClasses">
    <div :class="itemClasses">
      <span :class="titleClasses">标题:</span>
      <Input v-model="title" @change="handleChange" />
    </div>
    <div :class="itemClasses">
      <span :class="titleClasses">描述:</span>
      <LargeInput v-model="desc" @change="handleChange" />
    </div>
    <div :class="itemClasses">
      <span :class="titleClasses">代码:</span>
      <LargeInput v-model="code" @change="handleChange"></LargeInput>
    </div>
    <div :class="itemClasses">
      <span :class="titleClasses">总结:</span>
      <LargeInput v-model="summary" :code="false" @change="handleChange" />
    </div>
    <a-drawer
      title="页面设置"
      placement="right"
      :closable="false"
      :visible="!settingFold"
      @close="toggleSettingFold(true)"
    >
      暗黑模式
      <a-switch @onChange="handleThemeChange"></a-switch>
    </a-drawer>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import Input from "../components/Input";
import LargeInput from "../components/LargeInput";

const prefixCls = "file";

export default {
  components: { Input, LargeInput },
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
      let file = this.getFileStatsByName(name);
      if (file) {
        Object.assign(this, this.getFileStatsByName(name));
        console.log("Read " + name);
        console.log(this.getFileStatsByName(name));
      } else if (this.$route.name !== "404") {
        this.$router.push("/404");
      }
    }
  },
  computed: {
    ...mapState(["menuFold", "fileStats", "settingFold"]),
    ...mapGetters(["getFileStatsByName"]),
    wrapClasses() {
      return prefixCls;
    },
    itemClasses() {
      return [
        `${prefixCls}-item`,
        `${prefixCls}-item-${this.menuFold ? "fold" : "unfold"}`
      ];
    },
    titleClasses() {
      return [`${prefixCls}-item-title`];
    }
  },
  methods: {
    ...mapActions(["setFileStatsByName", "toggleSettingFold"]),
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
      console.log("Set " + name);
      console.log(this.getFileStatsByName(name));
    },
    handleThemeChange(v) {}
  }
};
</script>

<style lang='less' scoped>
@import "../common/style/index.less";

.file {
  padding: @file-padding;
  &-item {
    .anim-normal;
    height: 100%;
    padding: @offset-small;
    margin: @offset-base 0;
    text-align: left;
    background: @color-light;

    &-title {
      .font-bold;
      font-size: 20px;
    }
  }
}
</style>