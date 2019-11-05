<template>
  <div>
    <div class="content-block">
      <span>Popular repositories</span>
      <el-row row-style="height:140px" :gutter="20">
        <el-col :span="12">
          <div class="grid-content bg-purple-dark">
            <el-card class="box-card">
              Gobuy
            </el-card>
          </div>
        </el-col>
        <el-col :span="12">
          <el-card class="box-card">
            Blog
          </el-card>
        </el-col>
      </el-row>
      <el-row row-style="height:140px" :gutter="20">
        <el-col :span="12">
          <div class="grid-content bg-purple-dark">
            <el-card class="box-card">
              Gobuy
            </el-card>
          </div>
        </el-col>
        <el-col :span="12">
          <el-card class="box-card">
            Blog
          </el-card>
        </el-col>
      </el-row>
      <el-row row-style="height:140px" :gutter="20">
        <el-col :span="12">
          <div class="grid-content bg-purple-dark">
            <el-card class="box-card">
              Gobuy
            </el-card>
          </div>
        </el-col>
        <el-col :span="12">
          <el-card class="box-card">
            Blog
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="content-block">
      <span>132 contributions in the last year</span>
    </div>
    <div class="content-block">
      <span>Contribution activity</span>
      <div class="block activity-content">
        <el-timeline>
          <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              :icon="activity.icon"
              :type="activity.type"
              :color="activity.color"
              :size="activity.size"
              :timestamp="activity.timestamp">
            {{activity.content}}
          </el-timeline-item>
        </el-timeline>
      </div>
      <el-tabs class="activity-year" tab-position="right" style="height: 200px;" @tab-click="activity">
        <el-tab-pane label="用户管理" name="2019" value="2019" key="dfds">用户管理</el-tab-pane>
        <el-tab-pane label="配置管理" name="2018">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理" name="2017">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="2016">定时任务补偿</el-tab-pane>
      </el-tabs>
    </div>
  </div>

</template>

<script>
export default {
  name: 'overview',
  data() {
    return {
      user: {},
      activities: [{
        content: '支持使用图标',
        timestamp: '2018-04-12 20:46',
        size: 'large',
        type: 'primary',
        icon: 'el-icon-more'
      }, {
        content: '支持自定义颜色',
        timestamp: '2018-04-03 20:46',
        color: '#0bbd87'
      }, {
        content: '支持自定义尺寸',
        timestamp: '2018-04-03 20:46',
        size: 'large'
      }, {
        content: '默认样式的节点',
        timestamp: '2018-04-03 20:46'
      }]
    }
  },
  mounted() {
    console.log('ovewview')
    this.user.username = this.$route.params.username
  },
  methods: {
    activity(tab, event) {
      console.log(tab)
    }
  }
}
</script>

<style scoped>
.content-block {
  margin-bottom: 40px;
  text-align: left;
}

.content-block span {

}

/* Popular repositiories */
.el-row {
  margin-bottom: 18px;
}

/* activity */
.activity-content {
  padding: 20px;
  width: 60%;
}

.activity-year {
  float: right;
}
</style>