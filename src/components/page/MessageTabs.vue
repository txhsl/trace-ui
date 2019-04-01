<template>
    <div class="">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-copy"></i> 消息中心</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-tabs v-model="message">
                <el-tab-pane :label="`未读消息(${unread.length})`" name="first">
                    <el-table :data="unread" :show-header="false" style="width: 100%">
                        <el-table-column>
                            <template slot-scope="scope">
                                <span class="message-title">{{scope.row.title}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="target"></el-table-column>
                        <el-table-column prop="date" width="150"></el-table-column>
                        <el-table-column width="180">
                            <template slot-scope="scope">
                                <el-button type="primary" size="small" @click="handleAccept(scope.$index)">接受</el-button>
                                <el-button size="small" @click="handleIgnore(scope.$index)">忽略</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="handle-row">
                        <el-button type="primary" @click="handleIgnoreAll()">全部忽略</el-button>
                    </div>
                </el-tab-pane>
                <el-tab-pane :label="`已接受消息(${accepted.length})`" name="second">
                    <template v-if="message === 'second'">
                        <el-table :data="accepted" :show-header="false" style="width: 100%">
                            <el-table-column>
                                <template slot-scope="scope">
                                    <span class="message-title">{{scope.row.title}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="target"></el-table-column>
                            <el-table-column prop="date" width="150"></el-table-column>
                            <el-table-column width="180">
                                <template slot-scope="scope">
                                    <el-button type="danger" @click="handleDelAcp(scope.$index)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="handle-row">
                            <el-button type="danger" @click="handleDeleteAll()">删除全部</el-button>
                        </div>
                    </template>
                </el-tab-pane>
                <el-tab-pane :label="`已忽略请求(${ignored.length})`" name="third">
                    <template v-if="message === 'third'">
                        <el-table :data="ignored" :show-header="false" style="width: 100%">
                            <el-table-column>
                                <template slot-scope="scope">
                                    <span class="message-title">{{scope.row.title}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="target"></el-table-column>
                            <el-table-column prop="date" width="150"></el-table-column>
                            <el-table-column width="180">
                                <template slot-scope="scope">
                                    <el-button type="primary" size="small" @click="handleAcceptIgn(scope.$index)">接受</el-button>
                                    <el-button @click="handleDelIgn(scope.$index)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="handle-row">
                            <el-button type="danger" @click="handleDeleteAllIgn()">删除全部</el-button>
                        </div>
                    </template>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'tabs',
        data() {
            return {
                message: 'first',
                showHeader: false,
                unread: [{
                    date: '2018-04-19 20:00:00',
                    target: '0x23f9ec3e3916a8f04495165d7cdbe14eb5da5bee',
                    title: 'Producer_Operator',
                }],
                accepted: [{
                    date: '2018-04-19 20:00:00',
                    target: '0x392f19458deb6872fc3ed4f4157fb1ef173c8149',
                    title: 'Producer_Operator'
                }],
                ignored: [{
                    date: '2018-04-19 20:00:00',
                    target: '0x53888073d8cd1350b939e7f0e0776defebbe3a0a',
                    title: 'Producer_Operator'
                }]
            }
        },
        methods: {
            getMessages() {

            },
            handleAccept(index) {
                const item = this.unread.splice(index, 1);
                this.accepted = this.accepted.concat(item);
            },
            handleAcceptIgn(index) {
                const item = this.ignored.splice(index, 1);
                this.accepted = this.accepted.concat(item);
            },
            handleIgnore(index) {
                const item = this.unread.splice(index, 1);
                this.ignored = this.ignored.concat(item);
            },
            handleDelAcp(index) {
                const item = this.accepted.splice(index, 1);
            },
            handleDelIgn(index) {
                const item = this.ignored.splice(index, 1);
            },
            handleDeleteAll() {
                this.accepted = [];
            },
            handleIgnoreAll() {
                this.ignored = this.ignored.concat(this.unread);
                this.unread = [];
            },
            handleDeleteAllIgn() {
                this.ignored = [];
            }
        },
        created() {
            this.getMessages();
        },
        computed: {
            unreadNum(){
                return this.unread.length;
            }
        }
    }

</script>

<style>
.message-title{
    cursor: pointer;
}
.handle-row{
    margin-top: 30px;
}
</style>

