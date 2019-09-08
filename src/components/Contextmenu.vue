<template>
  <div class="contextmenu">
    <div v-show="isFolder" class="contextmenu-item" @click="handleNewFile">New File</div>
    <div v-show="isFolder" class="contextmenu-item" @click="handleNewFolder">New Folder</div>
    <div class="contextmenu-item" @click="handleNewName">Rename</div>
    <a-popconfirm :title="deleteMsg" @confirm="handleDelete" okText="Yes" cancelText="No">
      <div class="contextmenu-item">Delete</div>
    </a-popconfirm>
  </div>
</template>

<script>
import Vue from "vue";
import { mapState, mapMutations, mapGetters } from "vuex";

export default {
  props: {
    Event: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      root: null,
      context: null
    };
  },
  mounted() {
    this.Event.$on("contextmenu", ({ e, context }) => {
      let menu = this.$el;
      this.context = context;
      menu.style.left = e.clientX + "px";
      menu.style.top = e.clientY + "px";
      menu.style.display = "block";
    });
    this.Event.$on("blur", () => {
      let menu = this.$el;
      menu.style.display = "none";
    });
  },
  computed: {
    ...mapState(["rootNodeName", "fileStats"]),
    ...mapGetters(["getNewName"]),
    isFolder() {
      return this.context ? this.context.type === "folder" : true;
    },
    deleteMsg() {
      return `Are you sure to delete ${
        this.context ? this.context.name : "this"
      }`;
    }
  },
  methods: {
    ...mapMutations([
      "setUpdateMenu",
      "setFileStatsByName",
      "addNode",
      "deleteNode"
    ]),
    handleNewFolder(e) {
      if (this.isFolder) {
        let name = this.getNewName("folder");
        this.addNode({
          parentNodeName: this.context.name,
          childNodeName: name,
          type: "folder"
        });
      }
    },
    handleNewFile(e) {
      if (this.isFolder) {
        let name = this.getNewName("file");
        this.addNode({
          parentNodeName: this.context.name,
          childNodeName: name,
          type: "file"
        });
        this.setFileStatsByName({ name });
      }
    },
    handleNewName(e) {
      let input = this.context.$refs.input;
      input.disabled = false;
    },
    handleDelete() {
      if (this.context.name === this.rootNodeName) {
        this.$message.error("Cannot delete ROOT folder");
      } else {
        this.deleteNode(this.context.name);
        this.setUpdateMenu(false); // A HACK to force DOM update
        Vue.nextTick(() => {
          this.setUpdateMenu(true);
        });
        this.$message.success(`Delete <${this.context.name}> successfully`);
      }
    }
  }
};
</script>

<style lang='less' scoped>
@import "../common/style/index.less";

.contextmenu {
  display: none;
  position: absolute;
  width: 100px;
  color: @contextmenu-color;
  background: @contextmenu-bg;
  text-align: center;
  z-index: 100000;

  &-item {
    .cursor-pointer;
    padding: @offset-tiny;
    font-weight: bold;

    &:hover {
      background: @contextmenu-hover;
    }
  }
}
</style>