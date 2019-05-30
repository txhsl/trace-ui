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
                tableData: []
            }
        },
        mounted(){
            this.$axios.get("/service/arbitration/receive")
                .then(res => {
                    var results = [];
                    let count = 0;
                    res.data.forEach(report => {
                        results.push({
                            target: report.target,
                            txid: report.txid,
                            from: report.from,
                            amount: report.amount,
                            reason: report.reason,
                            index: count++
                        });
                    })
                    this.tableData = results;
                });
        },
        methods: {
            handleAgree(index, row) {
                this.$axios.put("/service/arbitration/agree/"+row.index)
                    .then(res => {
                        this.$message.success('处理成功！');
                    }).catch(err => {
                        this.$message.error('处理失败！');
                    })
            },
            handleRefuse(index, row) {
                this.$axios.put("/service/arbitration/disagree/"+row.index)
                    .then(res => {
                        this.$message.success('处理成功！');
                    }).catch(err => {
                        this.$message.error('处理失败！');
                    })
            }
        }
    }
</script>