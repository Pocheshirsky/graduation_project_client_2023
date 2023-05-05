import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from "@/views/HomeView.vue";
import SearchingView from "@/views/SearchingView.vue";
import TestingView from "@/views/TestingView.vue";
import ProfileView from "@/views/ProfileView.vue";
import LogInView from "@/views/LogInView.vue";
import SignUpView from "@/views/SignUpView.vue";
import DevPanelView from "@/views/DevPanelView";
import MessengerView from "@/views/MessengerView";
import ChatView from "@/views/ChatView";
import StartTestingView from "@/views/StartTestingView";


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/searching',
    name: 'searching',
    component: SearchingView
  },
  {
    path: '/start_testing',
    name: 'StartTesting',
    component: StartTestingView
  },
  {
    path: '/testing',
    name: 'testing',
    component: TestingView
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView
  },
  {
    path: '/logout',
    name: 'logOut',
    component: HomeView
  },
  {
    path: '/login',
    name: 'logIn',
    component: LogInView
  },
  {
    path: '/signup',
    name: 'signUp',
    component: SignUpView
  },
  {
    path: '/devpanel',
    name: 'devPanel',
    component: DevPanelView
  },
  {
    path: '/messenger',
    name: 'messenger',
    component: MessengerView
  },
  {
    path: '/chat',
    name: 'chat',
    component: ChatView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
