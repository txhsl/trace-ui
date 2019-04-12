<template>
    <section class="main">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-attention"></i> 订阅管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="drag-box">
                <div class="drag-box-item">
                    <div class="item-title">已订阅</div>
                    <draggable v-model="subscribed" @remove="removeHandle" :options="dragOptions">
                        <transition-group tag="div" id="todo" class="item-ul">
                            <div v-for="item in subscribed" class="drag-list" :key="item.id">
                                {{item.content}}
                            </div>
                        </transition-group>
                    </draggable>
                </div>
                <div class="drag-box-item">
                    <div class="item-title">未订阅</div>
                    <draggable v-model="unsubscribed" @remove="removeHandle" :options="dragOptions">
                        <transition-group tag="div" id="doing" class="item-ul">
                            <div v-for="item in unsubscribed" class="drag-list" :key="item.id">
                                {{item.content}}
                            </div>
                        </transition-group>
                    </draggable>
                </div>
                <el-table :data="result" style="width: 100%">
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-form label-position="left" inline class="demo-table-expand">
                                <el-form-item label="块Hash">
                                    <span>{{ props.row.blockHash }}</span>
                                </el-form-item>
                                <el-form-item label="块编号">
                                    <span>{{ props.row.blockNumber }}</span>
                                </el-form-item>
                                <el-form-item label="交易Hash">
                                    <span>{{ props.row.hash }}</span>
                                </el-form-item>
                                <el-form-item label="发送者">
                                    <span>{{ props.row.from }}</span>
                                </el-form-item>
                                <el-form-item label="接收者">
                                    <span>{{ props.row.to }}</span>
                                </el-form-item>
                                <el-form-item label="Gas消耗">
                                    <span>{{ props.row.gas}}</span>
                                </el-form-item>
                                <el-form-item label="Nonce">
                                    <span>{{ props.row.nonce }}</span>
                                </el-form-item>
                                <el-form-item label="输入">
                                    <span>{{ props.row.input }}</span>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column label='交易Hash'>
                        <template slot-scope="scope">
                            <span class="message-title">{{scope.row.hash}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="from" label='发送者'></el-table-column>
                    <el-table-column prop="to" label='接收者'></el-table-column>
                </el-table>
            </div>
        </div>
    </section>
</template>

<script>
    import draggable from 'vuedraggable'
    export default {
        name: 'draglist',
        data() {
            return {
                all: [],
                cachedTx: null,
                result: [],
                dragOptions:{
                    animation: 120,
                    scroll: true,
                    group: 'sortlist',
                    ghostClass: 'ghost-style'
                },
                subscribed: [
                    {
                        id: 1,
                        content: '开发图表组件'
                    }
                ],
                unsubscribed: [
                    {
                        id: 1,
                        content: '开发登录注册页面'
                    }
                ]
            }
        },
        components:{
            draggable
        },
        methods: {
            removeHandle(event){
                console.log(event);
                this.$message.success(`从 ${event.from.id} 移动到 ${event.to.id} `);
            }
        },
        created() {
            this.$axios.get("/service/system/getRoles")
                .then(res => {
                    this.all = this.all.concat(res.data);
                });
            this.$axios.get("/service/system/getProperties")
                .then(res => {
                    this.all = this.all.concat(res.data);
                });
            this.$axios.get("/service/transaction/subscribe")
                .then(res => {
                    this.cachedTx = res.data;
                });
        },
    }

</script>

<style scoped>
    .drag-box{
        display: flex;
        user-select: none;
    }
    .drag-box-item {
        flex: 1;
        max-width: 330px;
        min-width: 300px;
        background-color: #eff1f5;
        margin-right: 16px;
        border-radius: 6px;
        border: 1px #e1e4e8 solid;
    }
    .item-title{
        padding: 8px 8px 8px 12px;
        font-size: 14px;
        line-height: 1.5;
        color: #24292e;
        font-weight: 600;
    }
    .item-ul{
        padding: 0 8px 8px;
        height: 500px;
        overflow-y: scroll;
    }
    .item-ul::-webkit-scrollbar{
        width: 0;
    }
    .drag-list {
        border: 1px #e1e4e8 solid;
        padding: 10px;
        margin: 5px 0 10px;
        list-style: none;
        background-color: #fff;
        border-radius: 6px;
        cursor: pointer;
        -webkit-transition: border .3s ease-in;
        transition: border .3s ease-in;
    }
    .drag-list:hover {
        border: 1px solid #20a0ff;
    }
    .drag-title {
        font-weight: 400;
        line-height: 25px;
        margin: 10px 0;
        font-size: 22px;
        color: #1f2f3d;
    }
    .ghost-style{
        display: block;
        color: transparent;
        border-style: dashed
    }
</style>
