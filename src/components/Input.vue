<template>
  <input
    type="text"
    class="input"
    :style="style"
    :value="value"
    :disabled="disabled"
    @change="handleChange"
    @blur="handleBlur"
    @keyup.enter="handleBlur"
  />
</template>

<script>
export default {
  model: { prop: "value", event: "change" },
  props: {
    value: {
      type: String,
      default: ""
    },
    editable: {
      type: Boolean,
      default: true
    },
    outline: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      disabled: !this.editable
    };
  },
  computed: {
    style() {
      if (!this.outline) {
        return {
          outline: "none"
        };
      }
    }
  },
  methods: {
    handleChange(e) {
      this.$emit("change", e.target.value);
    },
    handleBlur(e) {
      this.$el.blur();
      this.disabled = !this.editable;
      this.$emit("blur", e.target.value);
    }
  }
};
</script>

<style lang='less' scoped>
@import "../common/style/index.less";

.input {
  width: 100px;
  border: none;
  outline-color: @color-blue-3;
  outline-width: 2px;
  background: inherit;

  &:focus {
    color: @color-blue-3;
    background: #fff;
  }
}
</style>