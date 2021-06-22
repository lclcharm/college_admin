<template>

  <div class="app-container">

    <!-- 文章信息表单 -->
    <el-form label-width="120px">

      <el-form-item label="文章标题" style="width:400px">
        <el-input v-model="articleInfo.title" placeholder=" 示例：高数从今天开始"/>
      </el-form-item>
      <el-form-item label="文章摘要" style="width:400px">
        <el-input v-model="articleInfo.summary" placeholder=" 示例：高数学习必须从现在开始"/>
      </el-form-item>

      <!-- 文章类型  -->
      <!-- <el-form-item label="文章类型" >
        <div class="block">
          <el-cascader
            v-model="subjectOjt"
            :options="subjectList"
            :props="{label: 'title', value: 'id'}"
            @change="handleChange"
          />
        </div>
      </el-form-item> -->

      <el-form-item label="文章作者" style="width:300px" >
        <el-input v-model="articleInfo.author" />
      </el-form-item>
      <el-form-item label="文章来源" style="width:200px">
        <el-input v-model="articleInfo.source" />
      </el-form-item>

      <!-- <el-form-item label="点击量">
        <el-input-number :min="0" v-model="articleInfo.clickNum" controls-position="right" placeholder="请填写文章的点赞量"/>
      </el-form-item> -->
      <!-- 文章封面  -->
      <el-form-item label="文章封面">
        <el-upload
          :show-file-list="false"
          :on-success="handleCoverSuccess"
          :before-upload="beforeCoverUpload"
          :on-error="handleCoverError"
          :action="BASE_API+'/admin/oss/file/upload?module=article'"
          class="cover-uploader">
          <img v-if="articleInfo.imageUrl" :src="articleInfo.imageUrl">
          <i v-else class="el-icon-plus avatar-uploader-icon"/>
        </el-upload>
      </el-form-item>
      <!-- 文章内容  -->
      <el-form-item label="文章内容">
        <tinymce :height="300" v-model="articleInfo.content"/>
      </el-form-item>
      <el-form-item label="排序值">
        <el-input-number :min="0" v-model="articleInfo.sort" controls-position="right" placeholder="请填写文章的点赞量"/>

      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate()">保存</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import articleApi from '@/api/article'
import Tinymce from '@/components/Tinymce'
export default {
  components: { Tinymce },
  data() {
    return {
      saveBtnDisabled: false, // 按钮是否禁用
      BASE_API: process.env.BASE_API,
      articleInfo: {// 表单数据
        clickNum: 0
        // 以下解决表单数据不全时insert语句非空校验
        // teacherId: '',
        // subjectId: '',
        // subjectParentId: '',
        // imageUrl: '',
        // description: ''
      }
      // teacherList: [], // 文章作者列表
      // subjectList: [], // 分类列表
      // subjectOjt: [] // 分类选中
    }
  },
  created() {
    // 数据回显
    if (this.$route.params.id) {
      this.fetchDataById(this.$route.params.id)
    }
  },

  methods: {
    // 保存
    saveOrUpdate() {
      // 禁用保存按钮
      this.saveBtnDisabled = true
      if (!this.articleInfo.id) {
        this.saveData()
      } else {
        this.updateData()
      }
      this.saveBtnDisabled = false
    },

    // 修改
    updateData() {
      articleApi.updateArticleById(this.articleInfo).then(response => {
        this.$message({
          type: 'success',
          message: response.message
        })

        this.$router.push({ path: '/article' })
      })
    },
    // 新增文章
    saveData() {
    // debugger
      articleApi.saveArticle(this.articleInfo).then(response => {
        this.$message({
          type: 'success',
          message: response.message
        })
        this.$router.push({ path: '/article' })
      })
    },
    // 根据id查询记录
    fetchDataById(id) {
      articleApi.getArticleById(id).then(response => {
        this.articleInfo = response.data.item
      })
    },

    // 封面上传成功函数
    handleCoverSuccess(res) {
      if (res.success) {
        this.articleInfo.imageUrl = res.data.url

        console.log(this.articleInfo.imageUrl)
        // 重新渲染
        this.$forceUpdate()
      } else {
        this.$message.error('上传失败,请联系网站管理员')
      }
    },
    // 封面上传之前执行的函数
    beforeCoverUpload(file) {
      const isJPGorPNG = (file.type === 'image/jpeg') || (file.type === 'image/png')
      const isLt2M = file.size / 1024 / 1024 < 1

      if (!isJPGorPNG) {
        this.$message.error('上传封面图片只能是 JPG/PNG 格式！')
      }
      if (!isLt2M) {
        this.$message.error('上传封面图片大小不能超过 1MB!')
      }
      return isJPGorPNG && isLt2M
    },
    handleCoverError(res) {
      this.$message.error('上传失败（http失败）')
    }

  }
}
</script>

<style>
.tinymce-container {
  position: relative;
  line-height: normal;
}
.cover-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.cover-uploader .el-upload:hover {
  border-color: #409EFF;
}
.cover-uploader .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 640px;
  height: 357px;
  line-height: 357px;
  text-align: center;
}
.cover-uploader img {
  width: 640px;
  height: 357px;
  display: block;
}
</style>
