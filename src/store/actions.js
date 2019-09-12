export default {
	setThemeDark({ commit }, args) {
		commit("SET_DARK_THEME", args)
	},
	setUpdateMenu({ commit }, args) {
		commit("SET_UPDATE_MENU", args)
	},
	toggleMenuFold({ commit }, args) {
		commit("TOGGLE_MENU", args)
	},
	toggleSettingFold({ commit }, args) {
		commit("TOGGLE_SETTING", args)
	},
	addNode({ commit }, args) {
		commit("ADD_NODE", args)
	},
	renameNode({ commit }, args) {
		commit("RENAME_NODE", args)
	},
	deleteNode({ commit }, args) {
		commit("DELETE_NODE", args)
	},
	setFileStatsByName({ commit }, args) {
		commit("SET_FILE_STATE_BY_NAME", args)
	}
}
