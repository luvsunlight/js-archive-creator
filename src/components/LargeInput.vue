<template>
  <pre class="large-ouput" contenteditable :code="code" v-highlight @blur="handleBlur"><code class="lang-javascript">{{value}}</code></pre>
</template>

<script>
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
  data() {
    return {
      runBtnMsg: "Run",
      result: "result"
    };
  },
  methods: {
    handleRun() {
      this.result = eval(this.$el.innerText);
    },
    handleBlur(e) {
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