<template>
    <div class="">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-message"></i> Messages</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-tabs v-model="message">
                <el-tab-pane :label="`New(${unread.length})`" name="first">
                    <el-table :data="unread" style="width: 100%">
                        <el-table-column label='Title'>
                            <template slot-scope="scope">
                                <span class="message-title">{{scope.row.title}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="type" label='Type' width="160"></el-table-column>
                        <el-table-column prop="target" label='From' width="300"></el-table-column>
                        <el-table-column prop="date" label='Time' width="150"></el-table-column>
                        <el-table-column width="180">
                            <template slot-scope="scope">
                                <el-button type="primary" size="small" @click="handleAccept(scope.$index, scope.row)">Accept</el-button>
                                <el-button size="small" @click="handleIgnore(scope.$index, scope.row)">Ignore</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="handle-row">
                        <el-button type="primary" @click="handleIgnoreAll()">Ignore All</el-button>
                    </div>
                </el-tab-pane>
                <el-tab-pane :label="`Accepted(${accepted.length})`" name="second">
                    <template v-if="message === 'second'">
                        <el-table :data="accepted" style="width: 100%">
                            <el-table-column label='Title'>
                                <template slot-scope="scope">
                                    <span class="message-title">{{scope.row.title}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="type" label='Type' width="160"></el-table-column>
                            <el-table-column prop="target" label='From' width="300"></el-table-column>
                            <el-table-column prop="date" label='Time' width="150"></el-table-column>
                            <el-table-column width="180">
                                <template slot-scope="scope">
                                    <el-button type="danger" @click="handleDelAcp(scope.$index, scope.row)">Delete</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="handle-row">
                            <el-button type="danger" @click="handleDeleteAll()">Delete All</el-button>
                        </div>
                    </template>
                </el-tab-pane>
                <el-tab-pane :label="`Ignored(${ignored.length})`" name="third">
                    <template v-if="message === 'third'">
                        <el-table :data="ignored" style="width: 100%">
                            <el-table-column label='Title'>
                                <template slot-scope="scope">
                                    <span class="message-title">{{scope.row.title}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="type" label='Type' width="160"></el-table-column>
                            <el-table-column prop="target" label='From' width="300"></el-table-column>
                            <el-table-column prop="date" label='Time' width="150"></el-table-column>
                            <el-table-column width="180">
                                <template slot-scope="scope">
                                    <el-button type="primary" size="small" @click="handleAcceptIgn(scope.$index, scope.row)">Accept</el-button>
                                    <el-button @click="handleDelIgn(scope.$index, scope.row)">Delete</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="handle-row">
                            <el-button type="danger" @click="handleDeleteAllIgn()">Delete All</el-button>
                        </div>
                    </template>
                </el-tab-pane>
                <el-tab-pane :label="`Receipts(${receipts.length})`" name="fourth">
                    <template v-if="message === 'fourth'">
                        <el-table :data="receipts" style="width: 100%">
                            <el-table-column label='Title'>
                                <template slot-scope="scope">
                                    <span class="message-title">{{scope.row.title}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="type" label='Type' width="160"></el-table-column>
                            <el-table-column prop="target" label='From' width="300"></el-table-column>
                            <el-table-column prop="date" label='Time' width="150"></el-table-column>
                            <el-table-column width="180">
                                <template slot-scope="scope">
                                    <el-button @click="handleDelRcp(scope.$index, scope.row)">Delete</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="handle-row">
                            <el-button type="danger" @click="handleDeleteAllRcp()">Delete All</el-button>
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
                                    type: this.localize(message.type, message.permission.isRead),
                                    title: message.permission.propertyName,
                                    index: count++
                                });
                            }
                            else if (message.read) {
                                this.ignored.push({
                                    date: message.time,
                                    target: message.permission.target,
                                    type: this.localize(message.type, message.permission.isRead),
                                    title: message.permission.propertyName,
                                    index: count++
                                });
                            }
                            else {
                                this.unread.push({
                                    date: message.time,
                                    target: message.permission.target,
                                    type: this.localize(message.type, message.permission.isRead),
                                    title: message.permission.propertyName,
                                    index: count++
                                });
                            }
                        });
                    });
                localStorage.setItem('ms_message', this.unread.length);
            },
            getReceipts() {
                this.$axios.get('/service/message/receipt')
                    .then(res => {
                        res.data.forEach(receipt => {
                            this.receipts.push({
                                date: receipt.time,
                                target: receipt.permission.target,
                                type: this.localize(receipt.type, receipt.permission.isRead),
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
                        this.$message.success('Success!');
                    }).catch(err => {
                        this.$message.error('Error!');
                    })
            },
            handleAcceptIgn(index, row) {
                const item = this.ignored.splice(index, 1);
                this.accepted = this.accepted.concat(item);
                this.$axios.put('/service/message/accept/'+row.index)
                    .then(res => {
                        this.$message.success('Success!');
                    }).catch(err => {
                        this.$message.error('Error!');
                    })
            },
            handleIgnore(index, row) {
                const item = this.unread.splice(index, 1);
                this.ignored = this.ignored.concat(item);
                this.$axios.put('/service/message/read/'+row.index)
                    .then(res => {
                        this.$message.success('Success!');
                    }).catch(err => {
                        this.$message.error('Error!');
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
            },
            localize(type, isRead) {
                switch(type) {
                    case '注册':
                        return 'Register';
                    case '属性':
                        return 'Property';
                    case '角色':
                        return 'Role';
                    case '权限':
                        if(isRead)
                            return 'Read Permission';
                        else
                            return 'Write Permission';
                    case '检举':
                        return 'Report';
                    default:
                        return '';
                }
            }
        },
        mounted() {
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

