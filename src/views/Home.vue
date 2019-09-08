<template>
  <div :class="homeClasses" @contextmenu="handleContextmenu">
    <Side :class="sideClasses"></Side>
    <Main :class="mainClasses"></Main>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Main from "../components/Main";
import Side from "../components/Sidebar";

const prefixCls = "home";

export default {
  name: "home",
  components: {
    Main,
    Side
  },
  computed: {
    ...mapState(["menuFold"]),
    homeClasses() {
      return prefixCls;
    },
    mainClasses() {
      return [
        `${prefixCls}-main`,
        this.menuFold ? `${prefixCls}-main-fold` : ""
      ];
    },
    sideClasses() {
      return [
        `${prefixCls}-side`,
        this.menuFold ? `${prefixCls}-side-fold` : ""
      ];
    }
  },
  methods: {
    handleContextmenu(e) {
      e.preventDefault();
    }
  }
};
</script>

<style lang="less">
@import "../common/style/index.less";
@sidebar-fold-width: 0;

.home {
  .relative;
  height: 100%;

  &-side {
    width: @sidebar-width;
    padding: @offset-small;

    &-fold {
      width: @sidebar-fold-width;
      padding: 0;
    }
  }

  &-main {
    margin-left: @sidebar-width;

    &-fold {
      margin-left: @sidebar-fold-width;
    }
  }
}
</style>
