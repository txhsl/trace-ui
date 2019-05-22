<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-search"></i> 审计仲裁</el-breadcrumb-item>
                <el-breadcrumb-item>历史审计</el-breadcrumb-item>
                <el-breadcrumb-item>数据审计</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="属性名">
                        <el-select v-model="form.name" placeholder="请选择">
                            <el-option v-for="name in names" :value="name" :key="name" name="form.address">
                                {{name}}
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">查询</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="container">
            <el-table :data="result" style="width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="search-table-expand">
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
                                <span class="script">{{ props.row.input }}</span>
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
</template>

<script>
    export default {
        name: 'baseform',
        data: function(){
            return {
                form: {
                    name: ''
                },
                properties:[],
                names:[],
                result: []
            }
        },
        created() {
            this.$axios.get("/service/system/getProperties")
                .then(res => {
                    this.properties = res.data;
                    for(var name in res.data) {
                        this.names.push(name);
                    }
                }).catch(err => {
                    this.$message.error('查询属性索引失败！');
                })
        },
        methods: {
            onSubmit() {
                var url = "/service/transaction/contractHistory/";
                this.$axios.get(url + this.properties[this.form.name]).then(res => {
                    this.$message.success('查询成功！');
                    this.result = res.data;
                }).catch(err => {
                    this.$message.error('查询失败！');
                })
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
.search-table-expand {
    font-size: 0;
}
.search-table-expand label {
    width: 90px;
    color: #99a9bf;
}
.search-table-expand .script {
    display: block;
    word-wrap:break-word;
    width: 800px;
}
.search-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%;
}
</style>