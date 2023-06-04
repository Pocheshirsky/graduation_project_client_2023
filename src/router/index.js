import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from "@/views/GetStartedView.vue";
import SearchingView from "@/views/SearchingView.vue";
import TestingView from "@/views/TestingView.vue";
import ProfileView from "@/views/ProfileView.vue";
import LogInView from "@/views/LogInView.vue";
import SignUpView from "@/views/SignUpView.vue";
import DevPanelView from "@/views/DevPanelView";
import MessengerView from "@/views/MessengerView";
import ChatView from "@/views/ChatView";
import StartTestingView from "@/views/StartTestingView";
import TestingResultView from "@/views/TestingResultView";
import GetStartedView from "@/views/GetStartedView";
import MainView from "@/views/MainView";
import SearchingConfigurationView from "@/views/SearchingConfigurationView";
import InterlocutorProfileView from "@/views/InterlocutorProfileView";


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'getStarted',
    component: GetStartedView
  },
  {
    path: '/searching',
    name: 'searching',
    component: SearchingView
  },
  {
    path: '/searching_configuration',
    name: 'searchingConfiguration',
    component: SearchingConfigurationView
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
    path: '/testing_result',
    name: 'testingResult',
    component: TestingResultView
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
    path: '/chat/:senderUuid/:recipientUuid',
    name: 'chat',
    component: ChatView
  },
  {
    path: '/interlocutor',
    name: 'interlocutorProfile',
    component: InterlocutorProfileView
  },
  {
    path: '/main',
    name: 'main',
    component: MainView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
