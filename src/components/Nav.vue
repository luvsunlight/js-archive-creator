<template>
  <div class="nav">
    {{$route.params.filename}}
    <a-icon type="menu-fold" :class="toggleClasses" :style="iconStyle" @click.native="handleToggle"></a-icon>
    <a-icon
      type="setting"
      class="nav-icon nav-menu"
      :style="iconStyle"
      @click.native="toggleSettingFold(false)"
    ></a-icon>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

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
    ...mapActions(["toggleMenuFold", "toggleSettingFold"]),
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
  font-size: @nav-font-size;

  &-icon {
    .anim-normal;
    .cursor-pointer;
    position: absolute;
    top: (@nav-height / 2) - 10px;
  }

  &-toggle {
    left: 10px;
    transform: rotate(180deg);
    &-fold {
      transform: rotate(0);
    }
  }

  &-menu {
    right: 10px;
  }
}
</style>