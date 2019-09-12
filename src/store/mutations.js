import { findNodeByName, deleteNodeByName } from "../util"
import {
	SET_DARK_THEME,
	SET_UPDATE_MENU,
	TOGGLE_MENU,
	TOGGLE_SETTING,
	ADD_NODE,
	RENAME_NODE,
	DELETE_NODE,
	SET_FILE_STATE_BY_NAME
} from "./mutation-types"

export default {
	[SET_DARK_THEME](state, isDark) {
		state.isDark = isDark
	},
	[SET_UPDATE_MENU](state, update) {
		state.updateMenu = update
	},
	[TOGGLE_MENU](state) {
		state.menuFold = !state.menuFold
	},
	[TOGGLE_SETTING](state, toggle) {
		state.settingFold = toggle
	},
	[ADD_NODE](state, { parentNodeName, childNodeName, type }) {
		let node = findNodeByName(state.fileSys, parentNodeName, "folder")
		if (!node) return null
		node.children = node.children || []
		node.children.push({
			name: childNodeName,
			type: type,
			children: []
		})
	},
	[RENAME_NODE](state, { oldName, newName, type }) {
		let node = findNodeByName(state.fileSys, oldName, type)
		if (!node) return null
		node.name = newName
	},
	[DELETE_NODE](state, nodeName) {
		deleteNodeByName(state.fileSys, nodeName)
	},
	[SET_FILE_STATE_BY_NAME](
		state,
		{ name, title, desc, code, summary, newName }
	) {
		let file = state.fileStats.find(file => file.name === name)
		if (newName) file.name = newName
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
}
