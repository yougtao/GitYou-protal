<template>
  <div>
    <div class="content-description"></div>
    <div class="content-button">
      <el-dropdown class="brand-btn">
        <el-button size="small">
          Branch: {{ repository.curBrand }}<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="brand in brands" :key="brand">{{brand}}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-popover class="clone-btn" placement="bottom" title="克隆仓库" width="400" trigger="click">
        <div>
          <el-input readonly v-model="repository.clone" size="small" style="margin: 10px 0 20px">
            <el-select @change="switchClone" v-model="clone" slot="prepend" style="width:110px;">
              <el-option label="Use HTTP" value="HTTP"></el-option>
              <el-option label="Use SSH" value="SSH"></el-option>
            </el-select>
          </el-input>
        </div>
        <el-button slot="reference" type="success" size="small">Clone<i class="el-icon-arrow-down el-icon--right"></i></el-button>
      </el-popover>
    </div>
    <div class="content-title">
      <img/>
      <a href="javascript:void(0)">{{ repository.user }}</a>
      <span class="commit-content">{{repository.lastCommit.content}}</span>
      <span class="commit-id">{{repository.lastCommit.id}}</span>
      <span class="commit-time">{{repository.lastCommit.time}}</span>
    </div>
    <div class="content-code">
      <el-table :data="files" :show-header="false" style="width: 100%" size="small" fit="false">
        <el-table-column prop="name" width="200">
          <template slot-scope="scope">
            <i class="el-icon-document"></i>
            <a href="javascript:void(0)">{{ scope.row.name }}</a>
          </template>
        </el-table-column>
        <el-table-column prop="commit" width="600">
        </el-table-column>
        <el-table-column prop="time" align="right">
        </el-table-column>
      </el-table>
    </div>
    <div class="content-file"></div>
  </div>
</template>

<script>
export default {
  name: 'code',
  data() {
    return {
      clone: 'HTTP',
      repository: {
        user: '',
        name: '',
        lastCommit: {
          id: 'a43ccb8',
          content: 'style(search服务): 修改了specification的格式',
          time: '4 days ago'
        },
        curBrand: 'master',
        cloneHTTP: 'https://github.com/yougtao/GitYou.git',
        cloneSSH: 'git@github.com:yougtao/GitYou.git',
        clone: 'https://github.com/yougtao/GitYou.git'
      },
      brands: [],
      tags: [],
      files: [{name: 'README.md', commit: 'init', time: '6个月前'}, {name: 'README.md', commit: 'init', time: '6个月前'}]
    }
  },
  mounted() {
    this.repository.user = this.$route.params.username
    this.repository.name = this.$route.params.repository

    // 获取仓库基本信息
    const data = {
      name: this.repository.name
    }
    this.$http.get('/repo/repository/name', {params: data}).then(res => {
      console.log(res.data)
    }).catch()
  },
  methods: {
    switchClone() {
      if (this.clone === 'HTTP') this.repository.clone = this.repository.cloneHTTP
      else if (this.clone === 'SSH') this.repository.clone = this.repository.cloneSSH
    }
  }
}
</script>

<style scoped>
a {
  text-decoration-line: none;
  color: #0366d6;
}

button {
  padding: 6px 12px;
  font-size: 14px;
  font-weight: 500;
}

.content-button {
  margin: 10px 0;
}

.brand-btn {
}

.clone-btn {
  margin-left: 700px;
}

.content-title {
  margin-top: 20px;
  border: 1px solid #c8e1ff;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  padding: 8px;
  background-color: #f1f8ff;
  text-align: left;
}

.content-title span {
  margin: 0 5px;
}

.commit-content {
  font-size: 13px;
}

.commit-id, .commit-time {
  float: right;
  font-size: 13px;
  font-weight: 400;
}

/* content-coed */
.content-code {
  border: 1px solid #dfe2e5;
  border-top: none;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
}


</style>
