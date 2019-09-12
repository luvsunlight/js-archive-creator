import Vue from "vue"
import Vuex from "vuex"
import getters from "./getters"
import mutations from "./mutations"
import actions from "./actions"

Vue.use(Vuex)

const state = {
	isDark: false,
	updateMenu: true,
	menuFold: false,
	settingFold: true,
	fileSys: {
		name: "Archive",
		type: "folder",
		children: [
			{
				name: "新建文件夹1",
				type: "folder"
			},
			{ name: "新建文件夹2", type: "folder" }
		]
	},
	fileStats: [],
	newFileIndex: 1,
	newFolderIndex: 1
}

export default new Vuex.Store({
	state,
	getters,
	mutations,
	actions
})
