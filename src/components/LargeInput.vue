<template>
  <pre ref="pre" class="large-ouput" v-highlight contenteditable :code="code" @blur="handleBlur"><code class="lang-javascript">{{value}}</code></pre>
</template>

<script>
// import hljs from "highlight.js";

export default {
  model: { prop: "value", event: "change" },
  props: {
    value: {
      type: String,
      default: ""
    },
    code: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    rendererText() {
      let blocks = this.$refs.pre.querySelector("code");
      if (blocks.length === 0) {
        return this.value;
      } else {
        return "";
      }
    }
  },
  methods: {
    handleBlur() {
      this.$emit("change", this.$el.innerText);
    }
  }
};
</script>

<style lang='less' scoped>
@import "../common/style/index.less";

.large-ouput {
  border-radius: @offset-tiny;
  outline: none;
}
</style>