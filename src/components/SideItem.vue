<template>
  <li class="item">
    <div
      class="item-title"
      :class="{hover:hover}"
      @click="handleClick"
      @contextmenu="handleContextmenu"
    >
      <a-icon :type="iconType" class="item-title-icon"></a-icon>
      <Input
        ref="input"
        v-model="name"
        :editable="false"
        @blur="handleBlur"
        @change="handleRename"
      />
    </div>
    <ul class="item-children" v-show="open && openable()">
      <SideItem v-for="item in data.children" :key="item.name" :data="item" :Event="Event"></SideItem>
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
    let { name = "默认文件夹", type = "folder" } = this.data;
    Object.assign(this, { name, type });
    this.oldName = name;

    this.Event.$on("blur", e => {
      this.hover = false;
    });
  },
  computed: {
    ...mapGetters(["getFileStatsByName"]),
    isFile() {
      return this.data.type === "file";
    },
    isFolder() {
      return this.data.type === "folder" || this.data.type !== "file";
    },
    iconType() {
      if (this.isFolder) {
        return this.open && this.openable() ? "folder-open" : "folder";
      } else {
        return "file";
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
      } else if (this.isFile && this.$route.params.filename !== this.name) {
        this.$router.push(`/${this.name}`);
      }
    },
    handleContextmenu(e) {
      this.hover = true;
      this.Event.$emit("contextmenu", { e, context: this });
    },
    handleBlur(e) {
      this.oldName = this.name;
    },
    handleRename(e) {
      if (this.isFile) {
        let item = this.getFileStatsByName(this.oldName);
        item.name = this.name;
      }

      this.renameNode({ oldName: this.oldName, newName: this.name });
    }
  }
};
</script>

<style lang='less' scoped>
@import "../common/style/index.less";

.item {
  list-style: none;

  &-title {
    .cursor-pointer;
    .relative;
    padding: @offset-tiny / 2 @offset-small;

    &.hover,
    &:hover {
      background: @color-blue-2;
    }
  }

  &-children {
    padding-left: 20px;
  }
}
</style>