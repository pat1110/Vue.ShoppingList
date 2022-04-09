import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import HomeLists from "../views/HomeLists.vue";
import ShowList from "../views/CustomShoppingList.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/Home",
    name: "Home",
    component: Home,
  },
  {
    path: "/HomeLists",
    name: "HomeLists",
    component: HomeLists,
  },
  {
    path: "/product/new",
    name: "NewProduct",
    component: Home,
  },
  {
    path: "/product/edit/:poi",
    name: "EditProduct",
    component: Home,
  },
  {
    path: "/list/new",
    name: "NewList",
    component: HomeLists,
  },
  {
    path: "/list/edit/:loi",
    name: "EditList",
    component: HomeLists,
  },
  {
    path: "/list/show/:loi",
    name: "ShowList",
    component: ShowList,
  },
  {
    path: "/CustomShoppingList",
    name: "CustomShoppingList",
    component: ShowList,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
