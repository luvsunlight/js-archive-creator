<template>
  <div v-if="updateMenu" class="side" @click="handleBlur">
    <SideItem :data="fileSys" :Event="Event"></SideItem>
    <Contextmenu :Event="Event"></Contextmenu>
  </div>
</template>

<script>
import Vue from "vue";
import { mapState } from "vuex";
import SideItem from "./SideItem";
import Contextmenu from "./Contextmenu";

const Event = new Vue();

export default {
  components: { SideItem, Contextmenu },
  data() {
    return {
      Event: Event
    };
  },
  mounted() {
    this.Event.$on("update", this.$forceUpdate());
  },
  computed: { ...mapState(["updateMenu", "fileSys", "fileStats"]) },
  methods: {
    handleBlur() {
      this.Event.$emit("blur");
    }
  }
};
</script>

<style lang='less' scoped>
@import "../common/style/index.less";

.side {
  .anim-normal;
  height: 100%;
  background: @sidebar-bg;
  color: @sidebar-color;
  text-align: left;
  overflow: hidden;
  z-index: @z-index-sidebar;
}
</style>