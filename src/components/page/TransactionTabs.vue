<template>
    <div class="">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-attention"></i> Monitor</el-breadcrumb-item>
                <el-breadcrumb-item>Tasks</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-tabs v-model="message">
                <el-tab-pane :label="`Completed(${completed.length})`" name="first">
                    <el-table :data="completed" style="width:100%">
                        <el-table-column type="expand">
                            <template slot-scope="props">
                                <el-form label-position="left" inline class="task-table-expand">
                                    <el-form-item label="Task Title">
                                        <span>{{ props.row.title }}</span>
                                    </el-form-item>
                                    <el-form-item label="Content">
                                        <span>{{ props.row.content }}</span>
                                    </el-form-item>
                                    <el-form-item label="Sender">
                                        <span>{{ props.row.sender }}</span>
                                    </el-form-item>
                                    <el-form-item label="Status">
                                        <span>{{ props.row.status.done ? "Completed" : "Pending"}}</span>
                                    </el-form-item>
                                    <el-form-item label="Transaction Hash">
                                        <span>{{ props.row.receipt.transactionHash }}</span>
                                    </el-form-item>
                                    <el-form-item label="Gas Cost">
                                        <span>{{ props.row.receipt.gasUsed }}</span>
                                    </el-form-item>
                                    <el-form-item label="Block Hash">
                                        <span>{{ props.row.receipt.blockHash }}</span>
                                    </el-form-item>
                                    <el-form-item label="Block Number">
                                        <span>{{ props.row.receipt.blockNumber }}</span>
                                    </el-form-item>
                                    <el-form-item label="Logs">
                                        <pre>{{ props.row.receipt.logs }}</pre>
                                    </el-form-item>
                                </el-form>
                            </template>
                        </el-table-column>
                        <el-table-column label='Title'>
                            <template slot-scope="scope">
                                <span class="message-title">{{scope.row.title}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="content" label='Content' width="300"></el-table-column>
                        <el-table-column prop="sender" label='Sender' width="300"></el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane :label="`Pending(${pending.length})`" name="second">
                    <template v-if="message === 'second'">
                        <el-table :data="pending" style="width: 100%">
                            <el-table-column type="expand">
                                <template slot-scope="props">
                                    <el-form label-position="left" inline class="task-table-expand">
                                        <el-form-item label="Task Title">
                                            <span>{{ props.row.title }}</span>
                                        </el-form-item>
                                        <el-form-item label="Content">
                                            <span>{{ props.row.content }}</span>
                                        </el-form-item>
                                        <el-form-item label="Sender">
                                            <span>{{ props.row.sender }}</span>
                                        </el-form-item>
                                        <el-form-item label="Status">
                                            <span>{{ props.row.status.done ? "Completed" : "Pending"}}</span>
                                        </el-form-item>
                                    </el-form>
                                </template>
                            </el-table-column>
                            <el-table-column label='Title'>
                                <template slot-scope="scope">
                                    <span class="message-title">{{scope.row.title}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="content" label='Content' width="300"></el-table-column>
                            <el-table-column prop="sender" label='Sender' width="300"></el-table-column>
                        </el-table>
                    </template>
                </el-tab-pane>
                <el-tab-pane :label="`Error(${error.length})`" name="third">
                    <template v-if="message === 'third'">
                        <el-table :data="error" style="width: 100%">
                            <el-table-column type="expand">
                                <template slot-scope="props">
                                    <el-form label-position="left" inline class="task-table-expand">
                                        <el-form-item label="Task Title">
                                            <span>{{ props.row.title }}</span>
                                        </el-form-item>
                                        <el-form-item label="Content">
                                            <span>{{ props.row.content }}</span>
                                        </el-form-item>
                                        <el-form-item label="Sender">
                                            <span>{{ props.row.sender }}</span>
                                        </el-form-item>
                                        <el-form-item label="Status">
                                            <span>{{ props.row.status.cancelled ? "Cancelled" : "Error"}}</span>
                                        </el-form-item>
                                    </el-form>
                                </template>
                            </el-table-column>
                            <el-table-column label='Title'>
                                <template slot-scope="scope">
                                    <span class="message-title">{{scope.row.title}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="content" label='Content' width="300"></el-table-column>
                            <el-table-column prop="sender" label='Sender' width="300"></el-table-column>
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
                        this.$message.error('Fail to load: Completed');
                    });
                this.$axios.get('/service/transaction/pending')
                    .then(res => {
                        res.data.forEach(task => {
                            this.pending.push({
                                title: task.taskName,
                                content: task.taskContent,
                                sender: task.taskSender,
                                status: task.future
                            })
                        });
                    })
                    .catch(err => {
                        this.$message.error('Fail to load: Pending');
                    });
                this.$axios.get('/service/transaction/error')
                    .then(res => {
                        res.data.forEach(task => {
                            this.error.push({
                                title: task.taskName,
                                content: task.taskContent,
                                sender: task.taskSender,
                                status: task.future
                            })
                        });
                    })
                    .catch(err => {
                        this.$message.error('Fail to load: Error');
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
.task-table-expand {
    font-size: 0;
}
.task-table-expand label {
    width: 150px;
    color: #99a9bf;
}
.task-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%;
    
}
</style>

