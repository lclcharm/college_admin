<template>
  <div class="app-container">
    <!--查询表单-->
    <!-- <el-form :inline="true">
      <el-form-item>
        <el-autocomplete
          v-model="searchObj.queryKey"
          :fetch-suggestions="querySearch"
          :trigger-on-focus="false"
          class="inline-input"
          placeholder="查询关键词"
          value-key="name" />
      </el-form-item>

      <el-form-item>
        <el-select v-model="searchObj.articleType" clearable placeholder="类型">
          <el-option value=" " label=" "/>
          <el-option value="2" label="文章"/>
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
      <el-form-item>
        <el-select v-model="searchObj.orderby" clearable placeholder="排序方式">
          <el-option value="0" label=" "/>
          <el-option value="0" label="日期"/>
          <el-option value="1" label="点击量"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="fetchData()">查询</el-button>
        <el-button type="default" @click="resetData()">清空</el-button>
      </el-form-item>

    </el-form> -->
    <!-- 工具按钮 -->
    <div style="margin-bottom: 10px">
      <el-button type="danger" size="mini" @click="batchRemove()">批量删除</el-button>
    </div>
    <!-- 表格 -->
    <el-table :data="list" border stripe @selection-change="handleSelectionChange" >
      <el-table-column type="selection" />

      <el-table-column width="70" align="center" label="#" >
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="封面" align="center" >
        <template slot-scope="scope">
          <img :src="scope.row.imageUrl" alt="scope.row.imageUrl" width="80%">
        </template>
      </el-table-column>
      <el-table-column prop="title" label="文章标题" width="90" align="center"/>
      <el-table-column prop="summary" label="文章摘要" align="center" width="300"/>
      <el-table-column prop="clickNum" label="点击量" width="100" align="center"/>

      <el-table-column prop="author" label="作者" width="120" align="center"/>
      <el-table-column prop="gmtCreate" label="发布时间" width="180" align="center"/>
      <el-table-column label="操作" width="220" align="center">
        <template slot-scope="scope">
          <router-link :to="'/article/edit/'+scope.row.id">
            <el-button type="primary" size="small" icon="el-icon-edit">修改</el-button>
          </router-link>
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
import articleApi from '@/api/article'
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
      articleApi.getPageList(this.page, this.limit, this.searchObj)
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
        articleApi.removeById(id).then((response) => {
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
        articleApi.batchRemove(this.multipleSelection).then(response => {
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
      articleApi.selectNameListByKey(queryString).then(response => {
        cb(response.data.nameList)
      })
    }
  }
}
</script>
