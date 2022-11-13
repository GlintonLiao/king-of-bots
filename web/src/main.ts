import { ViteSSG } from 'vite-ssg'
import { setupLayouts } from 'virtual:generated-layouts'
import Previewer from 'virtual:vue-component-preview'
import App from './App.vue'
import type { UserModule } from './types'
import generatedRoutes from '~pages'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

const routes = setupLayouts(generatedRoutes)
export const createApp = ViteSSG(
  App,
  { routes, base: import.meta.env.BASE_URL },
  (ctx) => {
    // install all modules under `modules/`
    Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
      .forEach(i => i.install?.(ctx))
    ctx.app.use(Previewer)

    // login if local storage has token, otherwise to the login page
    const user = useUserStore()
    ctx.router.beforeEach((to, from, next) => {
      let flag = 1

      if (typeof window !== 'undefined') {
        const jwtToken = localStorage.getItem('jwtToken')
        if (jwtToken) {
          user.token = jwtToken
          const response = user.getInfo()
          response.then((data) => {
            if (data) {
              user.isLogin = true
              user.username = data.username
              user.photo = data.photo
              user.id = data.id
              next()
            } else {
              ctx.router.push('/account/login/')
            }
          })
        }
        else {
          flag = 2
          if (to.meta.requestAuth && !user.isLogin) {
            if (flag === 1) next()
            else next('/account/login')
          } else {
            next()
          }
        }
      }
    })
  },
)
