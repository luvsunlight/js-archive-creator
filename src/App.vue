<template>
  <div id="app" @contextmenu="handleContextmenu">
    <Side class="side"></Side>
    <div :class="mainClasses">
      <Nav></Nav>
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Nav from "./components/Nav";
import Side from "./components/Sidebar";

export default {
  components: { Nav, Side },
  computed: {
    ...mapState(["menuFold"]),
    mainClasses() {
      return ["main", `main-${this.menuFold ? "fold" : "unfold"}`];
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
@import "./common/style/index.less";

html,
body,
#app {
  height: 100%;
}

* {
  margin: 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: @color-blue-3;
}

#app {
  .relative;
  height: 100%;

  .side {
    width: @sidebar-width;
    padding: @offset-small;
  }

  .main {
    .relative;
    .anim-normal;
    height: 100%;
    margin-left: @sidebar-width;
    // padding: @offset-base;
    background: @main-bg;
    z-index: @z-index-main;
    overflow: auto;

    &::-webkit-scrollbar {
      width: 10px;
      height: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: @scrollbar-color;
    }

    &::-webkit-scrollbar-track {
      background: @scrollbar-bg;
    }

    &-fold {
      margin-left: @sidebar-fold-width;
      padding: 0;
    }
  }
}
</style>
