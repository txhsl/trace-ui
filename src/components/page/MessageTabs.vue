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
                        <el-table-column prop="type" width="160"></el-table-column>
                        <el-table-column prop="target"></el-table-column>
                        <el-table-column prop="date" width="150"></el-table-column>
                        <el-table-column width="180">
                            <template slot-scope="scope">
                                <el-button type="primary" size="small" @click="handleAccept(scope.$index, scope.row)">接受</el-button>
                                <el-button size="small" @click="handleIgnore(scope.$index, scope.row)">忽略</el-button>
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
                            <el-table-column prop="type" width="160"></el-table-column>
                            <el-table-column prop="target"></el-table-column>
                            <el-table-column prop="date" width="150"></el-table-column>
                            <el-table-column width="180">
                                <template slot-scope="scope">
                                    <el-button type="danger" @click="handleDelAcp(scope.$index, scope.row)">删除</el-button>
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
                            <el-table-column prop="type" width="160"></el-table-column>
                            <el-table-column prop="target"></el-table-column>
                            <el-table-column prop="date" width="150"></el-table-column>
                            <el-table-column width="180">
                                <template slot-scope="scope">
                                    <el-button type="primary" size="small" @click="handleAcceptIgn(scope.$index, scope.row)">接受</el-button>
                                    <el-button @click="handleDelIgn(scope.$index, scope.row)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="handle-row">
                            <el-button type="danger" @click="handleDeleteAllIgn()">删除全部</el-button>
                        </div>
                    </template>
                </el-tab-pane>
                <el-tab-pane :label="`已被通过(${receipts.length})`" name="fourth">
                    <template v-if="message === 'fourth'">
                        <el-table :data="receipts" :show-header="false" style="width: 100%">
                            <el-table-column>
                                <template slot-scope="scope">
                                    <span class="message-title">{{scope.row.title}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="type" width="160"></el-table-column>
                            <el-table-column prop="target"></el-table-column>
                            <el-table-column prop="date" width="150"></el-table-column>
                            <el-table-column width="180">
                                <template slot-scope="scope">
                                    <el-button @click="handleDelRcp(scope.$index, scope.row)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="handle-row">
                            <el-button type="danger" @click="handleDeleteAllRcp()">删除全部</el-button>
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
                unread: [],
                accepted: [],
                ignored: [],
                receipts: []
            }
        },
        methods: {
            getMessages() {
                this.$axios.get('/service/message/receive')
                    .then(res => {
                        let count = 0;
                        res.data.forEach(message => {
                            if (message.accepted) {
                                this.accepted.push({
                                    date: message.time,
                                    target: message.permission.target,
                                    type: message.permission.isRead ? 'Read Permission' : 'Write Permission',
                                    title: message.permission.propertyName,
                                    index: count++
                                });
                            }
                            else if (message.read) {
                                this.ignored.push({
                                    date: message.time,
                                    target: message.permission.target,
                                    type: message.permission.isRead ? 'Read Permission' : 'Write Permission',
                                    title: message.permission.propertyName,
                                    index: count++
                                });
                            }
                            else {
                                this.unread.push({
                                    date: message.time,
                                    target: message.permission.target,
                                    type: message.permission.isRead ? 'Read Permission' : 'Write Permission',
                                    title: message.permission.propertyName,
                                    index: count++
                                });
                            }
                        });
                    });
            },
            getReceipts() {
                this.$axios.get('/service/message/receipt')
                    .then(res => {
                        res.data.forEach(receipt => {
                            this.receipts.push({
                                date: receipt.time,
                                target: receipt.permission.target,
                                type: receipt.permission.isRead ? 'Read Permission' : 'Write Permission',
                                title: receipt.permission.propertyName
                            });
                        });
                    });
            },
            handleAccept(index, row) {
                const item = this.unread.splice(index, 1);
                this.accepted = this.accepted.concat(item);
                this.$axios.put('/service/message/accept/'+row.index)
                    .then(res => {
                        this.$message.success('处理成功');
                    }).catch(err => {
                        this.$message.error('处理失败');
                    })
            },
            handleAcceptIgn(index, row) {
                const item = this.ignored.splice(index, 1);
                this.accepted = this.accepted.concat(item);
                this.$axios.put('/service/message/accept/'+row.index)
                    .then(res => {
                        this.$message.success('处理成功');
                    }).catch(err => {
                        this.$message.error('处理失败');
                    })
            },
            handleIgnore(index, row) {
                const item = this.unread.splice(index, 1);
                this.ignored = this.ignored.concat(item);
                this.$axios.put('/service/message/read/'+row.index)
                    .then(res => {
                        this.$message.success('处理成功');
                    }).catch(err => {
                        this.$message.error('处理失败');
                    })
            },
            handleDelAcp(index, row) {
                const item = this.accepted.splice(index, 1);
            },
            handleDelIgn(index, row) {
                const item = this.ignored.splice(index, 1);
            },
            handleDelRcp(index, row) {
                const item = this.receipt.splice(index, 1);
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
            },
            handleDeleteAllRcp() {
                this.receipt = [];
            }
        },
        created() {
            this.getMessages();
            this.getReceipts();
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

