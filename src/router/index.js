import { createRouter, createWebHashHistory } from 'vue-router'
// import Login from '../components/Login/Login'
const Login = () => import(/* webpackChunkName: "login_home_welcome" */ '../components/Login/Login')
// import Home from '../components/Home/Home'
const Home = () => import(/* webpackChunkName: "login_home_welcome" */ '../components/Home/Home')
// import Welcome from '../components/Welcome/Welcome'
const Welcome = () => import(/* webpackChunkName: "login_home_welcome" */ '../components/Welcome/Welcome')
// import Users from '@/components/Users/Users'
const Users = () => import(/* webpackChunkName: "Users" */ '../components/Users/Users')
// import Waste from '@/components/Waste/Waste/Waste'
const Waste = () => import(/* webpackChunkName: "Waste" */ '../components/Waste/Waste/Waste')
// import WasteCategory from '@/components/Waste/WasteCategory/WasteCategory'
const WasteCategory = () => import(/* webpackChunkName: "Waste" */ '../components/Waste/WasteCategory/WasteCategory')
// import WasteTest from '@/components/Waste/WasteTest/WasteTest'
const WasteTest = () => import(/* webpackChunkName: "Waste" */ '../components/Waste/WasteTest/WasteTest')
// import Question from '@/components/Question/Question/Question'
const Question = () => import(/* webpackChunkName: "Question" */ '../components/Question/Question/Question')
// import QuestionAdd from '@/components/Question/QuestionAdd/QuestionAdd'
const QuestionAdd = () => import(/* webpackChunkName: "Question" */ '../components/Question/QuestionAdd/QuestionAdd')
// import Article from '@/components/Article/Article/Article'
const Article = () => import(/* webpackChunkName: "Article_Cahrt" */ '../components/Article/Article/Article')
// import ArticleAdd from '@/components/Article/ArticleAdd/ArticleAdd'
const ArticleAdd = () => import(/* webpackChunkName: "Article_Cahrt" */ '../components/Article/ArticleAdd/ArticleAdd')
// import ArticleCategory from '@/components/Article/ArticleCategory/ArticleCategory'
const ArticleCategory = () => import(/* webpackChunkName: "Article" */ '../components/Article/ArticleCategory/ArticleCategory')
const Chart = () => import(/* webpackChunkName: "Article_Cahrt" */ '../components/Chart')
const routes = [
  { path: '/', redirect: '/login'},
  {path: '/login', name:'Login', component: Login },
  {
    path:'/home', 
    name:'home', 
    component:Home,
    redirect: '/welcome',
    children: [
      {path: '/welcome', component: Welcome}, 
      {path: '/users', component: Users}, 
      {path: '/waste', component: Waste},
      {path: '/waste/category', component: WasteCategory},
      {path: '/waste/test', component: WasteTest},
      {path: '/question', component: Question},
      {path: '/question/add', component: QuestionAdd},
      {path: '/article', component: Article},
      {path: '/article/add', name: 'articleAdd', component: ArticleAdd},
      {path: '/article/category', component: ArticleCategory},
      {path: '/chart', component: Chart}
  ] 
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) =>{
  if(to.path === '/login') return next();
  const tokenStr = window.sessionStorage.getItem('token');
  if( !tokenStr )  return next('/login');
  next();
});

export default router
