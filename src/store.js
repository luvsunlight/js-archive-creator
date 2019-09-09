import Vue from "vue"
import Vuex from "vuex"
import { findNodeByName, deleteNodeByName } from "./util"
import UUID from "uuid-js"

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
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
	},
	getters: {
		getNewName: state => (type = "file") => {
			return `${type}${
				type == "folder" ? state.newFolderIndex++ : state.newFileIndex++
			}`
		},
		getNewKey: state => (type = "file") => {
			return `${type}-${UUID.create().toString()}`
		},
		getFileStatsByName: state => name => {
			return state.fileStats.find(file => file.name === name)
		}
	},
	mutations: {
		setThemeDark(state, isDark) {
			state.isDark = isDark
		},
		setUpdateMenu(state, update) {
			state.updateMenu = update
		},
		toggleMenuFold(state) {
			state.menuFold = !state.menuFold
		},
		toggleSettingFold(state, toggle) {
			state.settingFold = toggle
		},
		addNode(state, { parentNodeName, childNodeName, type }) {
			let node = findNodeByName(state.fileSys, parentNodeName)
			if (!node) return null
			node.children = node.children || []
			node.children.push({
				name: childNodeName,
				type: type,
				children: []
			})
		},

		renameNode(state, { oldName, newName }) {
			let node = findNodeByName(state.fileSys, oldName)
			if (!node) return null
			node.name = newName
		},

		deleteNode(state, nodeName) {
			deleteNodeByName(state.fileSys, nodeName)
		},

		setFileStatsByName(state, { name, title, desc, code, summary }) {
			let file = state.fileStats.find(file => file.name === name)
			if (!file) {
				let {
					title = "title",
					desc = "desc",
					code = "code",
					summary = "summary"
				} = { name, title, desc, code, summary }
				state.fileStats.push({
					name,
					title,
					desc,
					code,
					summary
				})
			} else {
				file.title = title || file.title
				file.desc = desc || file.desc
				file.code = code || file.code
				file.summary = summary || file.summary
			}
		}
	},
	actions: {}
})
