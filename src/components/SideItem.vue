<template>
  <li class="item">
    <div
      class="item-title"
      :class="{hover,active}"
      @click="handleClick"
      @contextmenu="handleContextmenu"
    >
      <IconFont :type="iconType"></IconFont>
      <Input
        ref="input"
        :value="data.name"
        :editable="false"
        @blur="handleBlur"
        @change="handleRename"
      />
    </div>
    <ul class="item-children" v-show="open && openable()">
      <SideItem
        v-for="item in data.children"
        :key="getNewKey(item.type)"
        :data="item"
        :Event="Event"
      ></SideItem>
    </ul>
  </li>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import Input from "./Input";

export default {
  name: "SideItem",
  components: { Input },
  props: {
    Event: {
      type: Object,
      default: () => {}
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      active: false,
      hover: false,
      open: true,
      oldName: "",
      name: null
    };
  },
  mounted() {
    this.name = this.data.name;
    this.oldName = this.data.name;

    this.Event.$on("blur", e => {
      this.hover = false;
      if (this.$route.params.filename !== this.name) {
        this.active = false;
      }
    });
  },
  computed: {
    ...mapGetters(["getNewKey", "getFileStatsByName"]),
    isFile() {
      return this.data.type === "file";
    },
    isFolder() {
      return this.data.type === "folder" || this.data.type !== "file";
    },
    iconType() {
      if (this.isFolder) {
        return this.open && this.openable()
          ? "icon-folder-open"
          : "icon-folder";
      } else {
        return "icon-file";
      }
    }
  },
  methods: {
    ...mapMutations(["renameNode"]),
    openable() {
      return this.isFolder && this.data.children && this.data.children.length
        ? true
        : false;
    },
    handleClick() {
      if (this.openable()) {
        this.open = !this.open;
      } else if (
        this.isFile &&
        this.$route.params.filename !== this.data.name
      ) {
        this.active = true;
        this.$router.push(`/file/${this.data.name}`);
      }
    },
    handleContextmenu(e) {
      this.hover = true;
      this.Event.$emit("contextmenu", { e, context: this });
    },
    handleBlur(e) {
      this.oldName = this.data.name;
    },
    handleRename(v) {
      if (this.isFile) {
        let item = this.getFileStatsByName(this.oldName);
        if (item) item.name = this.data.name;
      }

      this.renameNode({ oldName: this.oldName, newName: v });
    }
  }
};
</script>

<style lang='less' scoped>
@import "../common/style/index.less";

.item {
  .anim-normal;
  list-style: none;

  &-title {
    .relative;
    .font-bold;
    .cursor-pointer;

    padding: @offset-tiny / 2 @offset-small;

    &.hover,
    &:hover {
      color: @sidebar-hover-color;
      background: @sidebar-hover-bg;
    }

    &.active {
      color: @sidebar-active-color;
      background: @sidebar-active-bg;
    }
  }

  &-children {
    padding-left: 20px;
  }
}
</style>