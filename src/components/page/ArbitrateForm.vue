<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-search"></i> 审计仲裁</el-breadcrumb-item>
                <el-breadcrumb-item>仲裁检举</el-breadcrumb-item>
                <el-breadcrumb-item>仲裁处理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-table :data="tableData" border class="table" ref="multipleTable">
                <el-table-column prop="target" label="检举对象" sortable>
                </el-table-column>
                <el-table-column prop="txid" label="交易ID">
                </el-table-column>
                <el-table-column prop="from" label="检举人">
                </el-table-column>
                <el-table-column prop="amount" label="检举金额">
                </el-table-column>
                <el-table-column prop="reason" label="检举原因">
                </el-table-column>
                <el-table-column label="操作" width="160" align="center">
                    <template slot-scope="scope">
                        <el-button type="success" @click="handleAgree(scope.$index, scope.row)">通过</el-button>
                        <el-button type="danger" @click="handleRefuse(scope.$index, scope.row)">驳回</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'baseform',
        data: function(){
            return {
                tableData: [{
                    target: '0x38a5d4e63bbac1af0eba0d99ef927359ab8d7293',
                    txid: '0x27c1439b9857bafe8aa3b75a71c964889fc0b91242e54333a3dd36729c296b1f',
                    from: '0x6a2fb5e3bf37f0c3d90db4713f7ad4a3b2c24111',
                    amount: 50,
                    reason: '异常的权限授予'
                }]
            }
        },
        mounted(){
            this.$axios.get("/service/system/getPropertyNames")
                .then(res => {
                    this.properties = res.data;
                });
        },
        methods: {
            onAgree() {
                this.$axios.post("/service/data/read", {
                    id: this.form.id,
                    propertyName: this.form.name
                }).then(res => {
                    this.$message.success('查询成功！');
                    this.result = [{
                        id: res.data.id,
                        name: res.data.propertyName,
                        data: res.data.data,
                        status: res.data.status
                    }];
                }).catch(err => {
                    this.$message.error('查询失败！');
                })
            },
            onRefuse() {

            }
        }
    }
</script>