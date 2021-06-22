<template>
  <div class="app-container">
    <!--表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-date-picker
          v-model="searchObj.begin"
          type="date"
          placeholder="选择开始日期"
          value-format="yyyy-MM-dd" />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="searchObj.end"
          type="date"
          placeholder="选择截止日期"
          value-format="yyyy-MM-dd" />
      </el-form-item>
      <el-button
        :disabled="btnDisabled"
        type="primary"
        icon="el-icon-search"
        @click="showChart()">查询</el-button>
    </el-form>

    <el-row>
      <el-col :span="12">
        <div id="register_num" class="chart" style="height:500px;" />
      </el-col>
      <el-col :span="12">
        <div id="login_num" class="chart" style="height:500px;" />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <div id="video_view_num" class="chart" style="height:500px;" />
      </el-col>
      <el-col :span="12">
        <div id="course_num" class="chart" style="height:500px;" />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import echarts from 'echarts'
import statisticsApi from '@/api/statistics'

export default {

  data() {
    var end = new Date()
    return {
      searchObj: {
        begin: end,
        end: end
      },
      btnDisabled: false,
      chartData: {}, // 图表数据
      begin: end,
      end: end
    }
  },
  mounted() {
    // 截止时间
    this.searchObj.end = this.dateFormat('YYYY-mm-dd', this.end)
    // 开始时间
    this.begin.setDate(this.end.getDate() - 7)
    this.searchObj.begin = this.dateFormat('YYYY-mm-dd', this.begin)
    this.showChart()
  },
  methods: {
    dateFormat(fmt, date) {
      let ret
      const opt = {
        'Y+': date.getFullYear().toString(), // 年
        'm+': (date.getMonth() + 1).toString(), // 月
        'd+': date.getDate().toString() // 日
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
      }
      for (const k in opt) {
        ret = new RegExp('(' + k + ')').exec(fmt)
        if (ret) {
          fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')))
        }
      }
      return fmt
    },

    showChart() {
      statisticsApi.showChart(this.searchObj).then(response => {
        this.chartData = response.data.chartData
        this.showChartByType('register_num', '学员登录数统计', this.chartData.registerNum)
        this.showChartByType('login_num', '学员注册数统计', this.chartData.loginNum)
        this.showChartByType('video_view_num', '视频集播放数统计', this.chartData.videoViewNum)
        this.showChartByType('course_num', '每日视频集数统计', this.chartData.courseNum)
      })
    },

    showChartByType(type, title, data) {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById(type))
      // 指定图表的配置项和数据
      var option = {
        title: {
          text: title
        },
        xAxis: {
          data: data.xData
        },
        yAxis: {},
        series: [{
          data: data.yData,
          type: 'line'
        }]
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    }
  }
}
</script>
