<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index">
                                    {{ threeItem.title }}
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index">
                                {{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from '../common/bus';
    export default {
        data() {
            return {
                collapse: false,
                items: [
                    {
                        icon: 'el-icon-lx-home',
                        index: 'dashboard',
                        title: 'Home'
                    },{
                        icon: 'el-icon-lx-group',
                        index: '1',
                        title: 'Permission Management',
                        subs: [
                            {
                                index: 'permission',
                                title: 'Permissions'
                            },
                            {
                                index: 'role',
                                title: 'Roles'
                            },
                            {
                                index: 'property',
                                title: 'Properties'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-lx-qrcode',
                        index: '2',
                        title: 'Data Management',
                        subs: [
                            {
                                index: '2-1',
                                title: 'Save',
                                subs: [
                                    {
                                        index: 'write',
                                        title: 'Single'
                                    },
                                    {
                                        index: 'writeMultiple',
                                        title: 'Multiple'
                                    }
                                ]
                            },
                            {
                                index: '2-2',
                                title: 'Query',
                                subs: [
                                    {
                                        index: 'read',
                                        title: 'Single'
                                    },
                                    {
                                        index: 'readMultiple',
                                        title: 'Multiple'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-lx-attention',
                        index: '3',
                        title: 'Monitor',
                        subs: [
                            {
                                icon: 'el-icon-lx-sort',
                                index: 'transaction',
                                title: 'Tasks'
                            },
                            {
                                icon: 'el-icon-lx-attention',
                                index: 'subscribe',
                                title: 'Subscriptions'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-lx-search',
                        index: '4',
                        title: 'Report Management',
                        subs: [
                            {
                                index: '4-1',
                                title: 'Audit',
                                subs: [
                                    {
                                        index: 'auditProperty',
                                        title: 'By Receiver'
                                    },
                                    {
                                        index: 'auditUser',
                                        title: 'By Sender'
                                    }
                                ]
                            },
                            {
                                index: '4-2',
                                title: 'Report',
                                subs: [
                                    {
                                        index: 'report',
                                        title: 'Send'
                                    },
                                    {
                                        index: 'arbitrate',
                                        title: 'Handle'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-lx-message',
                        index: 'message',
                        title: 'Messages'
                    }
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom:0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 250px;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
