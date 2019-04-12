<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-search"></i> 条件查询</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="查询对象">
                        <el-select v-model="form.type" placeholder="请选择">
                            <el-option key="1" label="用户" value="用户"></el-option>
                            <el-option key="2" label="合约" value="合约"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="账户地址">
                        <el-input v-model="form.address"></el-input>
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
</template>

<script>
    export default {
        name: 'baseform',
        data: function(){
            return {
                form: {
                    type: '',
                    address: '',
                },
                properties:[],
                result: []
            }
        },
        methods: {
            onSubmit() {
                var url = this.form.type === "用户" ? "/service/transaction/userHistory/" : "/service/transaction/contractHistory/";
                this.$axios.get(url + this.form.address).then(res => {
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