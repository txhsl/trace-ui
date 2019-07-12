<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-group"></i> Permission Management</el-breadcrumb-item>
                <el-breadcrumb-item>Permissions</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-select v-model="select_cate" placeholder="Type" class="handle-select mr10">
                    <el-option key="1" label="" value=""></el-option>
                    <el-option key="2" label="Read" value="Read"></el-option>
                    <el-option key="3" label="Write" value="Write"></el-option>
                </el-select>
                <el-select v-model="select_status" placeholder="Status" class="handle-select mr10">
                    <el-option key="1" label="" value=""></el-option>
                    <el-option key="2" label="Available" value="Available"></el-option>
                    <el-option key="3" label="Unavailable" value="Unavailable"></el-option>
                </el-select>
                <el-input v-model="select_word" placeholder="Keyword" class="handle-input mr10"></el-input>
                <el-button type="primary" @click="getData()">Refresh</el-button>
            </div>
            <el-table :data="data" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column prop="name" label="Property Name" sortable width="240">
                </el-table-column>
                <el-table-column prop="permission" label="Type" width="80">
                </el-table-column>
                <el-table-column prop="address" label="Contract Address" :formatter="formatter">
                </el-table-column>
                <el-table-column prop="status" label="Status" width="120">
                </el-table-column>
                <el-table-column label="Options" width="80" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleApply(scope.$index, scope.row)" :disabled="checkDisabled(scope.$index, scope.row)">Apply</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="calculPage()">
                </el-pagination>
            </div>
        </div>

        <!-- 申请提示框 -->
        <el-dialog title="Warning" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">This option will request the property admin for permission.</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">Cancel</el-button>
                <el-button type="primary" @click="applyRow">Comfirm</el-button>
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
                editVisible: false,
                delVisible: false,
                idx: -1,
                select_row: {}
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
                        if (d.permission.indexOf(this.select_cate) > -1 &&
                                d.status.indexOf(this.select_status) > -1 &&
                                (d.name.indexOf(this.select_word) > -1 ||
                                    d.address.indexOf(this.select_word) > -1)
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
            },
            getData() {
                var data = [];
                var owned = [];
                var managed = [];
                this.cur_page = 1;
                this.$axios.get("/service/system/getProperties")
                    .then(res => {
                        return res.data;
                    }).catch(err => {
                        this.$message.error('Error!');
                    }).then(all => {
                        this.$axios.get('/service/user/getOwned')
                            .then(res => {
                                let temp = [];
                                for(var contract in res.data) {
                                    data.push({
                                        name: contract,
                                        permission: 'Write',
                                        address: res.data[contract],
                                        status: 'Available'
                                    });
                                    temp.push(contract);
                                }
                                for(var property in all) {
                                    if (!temp.includes(property)) {
                                        data.push({
                                            name: property,
                                            permission: 'Write',
                                            address: all[property],
                                            status: 'Unavailable'
                                        });
                                    }
                                }
                            }).catch(err => {
                                this.$message.error('Error!');
                            });
                        this.$axios.get('/service/user/getManaged')
                            .then(res => {
                                let temp = [];
                                for(var contract in res.data) {
                                    data.push({
                                        name: contract,
                                        permission: 'Read',
                                        address: res.data[contract],
                                        status: 'Available'
                                    });
                                    temp.push(contract);
                                }
                                for(var property in all) {
                                    if (!temp.includes(property)) {
                                        data.push({
                                            name: property,
                                            permission: 'Read',
                                            address: all[property],
                                            status: 'Unavailable'
                                        });
                                    }
                                }
                            }).catch(err => {
                                this.$message.error('Error!');
                            });

                        this.tableData = data;
                    });
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleApply(index, row) {
                this.idx = index;
                this.select_row = row;
                this.delVisible = true;
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            applyRow(){
                var url = '';
                if (this.select_row.permission==='Read') {
                    url = '/service/user/requestReader';
                }
                else {
                    url = '/service/user/requestWriter';
                }
                this.$axios.post(url, {
                    propertyName: this.select_row.name,
                    target: this.name
                }).then(res => {
                    this.$message.success('Success!');
                }).catch(err => {
                    this.$message.error('Error!');
                })
                
                this.delVisible = false;
            },
            checkDisabled(index, row) {
                return row.status === 'Available';
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
