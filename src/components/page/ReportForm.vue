<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-search"></i> 审计仲裁</el-breadcrumb-item>
                <el-breadcrumb-item>仲裁检举</el-breadcrumb-item>
                <el-breadcrumb-item>检举申请</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="交易ID">
                        <el-input v-model="form.txid"></el-input>
                    </el-form-item>
                    <el-form-item label="检举对象">
                        <el-input v-model="form.target"></el-input>
                    </el-form-item>
                    <el-form-item label="检举金额">
                        <el-input-number v-model="form.amount" :min="1" :max="100"></el-input-number>
                    </el-form-item>
                    <el-form-item label="检举原因">
                        <el-input type="textarea" rows="5" v-model="form.reason"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">提交</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'baseform',
        data: function(){
            return {
                form: {
                    txid: '',
                    target: '',
                    amount: 1,
                    reason: ''
                }
            }
        },
        methods: {
            onSubmit() {
                this.$axios.post("/service/arbitration/report", {
                    from: localStorage.getItem('ms_username'),
                    txid: this.form.txid,
                    target: this.form.target,
                    amount: this.form.amount,
                    reason: this.form.reason
                }).then(res => {
                    if (res.data.result) {
                        this.$message.success('提交成功！');
                    }
                    else {
                        this.$message.error('系统内未找到对应用户或者管理员！');
                    }
                }).catch(err => {
                    this.$message.error('提交失败！');
                })
            }
        }
    }
</script>