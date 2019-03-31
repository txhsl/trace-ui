<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 数据管理</el-breadcrumb-item>
                <el-breadcrumb-item>溯源查询</el-breadcrumb-item>
                <el-breadcrumb-item>单个查询</el-breadcrumb-item>
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
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" label-width="80px">
                    <el-form-item label="查询结果">
                        <el-table :data="result" border class="table" ref="multipleTable">
                            <el-table-column prop="id" label="ID" sortable>
                            </el-table-column>
                            <el-table-column prop="name" label="属性名">
                            </el-table-column>
                            <el-table-column prop="data" label="内容">
                            </el-table-column>
                            <el-table-column prop="status" label="状态">
                            </el-table-column>
                        </el-table>
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
                    name: '',
                    id: '',
                },
                properties:[],
                result: []
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
                    this.result = [{
                        id: res.data.id,
                        name: res.data.propertyName,
                        data: res.data.data,
                        status: res.data.status
                    }];
                }).catch(err => {
                    this.$message.error('查询失败！');
                })
            }
        }
    }
</script>