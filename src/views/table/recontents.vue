<template>
  <div class="app-container">
    <el-form ref="formSearch" :inline="true" :model="formSearch" class="demo-form-inline">
      <el-form-item label="ID" prop="id">
        <el-input v-model="formSearch.id" placeholder="ID" />
      </el-form-item>
      <el-form-item label="content_id" prop="content_id">
        <el-input v-model="formSearch.content_id" placeholder="content_id" />
      </el-form-item>
      <el-form-item label="guid" prop="guid">
        <el-input v-model="formSearch.guid" placeholder="guid" />
      </el-form-item>
      <el-form-item label="title" prop="title">
        <el-input v-model="formSearch.title" placeholder="title" />
      </el-form-item>
      <el-form-item label="导入状态" prop="status">
        <el-select v-model="formSearch.status" placeholder="状态">
          <el-option v-for="(item, k) in statusArr" :key="k" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="fetchData">查询</el-button>
        <el-button @click="resetForm('formSearch')">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      fit
      highlight-current-row
      size="small"
    >
      <el-table-column type="expand">
        <template slot-scope="scope">
          <p class="expandP"><strong>gcid：</strong><span>{{ scope.row.gcid }}</span></p>
          <p class="expandP"><strong>guid：</strong><span>{{ scope.row.guid }}</span></p>
          <p class="expandP"><strong>content_id：</strong><span>{{ scope.row.content_id }}</span></p>
          <p class="expandP"><strong>inherit_id：</strong><span>{{ scope.row.inherit_id }}</span></p>
          <p class="expandP"><strong>inherit_method：</strong><span>{{ scope.row.inherit_method }}</span></p>
          <p class="expandP"><strong>inherit_platform：</strong><span>{{ scope.row.inherit_platform }}</span></p>
          <p class="expandP"><strong>日志文件：</strong><span>{{ scope.row.logfile }}</span></p>
        </template>
      </el-table-column>
      <el-table-column align="center" label="ID" width="60">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="action">
        <template slot-scope="scope">
          {{ scope.row.action }}
        </template>
      </el-table-column>
      <el-table-column label="平台ID">
        <template slot-scope="scope">
          {{ scope.row.platform_id }}
        </template>
      </el-table-column>
      <el-table-column label="节目信息" width="150px">
        <template slot-scope="scope">
          <p class="tdP"><strong>名称：</strong>{{ scope.row.title }}</p>
          <p class="tdP"><strong>类型：</strong>{{ scope.row.typestr }}</p>
          <p class="tdP"><strong>导演：</strong>{{ scope.row.director }}</p>
          <p class="tdP"><strong>演员：</strong>{{ scope.row.actors }}</p>
          <p class="tdP"><strong>关键词：</strong>{{ scope.row.keywords }}</p>
          <p class="tdP"><strong>地区：</strong>{{ scope.row.area }}</p>
          <p class="tdP"><strong>时长：</strong>{{ scope.row.duration }}</p>
          <p class="tdP"><strong>年份：</strong>{{ scope.row.year }}</p>
        </template>
      </el-table-column>
      <el-table-column label="许可证号">
        <template slot-scope="scope">
          {{ scope.row.license_no }}
        </template>
      </el-table-column>
      <el-table-column label="genre">
        <template slot-scope="scope">
          {{ scope.row.genre }}
        </template>
      </el-table-column>
      <el-table-column label="definition">
        <template slot-scope="scope">
          {{ scope.row.definition }}
        </template>
      </el-table-column>
      <el-table-column label="节目文件">
        <template slot-scope="scope">
          {{ scope.row.program_file }}
        </template>
      </el-table-column>
      <el-table-column label="海报">
        <template slot-scope="scope">
          <p>{{ scope.row.post_file }}</p>
          <img v-show="scope.row.post_url" :src="scope.row.post_url" style="width: 50px;height: auto;cursor: pointer;" @click="currImageView = scope.row.post_url">
        </template>
      </el-table-column>
      <el-table-column label="日志">
        <template slot-scope="scope">
          {{ scope.row.log }}
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          {{ scope.row.statusstr }}
        </template>
      </el-table-column>
      <el-table-column label="时间" width="100px">
        <template slot-scope="scope">
          <p class="tdP">创建时间：</p><p class="tdP">{{ scope.row.create_time }}</p>
          <p class="tdP">更新时间：</p><p class="tdP">{{ scope.row.update_time }}</p>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="操作" width="130" align="center">
        <template slot-scope="scope">
          <div class="handler-wrap">
            <el-button size="mini" @click="doPublish(scope.$index, scope.row)">发布</el-button>
            <br>
            <router-link :to="{ path: '/proofs/list', query: { contentId: scope.row.id, contentClass: scope.row.class }}"><el-button size="mini">查看存证</el-button></router-link>
            <br>
            <el-button v-if="scope.row.status === 3" size="mini" @click="doRetry(scope.$index, scope.row)">重试存证</el-button>
            <br>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="pageContainer">
      <el-pagination
        :total="listTotal"
        layout="total, prev, pager, next"
        :current-page.sync="page"
        background
        :page-size="per_page"
        @size-change="fetchData"
        @current-change="fetchData"
      />
    </div>

    <ImageView :imgurl="currImageView" />

  </div>
