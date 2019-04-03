<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 属性管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="handleNew">新建属性</el-button>
            </div>
            <el-table :data="data" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column prop="name" label="属性名" sortable>
                </el-table-column>
                <el-table-column prop="address" label="地址" :formatter="formatter">
                </el-table-column>
                <el-table-column label="操作" width="80" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleAssign(scope.$index, scope.row)">授权</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="calculPage()">
                </el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="新建" :visible.sync="createVisible" width="30%">
            <el-form ref="form" :model="create" label-width="80px">
                <el-form-item label="属性名">
                    <el-input v-model="create.name"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="createVisible = false">取 消</el-button>
                <el-button type="primary" @click="applyNew">确 定</el-button>
            </span>

        </el-dialog>

        <el-dialog title="授权" :visible.sync="assignVisible" width="30%">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="授权角色">
                    <el-select v-model="form.name">
                        <el-option v-for="(address, name) in roles" :value="name" :key="name" name="form.name">
                                {{name}}
                            </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="权限类型">
                    <el-select v-model="form.type">
                        <el-option key="1" label="查询" value="查询"></el-option>
                        <el-option key="2" label="写入" value="写入"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="assignVisible = false">取 消</el-button>
                <el-button type="primary" @click="applyAssign">确 定</el-button>
            </span>

        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'basetable',
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
                assignVisible: false,
                create: {
                    name: ''
                },
                form: {
                    name: '',
                    type: ''
                },
                roles: [],
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
                this.$axios.get('/service/user/getOwned')
                    .then((res) => {
                        for(var contract in res.data) {
                            this.tableData.push({
                                name: contract,
                                address: res.data[contract]
                            });
                        }
                    })

                this.$axios.get('/service/system/getRoles')
                    .then(res => {
                        this.roles = res.data;
                    })
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleNew(index, row) {
                this.idx = index;
                this.createVisible = true;
            },
            handleAssign(index, row) {
                this.idx = index;
                this.assignVisible = true;
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            applyNew(){
                this.$axios.post('/service/user/requestProperty', {
                    propertyName: this.create.name,
                    target: this.name
                }).then(res => {
                    this.$message.success('请求成功');
                }).catch(err => {
                    this.$message.error('请求失败');
                })
                this.createVisible = false;
            },
            applyAssign(){
                var url = '';
                if (this.form.type == '查询') {
                    url = '/service/user/permitReader';
                }
                else {
                    url = '/service/user/permitWriter';
                }
                this.$axios.post(url, {
                    propertyName: this.tableData[this.idx].name,
                    target: this.roles[this.form.name]
                }).then(res => {
                    this.$message.success('授权成功');
                }).catch(err => {
                    this.$message.error('授权失败');
                })

                this.assignVisible = false;
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
