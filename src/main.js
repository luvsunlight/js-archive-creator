import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import hljs from "highlight.js"
import "highlight.js/styles/atom-one-dark.css"
import javascript from "highlight.js/lib/languages/javascript"

import {
	Button,
	Icon,
	message,
	Popconfirm,
	Drawer,
	Switch
} from "ant-design-vue"

Vue.config.productionTip = false

hljs.registerLanguage("javascript", javascript)
Vue.directive("highlight", function(el) {
	let blocks = el.querySelectorAll("code")
	blocks.forEach(block => {
		hljs.highlightBlock(block)
	})
})

Vue.prototype.$message = message
Vue.use(Popconfirm)
Vue.use(Button)
Vue.use(Icon)
Vue.use(Drawer)
Vue.use(Switch)

const IconFont = Icon.createFromIconfontCN({
	scriptUrl: "//at.alicdn.com/t/font_1396836_xw35qaffnnl.js"
})

Vue.component("IconFont", IconFont)

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount("#app")
