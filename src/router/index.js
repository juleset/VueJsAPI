import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Books from "../components/Books";
import Categories from "../components/Categories";
import Authors from "../components/Authors";

Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/books',
      name: 'books',
      component: Books
    },
    {
      path: '/categories',
      name: 'categories',
      component: Categories
    },
    {
      path: '/authors',
      name: 'authors',
      component: Authors
    }
  ]
})
