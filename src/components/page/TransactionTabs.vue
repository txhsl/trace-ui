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
                        <el-table-column label='任务名'>
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
                            <el-table-column label='任务名'>
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
                            <el-table-column label='任务名'>
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
            
        },
        computed: {
            unreadNum(){
                return this.completed.length;
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

