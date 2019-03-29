<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 角色管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="handleNew">新建角色</el-button>
                <el-button type="primary" icon="search" @click="handleRegister">添加用户</el-button>
            </div>
            <el-table :data="data" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column prop="block" label="所在区块" sortable width="180">
                </el-table-column>
                <el-table-column prop="blockHash" label="区块哈希" width="300">
                </el-table-column>
                <el-table-column prop="name" label="角色名" width="160">
                </el-table-column>
                <el-table-column prop="address" label="地址" :formatter="formatter">
                </el-table-column>
                <el-table-column prop="txHash" label="交易哈希">
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
                </el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="新建" :visible.sync="createVisible" width="30%">
            <el-form ref="form" :model="create" label-width="80px">
                <el-form-item label="角色名">
                    <el-input v-model="create.name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="createVisible = false">取 消</el-button>
                <el-button type="primary" @click="applyNew">确 定</el-button>
            </span>

        </el-dialog>

        <!-- 编辑弹出框 -->
        <el-dialog title="注册" :visible.sync="registerVisible" width="30%">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item label="角色">
                    <el-input v-model="form.role"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="registerVisible = false">取 消</el-button>
                <el-button type="primary" @click="applyRegister">确 定</el-button>
            </span>

        </el-dialog>

    </div>
</template>

<script>
    export default {
        name: 'basetable',
        data() {
            return {
                url: './roleTable.json',
                tableData: [],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_status: '',
                select_word: '',
                del_list: [],
                createVisible: false,
                registerVisible: false,
                create: {
                    name: ''
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
                return this.tableData.filter((d) => {
                    let is_del = false;
                    for (let i = 0; i < this.del_list.length; i++) {
                        if (d.name === this.del_list[i].name) {
                            is_del = true;
                            break;
                        }
                    }
                    if (!is_del) {
                        if (d.name.indexOf(this.select_word) > -1 ||
                                d.address.indexOf(this.select_word) > -1 ||
                                d.block.indexOf(this.select_word) > -1  ||
                                d.blockHash.indexOf(this.select_word) > -1 ||
                                d.txHash.indexOf(this.select_word) > -1
                        ) {
                            return d;
                        }
                    }
                })
            }
        },
        methods: {
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            getData() {
                this.$axios.get(this.url, {
                    page: this.cur_page
                }).then((res) => {
                    this.tableData = res.data.list;
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
            handleRegister(index, row) {
                this.idx = index;
                this.registerVisible = true;
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            applyNew(){
                this.$message.success('创建成功');
                this.createVisible = false;
            },
            applyRegister(){
                this.$message.success('添加成功');
                this.registerVisible = false;
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
