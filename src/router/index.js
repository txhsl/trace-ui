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
            meta: { title: 'Board' },
            children:[
                {
                    path: '/dashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: { title: 'Home' }
                },
                {
                    path: '/icon',
                    component: resolve => require(['../components/page/Icon.vue'], resolve),
                    meta: { title: 'Icon' }
                },
                {
                    path: '/permission',
                    component: resolve => require(['../components/page/PermissionTable.vue'], resolve),
                    meta: { title: 'Permissions' }
                },
                {
                    path: '/role',
                    component: resolve => require(['../components/page/RoleTable.vue'], resolve),
                    meta: { title: 'Roles'}
                },
                {
                    path: '/property',
                    component: resolve => require(['../components/page/PropertyTable.vue'], resolve),
                    meta: { title: 'Properties', leaderPermission: true }
                },
                {
                    path: '/read',
                    component: resolve => require(['../components/page/ReadForm.vue'], resolve),
                    meta: { title: 'Read' }
                },
                {
                    path: '/readMultiple',
                    component: resolve => require(['../components/page/ReadMulForm.vue'], resolve),
                    meta: { title: 'Multiple Read' }
                },
                {
                    path: '/write',
                    component: resolve => require(['../components/page/WriteForm.vue'], resolve),
                    meta: { title: 'Save' }
                },
                {
                    path: '/writeMultiple',
                    component: resolve => require(['../components/page/WriteMulForm.vue'], resolve),
                    meta: { title: 'Multiple Save' }
                },
                {
                    path: '/message',
                    component: resolve => require(['../components/page/MessageTabs.vue'], resolve),
                    meta: { title: 'Messages' }
                },
                {
                    path: '/transaction',
                    component: resolve => require(['../components/page/TransactionTabs.vue'], resolve),
                    meta: { title: 'Tasks' }
                },
                {
                    path: '/subscribe',
                    component: resolve => require(['../components/page/SubscribeList.vue'], resolve),
                    meta: { title: 'Subscriptions' }
                },
                {
                    path: '/auditUser',
                    component: resolve => require(['../components/page/AuditUserForm.vue'], resolve),
                    meta: { title: 'User Audit' }
                },
                {
                    path: '/auditProperty',
                    component: resolve => require(['../components/page/AuditPropertyForm.vue'], resolve),
                    meta: { title: 'Property Audit' }
                },
                {
                    path: '/report',
                    component: resolve => require(['../components/page/ReportForm.vue'], resolve),
                    meta: { title: 'Send Report' }
                },
                {
                    path: '/arbitrate',
                    component: resolve => require(['../components/page/ArbitrateForm.vue'], resolve),
                    meta: { title: 'Handle Report' }
                },

                {
                    // 图片上传组件
                    path: '/upload',
                    component: resolve => require(['../components/page/Upload.vue'], resolve),
                    meta: { title: 'Upload Image' }   
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: resolve => require(['../components/page/BaseCharts.vue'], resolve),
                    meta: { title: 'Schart' }
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
            path: '/register',
            component: resolve => require(['../components/page/Register.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
