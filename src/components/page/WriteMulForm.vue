<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 数据管理</el-breadcrumb-item>
                <el-breadcrumb-item>存证提交</el-breadcrumb-item>
                <el-breadcrumb-item>批量提交</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-row v-for="(item,index) in form" :key="index">
                    <el-form ref="form" :model="item" label-width="80px">
                        <el-form-item label="属性名">
                            <el-select v-model="item.name" placeholder="请选择">
                                <el-option v-for="property in properties" :value="property" :key="property" name="form.name">
                                    {{property}}
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="数据ID">
                            <el-input v-model="item.id"></el-input>
                        </el-form-item>
                        <el-form-item label="存证内容">
                        <el-input type="textarea" rows="5" v-model="item.desc"></el-input>
                    </el-form-item>
                    </el-form>
                    <br>
                </el-row>
                <el-form label-width="80px">
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
                form: [{
                    name: '',
                    id: '',
                    desc: '',
                }],
                properties:[]
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
                this.$axios.post("/service/data/writeMultiple", {
                    //id: this.form.id,
                    //propertyName: this.form.name,
                    //data: this.form.desc
                }).then(res => {
                    this.$message.success('提交成功！文件编号' + res.data);
                }).catch(err => {
                    this.$message.error('提交失败！');
                })
            }
        }
    }
</script>