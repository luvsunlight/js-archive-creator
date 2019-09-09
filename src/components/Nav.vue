<template>
  <div class="nav">
    <a-icon type="menu-fold" :class="toggleClasses" :style="iconStyle" @click.native="handleToggle"></a-icon>
    {{$route.params.filename}}
    <a-icon
      type="setting"
      class="nav-icon nav-menu"
      :style="iconStyle"
      @click.native="toggleSettingFold(false)"
    ></a-icon>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  computed: {
    ...mapState(["menuFold"]),
    toggleClasses() {
      return [
        "nav-icon",
        "nav-toggle",
        `nav-toggle-${this.menuFold ? "unfold" : "fold"}`
      ];
    },
    iconStyle() {
      return {
        fontSize: "20px"
      };
    }
  },
  methods: {
    ...mapMutations(["toggleMenuFold", "toggleSettingFold"]),
    handleToggle() {
      this.toggleMenuFold();
    }
  }
};
</script>

<style lang='less' scoped>
@import "../common/style/index.less";

.nav {
  position: sticky;
  top: 0px;
  height: @nav-height;
  line-height: @nav-height;
  color: @nav-color;
  background: @nav-bg;
  // border-bottom: 5px solid @nav-border-color;
  // background: @nav-color;

  &-icon {
    .anim-normal;
    .cursor-pointer;
    position: absolute;
    top: (@nav-height / 2) - 10px;
  }

  &-toggle {
    left: 10px;

    &-fold {
      transform: rotate(180deg);
    }
  }

  &-menu {
    right: 10px;
  }
}
</style>