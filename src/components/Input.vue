<template>
  <input
    type="text"
    class="input"
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
    }
  },
  data() {
    return {
      disabled: !this.editable
    };
  },
  methods: {
    handleChange(e) {
      this.$emit("change", e.target.value);
    },
    handleBlur(e) {
      this.$el.blur();
      this.disabled = !this.editable;
      this.$emit("blur");
    }
  }
};
</script>

<style lang='less' scoped>
.input {
  width: 100px;
  border: none;
  outline: none;
  background: inherit;

  &:focus {
    // background: #fff;
  }
}
</style>