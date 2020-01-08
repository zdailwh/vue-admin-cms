<template>
  <div class="app-container">
    <el-form ref="formSearch" :inline="true" :model="formSearch" class="demo-form-inline">
      <el-form-item label="内容ID" prop="source_id">
        <el-input v-model="formSearch.source_id" placeholder="内容对象ID" />
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
          <p class="expandP"><strong>内容：</strong><span>{{ scope.row.source }}</span></p>
          <p class="expandP"><strong>target：</strong><span>{{ scope.row.target }}</span></p>
          <p class="expandP"><strong>method：</strong><span>{{ scope.row.method }}</span></p>
          <p class="expandP"><strong>日志文件：</strong><span>{{ scope.row.logfile }}</span></p>
        </template>
      </el-table-column>
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="name">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="pid">
        <template slot-scope="scope">
          {{ scope.row.pid }}
        </template>
      </el-table-column>
      <el-table-column label="definition">
        <template slot-scope="scope">
          {{ scope.row.definition }}
        </template>
      </el-table-column>
      <el-table-column label="文件大小">
        <template slot-scope="scope">
          {{ scope.row.filesize }}
        </template>
      </el-table-column>
      <el-table-column label="文件名称">
        <template slot-scope="scope">
          {{ scope.row.filename }}
        </template>
      </el-table-column>
      <el-table-column label="文件路径">
        <template slot-scope="scope">
          {{ scope.row.filepath }}
        </template>
      </el-table-column>
      <el-table-column label="日志">
        <template slot-scope="scope">
          {{ scope.row.log }}
        </template>
      </el-table-column>
      <el-table-column label="状态" width="90">
        <template slot-scope="scope">
          {{ scope.row.statusstr }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="90">
        <template slot-scope="scope">
          {{ scope.row.create_time }}
        </template>
      </el-table-column>
      <el-table-column label="更新时间" width="90">
        <template slot-scope="scope">
          {{ scope.row.update_time }}
        </template>
      </el-table-column>
      <!-- <el-table-column class-name="status-col" label="操作" align="center" /> -->
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

  </div>
</template>

<script>
import { getContentprocessList } from '@/api/table'

export default {
  data() {
    return {
      list: null,
      listLoading: false,
      listTotal: 0,
      page: 1,
      per_page: 20,
      formSearch: {
        source_id: this.$route.query.contentId || '',
        status: ''
      },
      statusArr: [
        { label: '初始化', value: 0 },
        { label: '处理中', value: 1 },
        { label: '已完成', value: 2 }
      ]
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
      if (this.formSearch.source_id !== '') {
        params.source_id = this.formSearch.source_id
      }
      if (this.formSearch.status !== '') {
        params.status = this.formSearch.status
      }
      this.listLoading = true
      getContentprocessList(params).then(response => {
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
</style>
