import Vue from 'vue'
import Router from 'vue-router'
import Root from '@/components/Root'
import Characters from '@/components/Characters'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Root',
      component: Root
    },
    {
      path: '/characters/page/:page?',
      name: 'Characters',
      component: Characters,
      alias: '/characters',
      props: true
    }
  ]
})
