<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 数据管理</el-breadcrumb-item>
                <el-breadcrumb-item>溯源查询</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="属性名">
                        <el-select v-model="form.name" placeholder="请选择">
                            <el-option v-for="item in properties" :value="item" :key="item" name="form.name">
                                {{item}}
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="数据ID">
                        <el-input v-model="form.id"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">查询</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="form-box">{{result}}</div>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'baseform',
        data: function(){
            return {
                form: {
                    name: '',
                    id: '',
                },
                properties:[],
                result: {
                    data: '',
                    status: ''
                }
            }
        },
        mounted(){
            this.$axios.get("/service/system/getPropertyNames")
                .then(res => {
                    this.properties = res.data;
                });
        },
        methods: {
            onSubmit() {
                this.$axios.post("/service/data/read", {
                    id: this.form.id,
                    propertyName: this.form.name
                }).then(res => {
                    this.$message.success('查询成功！');
                    this.result.data = res.data.data;
                    this.result.status = res.data.status;
                }).catch(err => {
                    this.$message.error('查询失败！');
                })
            }
        }
    }
</script>