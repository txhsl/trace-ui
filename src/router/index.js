import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/dashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/icon',
                    component: resolve => require(['../components/page/Icon.vue'], resolve),
                    meta: { title: '自定义图标' }
                },
                {
                    path: '/permission',
                    component: resolve => require(['../components/page/PermissionTable.vue'], resolve),
                    meta: { title: '权限一览' }
                },
                {
                    path: '/role',
                    component: resolve => require(['../components/page/RoleTable.vue'], resolve),
                    meta: { title: '角色管理'}
                },
                {
                    path: '/property',
                    component: resolve => require(['../components/page/PropertyTable.vue'], resolve),
                    meta: { title: '属性管理', leaderPermission: true }
                },
                {
                    path: '/read',
                    component: resolve => require(['../components/page/ReadForm.vue'], resolve),
                    meta: { title: '溯源查询' }
                },
                {
                    path: '/readMultiple',
                    component: resolve => require(['../components/page/ReadMulForm.vue'], resolve),
                    meta: { title: '批量查询' }
                },
                {
                    path: '/write',
                    component: resolve => require(['../components/page/WriteForm.vue'], resolve),
                    meta: { title: '存证提交' }
                },
                {
                    path: '/writeMultiple',
                    component: resolve => require(['../components/page/WriteMulForm.vue'], resolve),
                    meta: { title: '批量提交' }
                },
                {
                    path: '/message',
                    component: resolve => require(['../components/page/MessageTabs.vue'], resolve),
                    meta: { title: '消息中心' }
                },
                {
                    path: '/transaction',
                    component: resolve => require(['../components/page/TransactionTabs.vue'], resolve),
                    meta: { title: '交易一览' }
                },

                {
                    // 图片上传组件
                    path: '/upload',
                    component: resolve => require(['../components/page/Upload.vue'], resolve),
                    meta: { title: '文件上传' }   
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: resolve => require(['../components/page/BaseCharts.vue'], resolve),
                    meta: { title: 'schart图表' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: resolve => require(['../components/page/DragList.vue'], resolve),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 拖拽Dialog组件
                    path: '/dialog',
                    component: resolve => require(['../components/page/DragDialog.vue'], resolve),
                    meta: { title: '拖拽弹框' }
                },
                {
                    path: '/404',
                    component: resolve => require(['../components/page/404.vue'], resolve),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: resolve => require(['../components/page/403.vue'], resolve),
                    meta: { title: '403' }
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
