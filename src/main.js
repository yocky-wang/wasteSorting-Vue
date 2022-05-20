import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import '@/assets/css/global.css'
import '@/assets/font/iconfont.css'


const app = createApp(App)
app.use(ElementPlus, {locale: zhCn})

app.use(store).use(router).mount('#app')
