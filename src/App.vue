<template>
  <div id="app" @contextmenu="handleContextmenu">
    <Side :class="sideClasses"></Side>
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
    sideClasses() {
      return ["side", `side-${this.menuFold ? "fold" : "unfold"}`];
    },
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
    .absolute(0);
    width: @sidebar-width;
    padding: @offset-small;

    &-fold {
      left: -@sidebar-width;
    }
  }

  .main {
    .relative;
    .anim-normal;
    height: 100%;
    margin-left: @sidebar-width;
    padding: @main-padding;
    background: @main-bg;
    z-index: @z-index-main;
    overflow: auto;

    &-fold {
      margin-left: 0;
    }

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
  }
}
</style>
