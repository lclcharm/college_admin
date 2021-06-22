<template>

  <div class="app-container">

    <!-- 消息信息表单 -->
    <el-form label-width="120px">

      <el-form-item label="消息标题" style="width:400px">
        <el-input v-model="messageInfo.title" placeholder=" 示例：高数从今天开始"/>
      </el-form-item>
      <el-form-item label="消息内容">
        <!-- <tinymce :height="300" v-model="messageInfo.content"/> -->

        <el-input v-model="messageInfo.content" :rows="10" type="textarea"/>

      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate()">保存</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import messageApi from '@/api/message'
import Tinymce from '@/components/Tinymce'
export default {
  components: { Tinymce },
  data() {
    return {
      saveBtnDisabled: false, // 按钮是否禁用
      BASE_API: process.env.BASE_API,
      messageInfo: {// 表单数据
      }

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
      if (!this.messageInfo.id) {
        this.saveData()
      } else {
        this.updateData()
      }
      this.saveBtnDisabled = false
      this.$router.push({ path: '/message' })
    },

    // 修改
    updateData() {
      messageApi.updateMessageById(this.messageInfo).then(response => {
        this.$message({
          type: 'success',
          message: response.message
        })

        this.$router.push({ path: '/message' })
      })
    },
    // 新增消息
    saveData() {
    // debugger
      messageApi.saveMessage(this.messageInfo).then(response => {
        this.$message({
          type: 'success',
          message: response.message
        })
        this.$router.push({ path: '/message' })
      })
    },
    // 根据id查询记录
    fetchDataById(id) {
      messageApi.getMessageById(id).then(response => {
        this.messageInfo = response.data.item
      })
    },

    // 封面上传成功函数
    handleCoverSuccess(res) {
      if (res.success) {
        this.messageInfo.imageUrl = res.data.url

        console.log(this.messageInfo.imageUrl)
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
