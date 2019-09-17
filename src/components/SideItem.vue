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
        outline
        :value="name"
        :editable="false"
        @blur="handleItemBlur"
        @change="handleItemRename"
      />
    </div>
    <ul class="item-children" v-show="open && (openable() || newItem)">
      <SideItem
        v-for="item in data.children"
        :key="getNewKey(item.type)"
        :data="item"
        :Event="Event"
      ></SideItem>
      <Input
        v-if="newItem"
        ref="newItem"
        outline
        @change="handleNewItemAdd"
        @blur="handleNewItemBlur"
      />
    </ul>
  </li>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import Input from "./Input";
import { api_addFile } from "../api";

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
      init: true,
      newItem: false,
      active: false,
      hover: false,
      open: true,
      oldName: "",
      name: null
    };
  },
  mounted() {
    this.name = this.data.name;
    if (!this.isNameInit(this.name)) this.init = false;

    this.Event.$on("blur", e => {
      this.hover = false;
      if (this.$route.params.filename !== this.name) {
        this.active = false;
      }
    });
  },
  computed: {
    ...mapGetters(["findNode", "getNewKey", "getFileStatsByName"]),
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
    ...mapActions(["addNode", "renameNode", "setFileStatsByName"]),
    isNameExisted(name, type) {
      return this.findNode(name, type) ? true : false;
    },
    isNameInit(name) {
      return name === "new_file" || name === "new_folder";
    },
    isNameValid(name, type) {
      return name && !this.isNameExisted(name, type) && !this.isNameInit(name)
        ? true
        : false;
    },
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
    handleNewItemBlur(e) {
      if (!e) this.newItem = false;
    },
    handleNewItemAdd(e) {
      let type = this.$refs.newItem.itemType;
      if (!this.isNameValid(e, type)) {
        this.$message.error(`name is invalid!`);
        this.$refs.newItem.$el.focus();
      } else {
        this.newItem = false;
        if (type === "file") {
          this.setFileStatsByName({ name: e });
        }
        api_addFile({
          parentNodeName: this.name,
          childNodeName: e,
          type
        });
        // this.addNode({
        //   parentNodeName: this.name,
        //   childNodeName: e,
        //   type
        // });
      }
    },
    handleItemBlur(e) {
      this.name = this.data.name;
    },
    handleItemRename(v) {
      // 防止重名
      if (!this.isNameValid(v)) {
        this.$message.error("name is invalid!");
        return;
      }
      // Reset fileStats
      if (this.isFile) {
        let item = this.getFileStatsByName(this.name);
        if (item) this.setFileStatsByName({ name: this.name, newName: v });
      }

      // Sync route
      if (this.$route.params.filename === this.name) {
        this.$router.push(`/file/${v}`);
      }

      // Reset filsSys
      this.renameNode({ oldName: this.name, newName: v });
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

    padding: @offset-tiny / 4 @offset-small;

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