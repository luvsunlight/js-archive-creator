import Vue from "vue"

const findNodeByName = (node, name, type = "file") => {
	if (node.name === name && node.type === type) {
		return node
	} else if (node.children && node.children.length) {
		for (let i = 0; i < node.children.length; i++) {
			let child = node.children[i]
			let result = findNodeByName(child, name, type)
			if (result) {
				return result
			}
		}
	} else {
		return null
	}
}

const deleteNodeByName = (node, name) => {
	if (node.name == name) {
		return true
	} else if (node.children && node.children.length) {
		for (let i = 0; i < node.children.length; i++) {
			let child = node.children[i]
			let result = deleteNodeByName(child, name)
			if (result) {
				node.children.splice(i, 1)
			}
		}
	} else {
		return null
	}
}

const forceUpdate = context => {
	context.$store.dispatch("setUpdateMenu", false)
	Vue.nextTick(() => {
		context.$store.dispatch("setUpdateMenu", true)
	})
}

export { findNodeByName, deleteNodeByName, forceUpdate }
