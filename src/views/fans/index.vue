<template>
  <div>
    <el-card>
      <div slot="header">
        <my-bread>粉丝管理</my-bread>
      </div>
      <!-- tabs标签页 -->
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="粉丝列表" name="list">
          <div class="fansList">
            <div class="fansItem" v-for="item in fansList" :key="item.id.toString()">
              <el-avatar :size="80" :src="item.photo"></el-avatar>
              <p>{{item.name}}</p>
              <el-button type="primary" plain size="small">+关注</el-button>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="粉丝画像" name="photo">
            <div ref="tubiao" style="width: 600px;height:400px;"></div>
        </el-tab-pane>
      </el-tabs>
      <!-- 分页 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="pager"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import circleUrl from '../../assets/avatar.jpg'
import echarts from 'echarts'
export default {
  data () {
    return {
      activeName: 'list',
      fansList: [],
      // 默认的图片
      circleUrl,
      reqParams: {
        page: 1,
        per_page: 21
      },
      // 页面总数量
      total: 0
    }
  },
  created () {
    this.getFans()
  },
  methods: {
    async getFans () {
      const {
        data: { data }
      } = await this.$http.get('followers', { params: this.reqParams })
      this.fansList = data.results
      this.total = data.total_count
    },
    pager (newPager) {
      this.reqParams.page = newPager
      this.getFans()
    }
  },
  mounted () {
    const dom = this.$refs.tubiao
    const Echarts = echarts.init(dom)
    var dataAxis = ['点', '击', '柱', '子', '或', '者', '两', '指', '在', '触', '屏', '上', '滑', '动', '能', '够', '自', '动', '缩', '放']
    var data = [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220]
    var yMax = 500
    var dataShadow = []

    for (var i = 0; i < data.length; i++) {
      dataShadow.push(yMax)
    }

    const option = {
      xAxis: {
        data: dataAxis,
        axisLabel: {
          inside: true,
          textStyle: {
            color: '#fff'
          }
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        z: 10
      },
      yAxis: {
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          textStyle: {
            color: '#999'
          }
        }
      },
      dataZoom: [
        {
          type: 'inside'
        }
      ],
      series: [
        { // For shadow
          type: 'bar',
          itemStyle: {
            normal: { color: 'rgba(0,0,0,0.05)' }
          },
          barGap: '-100%',
          barCategoryGap: '40%',
          data: dataShadow,
          animation: false
        },
        {
          type: 'bar',
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  { offset: 0, color: '#83bff6' },
                  { offset: 0.5, color: '#188df0' },
                  { offset: 1, color: '#188df0' }
                ]
              )
            },
            emphasis: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  { offset: 0, color: '#2378f7' },
                  { offset: 0.7, color: '#2378f7' },
                  { offset: 1, color: '#83bff6' }
                ]
              )
            }
          },
          data: data
        }
      ]
    }
    Echarts.setOption(option)
  }
}
</script>

<style lang="less" scoped>
.fansItem {
  width: 150px;
  height: 190px;
  text-align: center;
  border: 1px dashed #ddd;
  display: inline-block;
  padding-top: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
}
</style>
