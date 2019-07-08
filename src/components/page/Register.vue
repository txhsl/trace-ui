<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">存证溯源管理系统</div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="username">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')">
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="ruleForm.role" placeholder="请选择生产环节">
                        <el-option v-for="item in roles" :value="item" :key="item" name="ruleForm.role">
                            {{item}}
                        </el-option>
                    </el-select>
                    <el-checkbox v-model="ruleForm.checked" style="margin-left: 50px;"><span style="color: #fff;">同意抵押500Wei</span></el-checkbox>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">申请</el-button>
                </div>
                <p class="login-tips">Tips : 使用以太坊钱包地址和钱包密码注册。<router-link to="login" style="float:right;color: #fff;">已经不是游客</router-link></p>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                ruleForm: {
                    username: '',
                    role: '',
                    password: '',
                    checked: false
                },
                rules: {
                    username: [
                        { required: true, message: '请输入以太坊地址', trigger: 'blur' }
                    ],
                    role: [
                        { required: true, message: '请选择申请的角色组', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入钱包密码', trigger: 'blur' }
                    ],
                    checked: [
                        { required: true, message: '请同意抵押操作', trigger: 'blur' }
                    ]
                },
                roles: []
            }
        },
        created() {
            this.$axios.get('/service/system/getRoleNames')
                .then((res) => {
                   for(var role in res.data) {
                            this.roles.push(res.data[role]);
                        }
                })
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post('/service/system/signUp', {
                            address: this.ruleForm.username,
                            password: this.ruleForm.password,
                            role: this.ruleForm.role
                        }).then(res => {
                            localStorage.setItem('ms_username',this.ruleForm.username);
                            if (res.data.result) {
                                this.$router.push('/');
                                localStorage.setItem('ms_username',this.ruleForm.username);
                            }
                        }).catch(error => {
                            this.$message.error('申请失败');
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
        background-image: url(../../assets/img/login-bg.jpg);
        background-size: 100%;
    }
    .ms-title{
        width:100%;
        line-height: 50px;
        text-align: center;
        font-size:20px;
        color: #fff;
        border-bottom: 1px solid #ddd;
    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:450px;
        margin:-190px 0 0 -225px;
        border-radius: 5px;
        background: rgba(255,255,255, 0.3);
        overflow: hidden;
    }
    .ms-content{
        padding: 30px 30px;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
        margin-bottom: 10px;
    }
    .login-tips{
        font-size:12px;
        line-height:30px;
        color:#fff;
    }
</style>