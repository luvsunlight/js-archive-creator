const findNodeByName = (node, name) => {
	if (node.name == name) {
		return node
	} else if (node.children && node.children.length) {
		for (let i = 0; i < node.children.length; i++) {
			let child = node.children[i]
			let result = findNodeByName(child, name)
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

export { findNodeByName, deleteNodeByName }
