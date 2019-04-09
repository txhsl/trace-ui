<template>
    <div class="">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-sort"></i> 交易一览</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-tabs v-model="message">
                <el-tab-pane :label="`已完成(${completed.length})`" name="first">
                    <el-table :data="completed" style="width: 100%">
                        <el-table-column type="expand">
                            <template slot-scope="props">
                                <el-form label-position="left" inline class="demo-table-expand">
                                    <el-form-item label="任务主题">
                                        <span>{{ props.row.title }}</span>
                                    </el-form-item>
                                    <el-form-item label="任务内容">
                                        <span>{{ props.row.content }}</span>
                                    </el-form-item>
                                    <el-form-item label="发送者">
                                        <span>{{ props.row.sender }}</span>
                                    </el-form-item>
                                    <el-form-item label="任务状态">
                                        <span>{{ props.row.status.done ? "已完成" : "未完成"}}</span>
                                    </el-form-item>
                                    <el-form-item label="交易Hash">
                                        <span>{{ props.row.receipt.transactionHash }}</span>
                                    </el-form-item>
                                    <el-form-item label="Gas花费">
                                        <span>{{ props.row.receipt.gasUsed }}</span>
                                    </el-form-item>
                                    <el-form-item label="所在区块">
                                        <span>{{ props.row.receipt.blockHash }}</span>
                                    </el-form-item>
                                    <el-form-item label="所在高度">
                                        <span>{{ props.row.receipt.blockNumber }}</span>
                                    </el-form-item>
                                    <el-form-item label="交易日志">
                                        <span>{{ props.row.receipt.logs }}</span>
                                    </el-form-item>
                                </el-form>
                            </template>
                        </el-table-column>
                        <el-table-column label='任务主题'>
                            <template slot-scope="scope">
                                <span class="message-title">{{scope.row.title}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="content" label='任务内容' width="300"></el-table-column>
                        <el-table-column prop="sender" label='发送者' width="300"></el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane :label="`正在处理(${pending.length})`" name="second">
                    <template v-if="message === 'second'">
                        <el-table :data="pending" style="width: 100%">
                            <el-table-column type="expand">
                                <template slot-scope="props">
                                    <el-form label-position="left" inline class="demo-table-expand">
                                        <el-form-item label="任务主题">
                                            <span>{{ props.row.title }}</span>
                                        </el-form-item>
                                        <el-form-item label="任务内容">
                                            <span>{{ props.row.content }}</span>
                                        </el-form-item>
                                        <el-form-item label="发送者">
                                            <span>{{ props.row.sender }}</span>
                                        </el-form-item>
                                        <el-form-item label="任务状态">
                                            <span>{{ props.row.status.done ? "已完成" : "未完成"}}</span>
                                        </el-form-item>
                                    </el-form>
                                </template>
                            </el-table-column>
                            <el-table-column label='任务主题'>
                                <template slot-scope="scope">
                                    <span class="message-title">{{scope.row.title}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="content" label='任务内容' width="300"></el-table-column>
                            <el-table-column prop="sender" label='发送者' width="300"></el-table-column>
                        </el-table>
                    </template>
                </el-tab-pane>
                <el-tab-pane :label="`异常交易(${error.length})`" name="third">
                    <template v-if="message === 'third'">
                        <el-table :data="error" style="width: 100%">
                            <el-table-column type="expand">
                                <template slot-scope="props">
                                    <el-form label-position="left" inline class="demo-table-expand">
                                        <el-form-item label="任务主题">
                                            <span>{{ props.row.title }}</span>
                                        </el-form-item>
                                        <el-form-item label="任务内容">
                                            <span>{{ props.row.content }}</span>
                                        </el-form-item>
                                        <el-form-item label="发送者">
                                            <span>{{ props.row.sender }}</span>
                                        </el-form-item>
                                        <el-form-item label="任务状态">
                                            <span>{{ props.row.status.cancelled ? "已取消" : "异常"}}</span>
                                        </el-form-item>
                                    </el-form>
                                </template>
                            </el-table-column>
                            <el-table-column label='任务主题'>
                                <template slot-scope="scope">
                                    <span class="message-title">{{scope.row.title}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="content" label='任务内容' width="300"></el-table-column>
                            <el-table-column prop="sender" label='发送者' width="300"></el-table-column>
                        </el-table>
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
                completed: [],
                pending: [],
                error: []
            }
        },
        methods: {
            getTasks(){
                this.$axios.get('/service/transaction/completed')
                    .then(res => {
                        res.data.forEach(task => {
                            this.completed.push({
                                title: task.taskName,
                                content: task.taskContent,
                                sender: task.taskSender,
                                status: task.future,
                                receipt: task.receipt
                            })
                        });
                    })
                    .catch(err => {
                        this.$message.error('获取失败：已完成交易');
                    });
                this.$axios.get('/service/transaction/pending')
                    .then(res => {
                        res.data.forEach(task => {
                            this.completed.push({
                                title: task.taskName,
                                content: task.taskContent,
                                sender: task.taskSender,
                                status: task.future
                            })
                        });
                    })
                    .catch(err => {
                        this.$message.error('获取失败：未完成交易');
                    });
                this.$axios.get('/service/transaction/pending')
                    .then(res => {
                        res.data.forEach(task => {
                            this.completed.push({
                                title: task.taskName,
                                content: task.taskContent,
                                sender: task.taskSender,
                                status: task.future
                            })
                        });
                    })
                    .catch(err => {
                        this.$message.error('获取失败：未完成交易');
                    });
                this.$axios.get('/service/transaction/error')
                    .then(res => {
                        res.data.forEach(task => {
                            this.completed.push({
                                title: task.taskName,
                                content: task.taskContent,
                                sender: task.taskSender,
                                status: task.future
                            })
                        });
                    })
                    .catch(err => {
                        this.$message.error('获取失败：异常交易');
                    });
            }
        },
        computed: {
            unreadNum(){
                return this.completed.length;
            }
        },
        created() {
            this.getTasks();
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
.demo-table-expand {
    font-size: 0;
}
.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}
.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%;
}
</style>

