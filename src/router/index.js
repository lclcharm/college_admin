import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [{
  path: '/login',
  component: () => import('@/views/login/index'),
  hidden: true
},
{
  path: '/404',
  component: () => import('@/views/404'),
  hidden: true
},

{
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  name: 'Dashboard',
  hidden: false,
  meta: {
    title: '首页',
    icon: 'teacherAdmin'
  },
  children: [{
    path: 'dashboard',
    component: () => import('@/views/dashboard/index')
  }]
},

  // 讲师管理
{
  path: '/teacher',
  component: Layout,
  redirect: '/teacher/list',
  name: 'Teacher',
  meta: {
    title: '讲师管理',
    icon: 'teacherAdmin'
  },
  children: [{
    path: 'list',
    name: 'TeacherList',
    component: () => import('@/views/teacher/list'),
    meta: {
      title: '讲师列表',
      icon: 'teacher'
    }
  },
  {
    path: 'create',
    name: 'TeacherCreate',
    component: () => import('@/views/teacher/form'),
    meta: {
      title: '添加讲师',
      icon: 'teacherAdd'
    }
  },
  {
    path: 'edit/:id',
    name: 'TeacherEdit',
    component: () => import('@/views/teacher/form'),
    meta: {
      title: '编辑讲师'
    },
    hidden: true
  }
  ]
},

  // 分类管理
{
  path: '/subject',
  component: Layout,
  redirect: '/subject/list',
  name: 'Subject',
  meta: {
    title: '分类管理',
    icon: 'subject'
  },
  children: [{
    path: 'list',
    name: 'SubjectList',
    component: () => import('@/views/subject/list'),
    meta: {
      title: '分类列表',
      icon: 'subjectAdmin'
    }
  },
  {
    path: 'import',
    name: 'SubjectImport',
    component: () => import('@/views/subject/import'),
    meta: {
      title: '导入分类',
      icon: 'subjectImport'
    }
  }
  ]
},
  // 用户管理
{
  path: '/member',
  component: Layout,
  redirect: '/member/list',
  name: 'Member',
  meta: { title: '用户管理',
    icon: 'member' },
  children: [
    {
      path: 'list',
      name: 'MemberList',
      component: () => import('@/views/member/list'),
      meta: { title: '用户列表',
        icon: 'memberList' }
    }
    // },
    // {
    //   path: 'create',
    //   name: 'MemberList',
    //   component: () => import('@/views/member/form'),
    //   meta: { title: '增加用户',
    //     icon: 'memberEdit' }
    // },
    // {
    //   path: 'edit/:id',
    //   name: 'MemberEdit',
    //   component: () => import('@/views/member/form'),
    //   meta: { title: '编辑用户',
    //     icon: 'memberEdit' },
    //   hidden: true
    // }
  ]
},

  // 视频集管理
{
  path: '/course',
  component: Layout,
  redirect: '/course/list',
  name: 'Course',
  meta: {
    title: '课程管理',
    icon: 'course'
  },
  children: [{
    path: 'list',
    name: 'CourseList',
    component: () => import('@/views/course/list'),
    meta: {
      title: '课程列表',
      icon: 'courseAdmin'
    }
  },
  {
    path: 'info',
    name: 'CourseInfo',
    component: () => import('@/views/course/form'),
    meta: {
      title: '发布课程',
      icon: 'coursePublish'
    }
  },
  {
    path: 'info/:id',
    name: 'CourseInfoEdit',
    component: () => import('@/views/course/form'),
    meta: {
      title: '编辑课程'
    },
    hidden: true
  },
  {
    path: 'chapter/:id',
    name: 'CourseChapterEdit',
    component: () => import('@/views/course/form'),
    meta: {
      title: '编辑大纲'
    },
    hidden: true
  }
  ]
},

  // 文章管理
{
  path: '/article',
  component: Layout,
  redirect: '/article/list',
  name: 'Article',
  meta: { title: '文章管理',
    icon: 'article' },
  children: [
    {
      path: 'list',
      name: 'ArticleList',
      component: () => import('@/views/article/list'),
      meta: { title: '文章列表',
        icon: 'articleList' }
    },
    {
      path: 'create',
      name: 'ArticlePublish',
      component: () => import('@/views/article/form'),
      meta: { title: '增加文章',
        icon: 'articlePublish' }
    },
    {
      path: 'edit/:id',
      name: 'ArticleEdit',
      component: () => import('@/views/article/form'),
      meta: { title: '编辑文章' },
      hidden: true
    }
  ]
},

  // 系统消息
{
  path: '/message',
  component: Layout,
  redirect: '/message/list',
  name: 'Message',
  meta: { title: '系统消息',
    icon: 'message' },
  children: [
    {
      path: 'list',
      name: 'MessageList',
      component: () => import('@/views/message/list'),
      meta: { title: '消息列表',
        icon: 'messageList' }
    },
    {
      path: 'create',
      name: 'messagePublish',
      component: () => import('@/views/message/form'),
      meta: { title: '增加消息',
        icon: 'messagePublish' }
    },
    {
      path: 'edit/:id',
      name: 'MessageEdit',
      component: () => import('@/views/message/form'),
      meta: { title: '编辑消息' },
      hidden: true
    }
  ]
},

  // 内容管理
{
  path: '/ad',
  component: Layout,
  redirect: '/ad/list',
  name: 'Ad',
  meta: {
    title: '内容管理',
    icon: 'adAdmin'
  },
  children: [{
    path: 'list',
    name: 'AdList',
    component: () => import('@/views/ad/list'),
    meta: {
      title: '广告推荐',
      icon: 'ad'
    }
  },
  {
    path: 'create',
    name: 'AdCreate',
    component: () => import('@/views/ad/form'),
    meta: {
      title: '添加广告推荐'
    },
    hidden: true
  },
  {
    path: 'edit/:id',
    name: 'AdEdit',
    component: () => import('@/views/ad/form'),
    meta: {
      title: '编辑广告推荐'
    },
    hidden: true
  },

  {
    path: 'type-list',
    name: 'AdTypeList',
    component: () => import('@/views/adType/list'),
    meta: {
      title: '推荐位',
      icon: 'adt'
    }
  },
  {
    path: 'type-create',
    name: 'AdTypeCreate',
    component: () => import('@/views/adType/form'),
    meta: {
      title: '添加推荐位'
    },
    hidden: true
  },
  {
    path: 'type-edit/:id',
    name: 'AdTypeEdit',
    component: () => import('@/views/adType/form'),
    meta: {
      title: '编辑推荐位'
    },
    hidden: true
  }
  ]
},
// 统计图表
{
  path: '/statistics',
  component: Layout,
  redirect: '/statistics/create',
  name: 'Statistics',
  meta: {
    title: '统计分析',
    icon: 'tongji'
  },
  children: [{
    path: 'create',
    name: 'StatisticsCreate',
    component: () => import('@/views/statistics/create'),
    meta: {
      title: '生成统计',
      icon: 'shengcheng'
    }
  },
  {
    path: 'chart',
    name: 'StatisticsChart',
    component: () => import('@/views/statistics/chart'),
    meta: {
      title: '统计图表',
      icon: 'tongji2'
    }
  }
  ]
},

{
  path: '*',
  redirect: '/404',
  hidden: true
}
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
