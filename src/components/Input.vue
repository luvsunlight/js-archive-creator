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
    width: {
      type: String | Number,
      default: "auto"
    }
  },
  data() {
    return {
      disabled: !this.editable
    };
  },
  computed: {
    style() {
      return { width: this.width };
    }
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
  border: none;
  outline: none;
  background: inherit;

  &:focus {
    background: #fff;
  }
}
</style>