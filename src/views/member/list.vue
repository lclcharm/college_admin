<template>
  <div class="app-container">

    <!--查询表单-->
    <el-form :inline="true">
      <el-form-item>
        <el-autocomplete
          v-model="searchObj.nickname"
          :fetch-suggestions="querySearch"
          :trigger-on-focus="false"
          class="inline-input"
          placeholder="查询昵称"
          value-key="nickname" />
      </el-form-item>

      <el-form-item>
        <el-select v-model="searchObj.sex" clearable placeholder="性别">
          <el-option value=" " label=" "/>
          <el-option value="1" label="男"/>
          <el-option value="2" label="女"/>
        </el-select>
      </el-form-item>

      <el-form-item label="发布时间">
        <el-date-picker
          v-model="searchObj.joinDateBegin"
          placeholder="开始时间"
          value-format="yyyy-MM-dd" />
      </el-form-item>
      <el-form-item label="-">
        <el-date-picker
          v-model="searchObj.joinDateEnd"
          placeholder="结束时间"
          value-format="yyyy-MM-dd" />
      </el-form-item>
      <!-- <el-form-item>
        <el-select v-model="searchObj.orderby" clearable placeholder="排序方式">
          <el-option value="0" label=" "/>
          <el-option value="0" label="日期"/>
          <el-option value="1" label="点击量"/>
        </el-select>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="fetchData()">查询</el-button>
        <el-button type="default" @click="resetData()">清空</el-button>
      </el-form-item>

    </el-form>
    <!-- 工具按钮 -->
    <div style="margin-bottom: 10px">
      <el-button type="danger" size="mini" @click="batchRemove()">批量删除</el-button>
    </div>
    <!-- /无数据提示 开始-->
    <section v-if="list.length===0" class="no-data-wrap">
      <em class="icon30 no-data-ico">&nbsp;</em>
      <span class="c-666 fsize14 ml10 vam">没有相关数据，小编正在努力整理中...</span>
    </section>
    <!-- /无数据提示 结束-->
    <!-- 表格 -->
    <el-table v-if="list.length > 0" :data="list" border stripe @selection-change="handleSelectionChange" >
      <el-table-column type="selection" />

      <el-table-column align="center" label="#" >
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="nickname" label="昵称" align="center"/>
      <el-table-column prop="mobile" label="手机" align="center" width="150px"/>
      <el-table-column prop="email" label="邮箱" align="center" width="200px"/>

      <el-table-column label="状态" align="center" width="50px">
        <template slot-scope="scope">
          <el-tag v-if="!scope.row.disabled" type="success" size="mini">正常</el-tag>
          <el-tag v-if="scope.row.disabled" type="fail" size="mini">冻结</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="登录方式" align="center" >
        <template slot-scope="scope">
          <el-tag v-if="!(scope.row.openid === null)" type="success" size="mini">微信登录</el-tag>
          <el-tag v-else type="fail" size="mini">注册登录</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="性别" width="100" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.sex === 0" type="success" size="mini">秘密</el-tag>
          <el-tag v-if="scope.row.sex === 1" type="success" size="mini">男</el-tag>
          <el-tag v-if="scope.row.sex === 2" size="mini">女</el-tag>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="sex" label="性别" align="center"/> -->
      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">

          <el-button v-if="!scope.row.disabled" type="primary" size="small" icon="el-icon-delete" @click="disableMemberById(scope.row.id)" >冻结</el-button>

          <el-button v-else-if="scope.row.disabled" type="primary" size="small" icon="el-icon-edit" @click="deDisableMemberById(scope.row.id)" >解冻</el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <el-pagination
      :current-page="page"
      :total="total"
      :page-size="limit"
      :page-sizes="[5, 10, 20, 30, 40, 50, 100]"
      style="padding: 30px 0; text-align: center;"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="changePageSize"
      @current-change="changeCurrentPage"
    />
  </div>
</template>
<script>
import memberApi from '@/api/member'
export default {
  data() {
    return {
      list: null, // 数据列表
      total: 0, // 总记录数

      page: 1, // 页码
      limit: 5, // 每页记录数
      searchObj: {
      }, // 查询条件
      multipleSelection: []// 批量删除选中的记录列表ID
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      // 调用api
      memberApi.getPageList(this.page, this.limit, this.searchObj)
        .then(response => {
          this.list = response.data.rows
          this.total = response.data.total
        })
    },
    // 每页记录数改变，size：回调参数，表示当前选中的“每页条数”
    changePageSize(size) {
      this.limit = size
      this.fetchData()
    },
    // 改变页码，page：回调参数，表示当前选中的“页码”
    changeCurrentPage(page) {
      this.page = page
      this.fetchData()
    },
    // 重置表单
    resetData() {
      this.searchObj = {}
      this.fetchData()
    },
    // 根据id删除数据
    removeById(id) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        memberApi.removeById(id).then((response) => {
          this.fetchData()
          this.$message.success(response.message)
        }).catch(error => {
          console.log('error', error)
        })
      }).catch(error => {
        // 当取消时会进入catch语句:error = 'cancel'
        // 当后端服务抛出异常时：error = 'error'
        if (error === 'cancel') {
          this.$message.info('取消删除 ')
        }
      })
    },
    // 当多选选项发生变化的时候调用
    handleSelectionChange(selection) {
      console.log(selection)
      selection.forEach(item => {
        this.multipleSelection.push(item.id)
      })
    },
    // 批量删除文章
    batchRemove() {
      if (this.multipleSelection.length === 0) {
        this.$message.warning('请选择要删除的记录！')
        return
      }
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        memberApi.batchRemove(this.multipleSelection).then(response => {
          this.fetchData()
          this.$message.success(response.message)
        }).catch(error => {
          console.log('error', error)
        })
      }).catch(error => {
        // 当取消时会进入catch语句:error = 'cancel'
        // 当后端服务抛出异常时：error = 'error'
        if (error === 'cancel') {
          this.$message.info('取消删除 ')
        }
      })
    },
    querySearch(queryString, cb) {
      memberApi.selectNameListByKey(queryString).then(response => {
        cb(response.data.nameList)
      })
    },
    disableMemberById(id) {
      memberApi.disableById(id).then(response => {
        this.fetchData()
        this.$message.success(response.message)
      }).catch(error => {
        console.log('error', error)
      })
    },
    deDisableMemberById(id) {
      memberApi.deDisableById(id).then(response => {
        this.fetchData()
        this.$message.success(response.message)
      }).catch(error => {
        console.log('error', error)
      })
    }
  }
}
</script>

<style>
.no-data-wrap{margin:50px auto;text-align:center}
.no-data-wrap .no-data-ico{width:41px;height:80px}

.icon30{display:inline-block;height:30px;width:30px;vertical-align:middle}
</style>
