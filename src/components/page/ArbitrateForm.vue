<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-search"></i> Report Management</el-breadcrumb-item>
                <el-breadcrumb-item>Report</el-breadcrumb-item>
                <el-breadcrumb-item>Handle</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-table :data="tableData" border class="table" ref="multipleTable">
                <el-table-column prop="target" label="Target User" sortable>
                </el-table-column>
                <el-table-column prop="txid" label="Transaction ID">
                </el-table-column>
                <el-table-column prop="from" label="From">
                </el-table-column>
                <el-table-column prop="amount" label="Amount">
                </el-table-column>
                <el-table-column prop="reason" label="Reason">
                </el-table-column>
                <el-table-column label="Options" width="200" align="center">
                    <template slot-scope="scope">
                        <el-button type="success" @click="handleAgree(scope.$index, scope.row)">Agree</el-button>
                        <el-button type="danger" @click="handleRefuse(scope.$index, scope.row)">Disagree</el-button>
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
                        this.$message.success('Success!');
                    }).catch(err => {
                        this.$message.error('Error!');
                    })
            },
            handleRefuse(index, row) {
                this.$axios.put("/service/arbitration/disagree/"+row.index)
                    .then(res => {
                        this.$message.success('Success!');
                    }).catch(err => {
                        this.$message.error('Error!');
                    })
            }
        }
    }
</script>