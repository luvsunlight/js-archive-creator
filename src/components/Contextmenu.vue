<template>
  <div class="contextmenu">
    <div v-show="isFolder" class="contextmenu-item" @click="handleNewItem('file')">New File</div>
    <div v-show="isFolder" class="contextmenu-item" @click="handleNewItem('folder')">New Folder</div>
    <div class="contextmenu-item" @click="handleNewName">Rename</div>
    <a-popconfirm :title="deleteMsg" @confirm="handleDelete" okText="Yes" cancelText="No">
      <div class="contextmenu-item">Delete</div>
    </a-popconfirm>
  </div>
</template>

<script>
import Vue from "vue";
import { mapState, mapActions, mapGetters } from "vuex";
import { forceUpdate } from "../util";

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
    ...mapState(["fileSys", "fileStats"]),
    ...mapGetters(["getNewName"]),
    isFolder() {
      return this.context ? this.context.data.type === "folder" : true;
    },
    deleteMsg() {
      return `Are you sure to delete ${
        this.context ? this.context.name : "this"
      }`;
    }
  },
  methods: {
    ...mapActions([
      "setUpdateMenu",
      "setFileStatsByName",
      "addNode",
      "deleteNode"
    ]),
    handleNewItem(type) {
      if (this.isFolder) {
        this.context.newItem = true;
        Vue.nextTick(() => {
          this.context.$refs.newItem.itemType = type;
          this.context.$refs.newItem.$el.focus();
        });
      }
    },
    handleNewName(e) {
      let input = this.context.$refs.input;
      if (input) {
        input.disabled = false;
        Vue.nextTick(() => {
          input.$el.focus();
        });
      }
    },
    handleDelete() {
      if (this.context.name === this.fileSys.name) {
        this.$message.error("Cannot delete ROOT folder");
      } else {
        this.deleteNode(this.context.name);
        forceUpdate(this);
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
  position: fixed;
  width: 100px;
  color: @contextmenu-color;
  background: @contextmenu-bg;
  text-align: center;
  z-index: @z-index-contextmenu;

  &-item {
    .font-bold;
    .cursor-pointer;
    padding: @offset-tiny;

    &:hover {
      background: @contextmenu-hover;
    }
  }
}
</style>