<template>
  <div :class="navClasses">
    <a-icon type="menu-fold" :class="iconClasses" :style="iconStyle" @click.native="handleToggle"></a-icon>
    {{$route.params.filename}}
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

const prefixCls = "nav";
export default {
  computed: {
    ...mapState(["menuFold"]),
    navClasses() {
      return prefixCls;
    },
    iconClasses() {
      return [
        `${prefixCls}-icon`,
        `${prefixCls}-icon-${this.menuFold ? "fold" : "unfold"}`
      ];
    },
    iconStyle() {
      return {
        fontSize: "20px"
      };
    }
  },
  methods: {
    ...mapMutations(["toggleMenuFold"]),
    handleToggle() {
      this.toggleMenuFold();
    }
  }
};
</script>

<style lang='less' scoped>
@import "../common/style/index.less";

.nav {
  .relative;
  height: @nav-height;
  line-height: @nav-height;
  border-bottom: 5px solid @color-blue-1;
  background: @color-light;

  &-icon {
    .anim-normal;
    .cursor-pointer;
    position: absolute;
    left: 10px;
    top: (@nav-height / 2) - 10px;

    &-fold {
      transform: rotate(180deg);
    }
  }
}
</style>