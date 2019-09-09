import Vue from "vue"
import Router from "vue-router"
import Index from "./views/Index.vue"
import File from "./views/File.vue"
import NotFoundPage from "./views/404.vue"
import NProgress from "nprogress"
import "nprogress/nprogress.css"

NProgress.configure({ easing: "ease", speed: 500 })
Vue.use(Router)

const router = new Router({
	routes: [
		{ path: "/", name: "Index", component: Index },
		{
			path: "/file/:filename",
			name: "File",
			component: File
		},
		{
			path: "*",
			name: "404",
			component: NotFoundPage
		}
	]
})

router.beforeEach((to, from, next) => {
	NProgress.start()
	next()
})

router.afterEach((to, from) => {
	NProgress.done()
})

export default router