</template>

<script>
import { getRecontentList, recontentPublish, recontentRetry } from '@/api/table'
import ImageView from './ImageView'

export default {
  components: { ImageView },
  data() {
    return {
      list: null,
      listLoading: false,
      listTotal: 0,
      page: 1,
      per_page: 20,
      formSearch: {
        id: '',
        status: '',
        content_id: '',
        guid: '',
        title: ''
      },
      statusArr: [
        { label: '初始的', value: 0 },
        { label: '已提交', value: 1 },
        { label: '已存链', value: 2 },
        { label: '存链失败', value: 3 },
        { label: '已下架', value: 98 }
      ],
      currImageView: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      if (this.listLoading) return
      var params = {
        page: this.page - 1,
        per_page: this.per_page
      }
      if (this.formSearch.id !== '') {
        params.id = this.formSearch.id
      }
      if (this.formSearch.status !== '') {
        params.status = this.formSearch.status
      }
      if (this.formSearch.content_id !== '') {
        params.content_id = this.formSearch.content_id
      }
      if (this.formSearch.guid !== '') {
        params.guid = this.formSearch.guid
      }
      if (this.formSearch.title !== '') {
        params.title = this.formSearch.title
      }
      this.listLoading = true
      getRecontentList(params).then(response => {
        this.list = response.data.items || []
        this.listTotal = response.data.total || 0
        this.listLoading = false
      }).catch(error => {
        console.log(error)
        this.listLoading = false
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    doPublish(index, row) {
      if (this.listLoading) return
      var params = {
        id: row.id
      }
      this.listLoading = true
      recontentPublish(params).then(response => {
        console.log(response)
        this.$message({
          type: 'success',
          message: '发布成功!'
        })
        this.$router.push('/videos/list')
        this.listLoading = false
      }).catch(error => {
        console.log(error)
        this.listLoading = false
      })
    },
    doRetry(index, row) {
      if (this.listLoading) return
      var params = {
        id: row.id
      }
      this.listLoading = true
      recontentRetry(params).then(response => {
        this.list[index] = response.data
        this.listLoading = false
      }).catch(error => {
        console.log(error)
        this.listLoading = false
      })
    }
  }
}
</script>
<style scoped>
.pageContainer {
  margin: 15px 0;
}
.demo-form-inline {
  padding: 20px 15px 0;
  background-color: #f2f2f2;
}
.expandP strong {
  display: inline-block;
  width: 110px;
  text-align: right;
}
.tdP {
  margin: 0;
}
.tdP strong {
  display: inline-block;
  width: 50px;
  text-align: right;
}
.handler-wrap .el-button {
  margin-bottom: 5px;
}
</style>
