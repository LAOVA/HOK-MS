import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'
import ItemList from '../views/ItemList.vue'
import ItemEdit from '../views/ItemEdit.vue'
import HeroList from '../views/HeroList.vue'
import HeroEdit from '../views/HeroEdit.vue'
import ArticleList from '../views/ArticleList.vue'
import ArticleEdit from '../views/ArticleEdit.vue'
import AdList from '../views/AdList.vue'
import AdEdit from '../views/AdEdit.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [
      { path: '/categories/create', component: CategoryEdit, },
      { path: '/categories/list', component: CategoryList, },
      {
        path: '/categories/edit/:id', component: CategoryEdit, props: true
      },
      { path: '/items/create', component: ItemEdit, },
      { path: '/items/list', component: ItemList, },
      { path: '/items/edit/:id', component: ItemEdit, props: true },
      {
        path: '/heros/create', component: HeroEdit,
      },
      { path: '/heros/list', component: HeroList, },
      { path: '/heros/edit/:id', component: HeroEdit, props: true },
      {
        path: '/articles/create', component: ArticleEdit,
      },
      { path: '/articles/list', component: ArticleList, },
      { path: '/articles/edit/:id', component: ArticleEdit, props: true },
      {
        path: '/abs/create', component: AdEdit,
      },
      { path: '/abs/list', component: AdList, },
      { path: '/abs/edit/:id', component: AdEdit, props: true },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
