<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-group"></i> Permission Management</el-breadcrumb-item>
                <el-breadcrumb-item>Roles</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="select_word" placeholder="Keyword" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="handleNew()">New</el-button>
            </div>
            <el-table :data="data" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column prop="name" label="Role Name" sortable>
                </el-table-column>
                <el-table-column prop="address" label="Contract Address" :formatter="formatter">
                </el-table-column>
                <el-table-column label="Options" width="120" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleRegister(scope.$index, scope.row)" :disabled="checkDisabled(scope.$index, scope.row)">Add User</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="calculPage()">
                </el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="Apply New" :visible.sync="createVisible" width="30%">
            <el-form ref="form" :model="create" label-width="80px">
                <el-form-item label="Name">
                    <el-input v-model="create.name"></el-input>
                </el-form-item>
                <el-form-item label="Existed Contract" v-if="false">
                    <el-switch v-model="create.useTemplate" disabled="false"></el-switch>
                    <el-tooltip class="item" effect="dark" placement="right">
                        <div slot="content">The contract should satisfy:
                            <br>[{
                            <br>&emsp;&emsp;"constant":false,
                            <br>&emsp;&emsp;"inputs":[{"name":"_name","type":"string"},{"name":"_scAddr","type":"address"}],
                            <br>&emsp;&emsp;"name":"setManaged",
                            <br>&emsp;&emsp;"outputs":[{"name":"","type":"address"}],
                            <br>&emsp;&emsp;"payable":false,"stateMutability":"nonpayable","type":"function"
                            <br>},{
                            <br>&emsp;&emsp;"constant":true,
                            <br>&emsp;&emsp;"inputs":[{"name":"_name","type":"string"}],
                            <br>&emsp;&emsp;"name":"getManaged",
                            <br>&emsp;&emsp;"outputs":[{"name":"","type":"address"}],
                            <br>&emsp;&emsp;"payable":false,"stateMutability":"view","type":"function"
                            <br>},{
                            <br>&emsp;&emsp;"constant":true,
                            <br>&emsp;&emsp;"inputs":[{"name":"_name","type":"string"}],
                            <br>&emsp;&emsp;"name":"getOwned",
                            <br>&emsp;&emsp;"outputs":[{"name":"","type":"address"}],
                            <br>&emsp;&emsp;"payable":false,"stateMutability":"view","type":"function"
                            <br>},{
                            <br>&emsp;&emsp;"constant":false,
                            <br>&emsp;&emsp;"inputs":[{"name":"_name","type":"string"},{"name":"_scAddr","type":"address"}],
                            <br>&emsp;&emsp;"name":"setOwned",
                            <br>&emsp;&emsp;"outputs":[{"name":"","type":"address"}],
                            <br>&emsp;&emsp;"payable":false,"stateMutability":"nonpayable","type":"function"
                            <br>},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]
                        </div>
                        <i class="el-icon-question"></i>
                    </el-tooltip>
                </el-form-item>
                <el-form-item label="Address" v-show="create.useTemplate">
                    <el-input v-model="create.address"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="createVisible = false">Cancel</el-button>
                <el-button type="primary" @click="applyNew">Confirm</el-button>
            </span>

        </el-dialog>

        <el-dialog title="Add User" :visible.sync="registerVisible" width="30%">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="Address">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="registerVisible = false">Cancel</el-button>
                <el-button type="primary" @click="applyRegister">Confirm</el-button>
            </span>

        </el-dialog>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                name: localStorage.getItem('ms_username'),
                tableData: [],
                sortedData: [],
                cur_page: 1,
                row_per_page: 10,
                multipleSelection: [],
                select_cate: '',
                select_status: '',
                select_word: '',
                del_list: [],
                createVisible: false,
                registerVisible: false,
                create: {
                    name: '',
                    useTemplate: false,
                    address: null
                },
                form: {
                    address: '',
                    role: ''
                },
                idx: -1
            }
        },
        created() {
            this.getData();
        },
        computed: {
            data() {
                this.sortedData = this.tableData.filter((d) => {
                    let is_del = false;
                    for (let i = 0; i < this.del_list.length; i++) {
                        if (d.name === this.del_list[i].name) {
                            is_del = true;
                            break;
                        }
                    }
                    if (!is_del) {
                        if (d.name.indexOf(this.select_word) > -1 ||
                                d.address.indexOf(this.select_word) > -1
                        ) {
                            return d;
                        }
                    }
                })

                return this.sortedData.slice(this.row_per_page*(this.cur_page-1), this.row_per_page*this.cur_page);
            }
        },
        methods: {
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            getData() {
                this.$axios.get('/service/system/getRoles')
                .then((res) => {
                    for(let role in res.data) {
                        let rcAddr = res.data[role];
                        this.$axios.post('/service/user/checkAdmin', {
                            name: role,
                            admin: this.name
                        }).then(res => {
                            this.tableData.push({
                                name: role,
                                address: rcAddr,
                                isAdmin: res.data
                            });
                        })
                    }
                })
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleNew() {
                this.createVisible = true;
            },
            handleRegister(index, row) {
                this.idx = index;
                this.registerVisible = true;
                this.form.role = row.name;
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            applyNew(){
                this.$axios.post('/service/system/requestRole', {
                    name: this.create.name,
                    admin: this.name,
                    address: this.create.address
                }).then(res => {
                    this.$message.success('Success!');
                }).catch(err => {
                    this.$message.error('Error!');
                })
                this.createVisible = false;
            },
            applyRegister(){
                this.$axios.post('/service/system/register', {
                    address: this.form.address,
                    role: this.form.role
                }).then(res => {
                    this.$message.success('Success!');
                }).catch(err => {
                    this.$message.error('Error!');
                })
                this.registerVisible = false;
            },
            checkDisabled(index, row){
                return row.isAdmin;
            },
            calculPage() {
                return this.sortedData.length;
            }
        }
    }

</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
    .table{
        width: 100%;
        font-size: 14px;
    }
    .red{
        color: #ff0000;
    }
    .mr10{
        margin-right: 10px;
    }
</style>
