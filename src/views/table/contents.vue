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
      <el-form-item label="状态" prop="status">
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
            <!-- <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            <br>
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <br> -->
            <el-button size="mini" @click="doProcess(scope.$index, scope.row)">转码</el-button>
            <br>
            <el-button size="mini" @click="doBan(scope.$index, scope.row)">强制下线</el-button>
            <br>
            <router-link :to="{ path: '/proofs/list', query: { contentId: scope.row.id, contentClass: scope.row.class }}"><el-button size="mini">查看存证</el-button></router-link>
            <br>
            <el-button v-if="scope.row.status === 3" size="mini" @click="doRetry(scope.$index, scope.row)">重试存证</el-button>
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

    <el-dialog
      title="编辑"
      :visible.sync="editVisible"
      width="30%"
    >
      <el-form ref="formEdit" :model="formEdit" label-width="80px">
        <el-form-item label="节目名称">
          <el-input v-model="formEdit.name" />
        </el-form-item>
        <el-form-item label="节目类型">
          <el-input v-model="formEdit.type" />
        </el-form-item>
        <el-form-item label="节目时长">
          <el-input v-model="formEdit.totaltime" />
        </el-form-item>
        <el-form-item label="出品时间">
          <el-input v-model="formEdit.chupin_time" />
        </el-form-item>
        <el-form-item label="导演">
          <el-input v-model="formEdit.director" />
        </el-form-item>
        <el-form-item label="演员">
          <el-input v-model="formEdit.actor" />
        </el-form-item>
        <el-form-item label="内容简介">
          <el-input v-model="formEdit.intro" type="textarea" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="doEdit()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="转码"
      :visible.sync="processVisible"
      width="30%"
    >
      <el-form ref="formProcess" :model="formProcess" :rules="rules" label-width="80px">
        <el-form-item label="分辨率" prop="definition">
          <el-radio v-for="(r, i) in definitions" :key="i" v-model="formProcess.definition" :label="r">{{ r }}</el-radio>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="processVisible = false">取 消</el-button>
        <el-button type="primary" @click="doProcess()">转 码</el-button>
      </span>
    </el-dialog>

    <ImageView :imgurl="currImageView" />

  </div>
</template>

<script>
import { getContentList, contentProcess, contentRetry, contentBan } from '@/api/table'
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
      editVisible: false,
      processVisible: false,
      formEdit: {
        name: '',
        type: '',
        totaltime: '',
        chupin_time: '',
        director: '',
        actor: '',
        intro: ''
      },
      formProcess: {
        method: 'transcode',
        definition: 'HD'
      },
      definitions: ['SD', 'HD', 'BD'],
      currDialogItem: {},
      rules: {
        definition: [
          { required: true, message: '请选择转码分辨率', trigger: 'change' }
        ]
      },
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
      getContentList(params).then(response => {
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
    handleEdit(index, row) {
      this.editVisible = true
      this.formEdit = row
      console.log(row)
    },
    doEdit() {
      this.editVisible = false
    },
    handleProcess(index, row) {
      this.currDialogItem = row
      this.processVisible = true
    },
    doProcess(index, row) {
      if (this.listLoading) return
      var params = {
        id: row.id,
        method: this.formProcess.method,
        definition: this.formProcess.definition
      }
      this.listLoading = true
      contentProcess(params).then(response => {
        this.$router.push('/contentprocesses/list')
        this.listLoading = false
        this.processVisible = false
      }).catch(error => {
        console.log(error)
        this.listLoading = false
      })
    },
    handleDelete(index, row) {
      console.log(row)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除'
        // })
      })
    },
    doRetry(index, row) {
      if (this.listLoading) return
      var params = {
        id: row.id
      }
      this.listLoading = true
      contentRetry(params).then(response => {
        this.list[index] = response.data
        this.listLoading = false
      }).catch(error => {
        console.log(error)
        this.listLoading = false
      })
    },
    doBan(index, row) {
      if (this.listLoading) return
      var params = {
        id: row.id
      }
      this.$confirm('确定要将此内容下线吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        contentBan(params).then(response => {
          this.list[index] = response.data
          this.listLoading = false
        }).catch(error => {
          console.log(error)
          this.listLoading = false
        })
      }).catch(() => {
      })
    }
  }
}
</script>
<style>
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
