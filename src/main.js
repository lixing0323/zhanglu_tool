import Vue from 'vue'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import Element from 'element-ui'
import './styles/element-variables.scss'
import '@/styles/index.scss' // global css
import '@/styles/main.scss' // global css
import '@/styles/business.scss'

import i18n from './lang' // internationalization
import App from './App'

import router from './router'

import './icons' // icon
import './permission' // permission control

// import 'vue2-animate/src/sass/vue2-animate.scss'
import * as filters from './filters' // global filters
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
import VueCropper from 'vue-cropper'

import ElementResizeDetectorMaker from 'element-resize-detector'
Vue.prototype.$erd = ElementResizeDetectorMaker()

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
Vue.use(Element, {
  size: 'mini', // set element-ui default size,
  i18n: (key, value) => i18n.t(key, value)
})

// 自动批量注册@/components底下的组件
// import components from '@/components/index.js'
// Vue.use(components)
import '@/components/index.js'

// Vue-moment
const moment = require('moment')
require('moment/locale/zh-cn')
Vue.use(require('vue-moment'), {
  moment
})
Vue.use(Viewer, { defaultOptions: { zIndex: 9999 }})
Vue.use(VueCropper)

import { pinia } from '@/store'

// endregion
// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  pinia,
  i18n,
  render: h => h(App)
})
