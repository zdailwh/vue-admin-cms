import Mock from 'mockjs'

const import_ = {
  'id|+1': 1,
  'class': 'app\\blockchain\\admin\\ContentImport',
  'class_name': '内容导入',
  'model_name': '内容导入',
  'create_time': '2019-11-21 22:43:42',
  'update_time': '2019-11-21 22:43:42',
  'status': 0,
  'statusstr': '空闲',
  'path': '/data/video/',
  'total_count': 2,
  'completed': 0
}
const parse = {
  'id|+1': 1,
  'class': 'app\\blockchain\\admin\\ContentParse',
  'class_name': '内容解析',
  'model_name': '内容解析',
  'create_time': '2019-11-22 21:44:00',
  'update_time': '2019-11-22 21:44:12',
  'status': 3,
  'statusstr': '已失败',
  'path': '/api/admin/blockchain/v1/contentparses/29',
  'name': 'c003',
  'content': null,
  'owner': import_,
  'pid': 0,
  'filename': 'c003.json',
  'filepath': '/data/video/',
  'log': '视频文件test-4k.ts不存在',
  'logfile': null
}
const content = {
  'id|+1': 1,
  'class': 'app\\blockchain\\admin\\Content',
  'class_name': '内容',
  'model_name': '内容',
  'create_time': '2019-11-22 21:55:23',
  'update_time': '2019-11-22 21:55:23',
  'status': 0,
  'statusstr': '初始的',
  'path': '/api/admin/blockchain/v1/contents/6',
  'gcid': 'C002',
  'guid': 'bbbc788736c8e424f1a3cc72b86d19a9069ecf6f5dcdf57cbc9d2b91d77c8b78012b7a485bd19b9df7f120839103a46ff75868e43b28c9e378332c6a9e5edf56fc',
  'content_id': '2b7a485bd19b9df7f120839103a46ff75868e43b28c9e378332c6a9e5edf56fc',
  'inherit_id': '',
  'inherit_method': '',
  'inherit_platform': '',
  'action': '',
  'platform_id': '01',
  'title': '潜水-4k',
  'type': 0,
  'director': '',
  'actors': '明星',
  'keywords': '潜水-4k',
  'license_no': '',
  'genre': 0,
  'area': '',
  'duration': 0,
  'year': 0,
  'definition': '/data/video//潜水-4k.ts',
  'program_file': '',
  'post_file': '/data/video//潜水-4k.jpg',
  'log': '',
  'logfile': null
}
const process_ = {
  'id|+1': 1,
  'class': 'app\\blockchain\\admin\\ContentProcess',
  'class_name': '内容处理',
  'model_name': '内容处理',
  'create_time': '2019-11-24 17:56:49',
  'update_time': '2019-11-24 17:57:03',
  'status': 1,
  'statusstr': '处理中',
  'path': '/api/admin/blockchain/v1/contentprocesses/3',
  'name': '',
  'source': content,
  'target': null,
  'method': null,
  'pid': 0,
  'definition': 'HD',
  'filesize': 0,
  'filename': 'C001_hd.mp4',
  'filepath': '/data/video/transcode',
  'log': '',
  'logfile': null
}
const video = {
  'id|+1': 1,
  'class': 'app\\blockchain\\admin\\ContentVideo',
  'class_name': '内容凭证',
  'model_name': '内容视频',
  'create_time': '2019-11-24 23:20:07',
  'update_time': '2019-11-24 23:20:07',
  'status': 1,
  'statusstr': '已提交',
  'path': '/api/admin/blockchain/v1/videos/3',
  'owner': content,
  'gcid': 'C001_Transcode',
  'guid': 'bbbc788736c8e424f1a3cc72b86d19a9069ecf6f5dcdf57cbc9d2b91d77c8b7801c99550832444100fb50838d8cd4447540eae8f90aa3122f10c6d219ad8b0e502',
  'content_id': '97be995520d8064f70d821d64a1bde8ba1e4db2808878d92229fa72a235eb41c',
  'inherit_id': 'c99550832444100fb50838d8cd4447540eae8f90aa3122f10c6d219ad8b0e502',
  'inherit_method': 'Original',
  'inherit_platform': '01',
  'action': 'Broadcast',
  'platform_id': '01',
  'title': 'DOXTV宣传片',
  'type': '02',
  'typestr': '电影',
  'director': '王一',
  'actors': '明星',
  'keywords': 'DOXTV, 宣传片',
  'license_no': '',
  'genre': 0,
  'area': '',
  'duration': 10,
  'year': 2015,
  'definition': 'HD',
  'play_url': '/video/public/C001_HD.mp4',
  'post_url': '/video/public/DOX4K宣传片.jpg',
  'watch_times': 0,
  'watch_duration': 0,
  'transmit_num': 0,
  'agree_num': 0,
  'comment_num': 0,
  'log': '',
  'logfile': null
}
const proof = {
  'id|+1': 1,
  'class': 'app\\blockchain\\cms\\ContentProof',
  'class_name': '内容凭证',
  'model_name': '内容区块链',
  'create_time': '2019-11-28 11:24:51',
  'update_time': '2019-11-28 11:24:52',
  'status': 1,
  'statusstr': '成功',
  'path': '/api/cms/blockchain/v1/proofs/114',
  'content': import_,
  'type': 2,
  'typestr': '文件存证',
  'main_data': 'bc1938366a3c95beedef425ceff104b03fb2f03f7e266cd293c347a2679c41ba',
  'extra_data': '60000008_HD|ftp://1.202.216.52:21/home/gdftp/data/60000008_HD_201911281124.json|471|',
  'reference': '',
  'sendtime': '2019-11-28 11:24:52',
  'tx_id': '0x97d1effd9b33a421c3f1b902699e03a686afcabb3dd343a9a61f6922f3cc9d6a',
  'log': '存证成功'
}
const imports = Mock.mock({
  'items|30': [import_]
})
const parses = Mock.mock({
  'items|30': [parse]
})
const contents = Mock.mock({
  'items|30': [content]
})
const processes = Mock.mock({
  'items|30': [process_]
})
const videos = Mock.mock({
  'items|30': [video]
})
const proofs = Mock.mock({
  'items|30': [proof]
})

export default [
  {
    url: '/contentimports',
    type: 'post',
    response: config => {
      return import_
    }
  },
  {
    url: '/contentimports',
    type: 'get',
    response: config => {
      const { page = 0, per_page = 20 } = config.query
      const items = imports.items

      var mockList = items
      const pageList = mockList.filter((item, index) => index < per_page * (page + 1) && index >= per_page * page)

      return {
        'total': mockList.length,
        'page': page,
        'per_page': per_page,
        'count': pageList.length,
        'where': {
        },
        'path': '/api/admin/ffmpeg/v1/inputs',
        'items': pageList
      }
    }
  },
  {
    url: '/contentparses',
    type: 'get',
    response: config => {
      const { page = 0, per_page = 20 } = config.query
      const items = parses.items

      var mockList = items
      const pageList = mockList.filter((item, index) => index < per_page * (page + 1) && index >= per_page * page)

      return {
        'total': mockList.length,
        'page': page,
        'per_page': per_page,
        'count': pageList.length,
        'where': {
        },
        'path': '/api/admin/ffmpeg/v1/inputs',
        'items': pageList
      }
    }
  },
  {
    url: '/contents',
    type: 'get',
    response: config => {
      const { page = 0, per_page = 20 } = config.query
      const items = contents.items

      var mockList = items
      const pageList = mockList.filter((item, index) => index < per_page * (page + 1) && index >= per_page * page)

      return {
        'total': mockList.length,
        'page': page,
        'per_page': per_page,
        'count': pageList.length,
        'where': {
        },
        'path': '/api/admin/ffmpeg/v1/inputs',
        'items': pageList
      }
    }
  },
  {
    url: '/contents/[0-9]/process',
    type: 'get',
    response: config => {
      const item = content
      return item
    }
  },
  {
    url: '/contents/[0-9]/retry',
    type: 'get',
    response: config => {
      const item = content
      return item
    }
  },
  {
    url: '/contents/[0-9]/ban',
    type: 'get',
    response: config => {
      const item = content
      return item
    }
  },
  {
    url: '/contentprocesses',
    type: 'get',
    response: config => {
      const { page = 0, per_page = 20 } = config.query
      const items = processes.items

      var mockList = items
      const pageList = mockList.filter((item, index) => index < per_page * (page + 1) && index >= per_page * page)

      return {
        'total': mockList.length,
        'page': page,
        'per_page': per_page,
        'count': pageList.length,
        'where': {
        },
        'path': '/api/admin/ffmpeg/v1/inputs',
        'items': pageList
      }
    }
  },
  {
    url: '/recontents',
    type: 'get',
    response: config => {
      const { page = 0, per_page = 20 } = config.query
      const items = videos.items

      var mockList = items
      const pageList = mockList.filter((item, index) => index < per_page * (page + 1) && index >= per_page * page)

      return {
        'total': mockList.length,
        'page': page,
        'per_page': per_page,
        'count': pageList.length,
        'where': {
        },
        'path': '/api/admin/ffmpeg/v1/inputs',
        'items': pageList
      }
    }
  },
  {
    url: '/recontents/[0-9]/publish',
    type: 'get',
    response: config => {
      const item = content
      return item
    }
  },
  {
    url: '/recontents/[0-9]/retry',
    type: 'get',
    response: config => {
      const item = content
      return item
    }
  },
  {
    url: '/videos',
    type: 'get',
    response: config => {
      const { page = 0, per_page = 20 } = config.query
      const items = videos.items

      var mockList = items
      const pageList = mockList.filter((item, index) => index < per_page * (page + 1) && index >= per_page * page)

      return {
        'total': mockList.length,
        'page': page,
        'per_page': per_page,
        'count': pageList.length,
        'where': {
        },
        'path': '/api/admin/ffmpeg/v1/inputs',
        'items': pageList
      }
    }
  },
  {
    url: '/videos/[0-9]/retry',
    type: 'get',
    response: config => {
      const item = video
      return item
    }
  },
  {
    url: '/videos/[0-9]/online',
    type: 'get',
    response: config => {
      const item = video
      return item
    }
  },
  {
    url: '/videos/[0-9]/offline',
    type: 'get',
    response: config => {
      const item = video
      return item
    }
  },
  {
    url: '/proofs',
    type: 'get',
    response: config => {
      const { page = 0, per_page = 20 } = config.query
      const items = proofs.items

      var mockList = items
      const pageList = mockList.filter((item, index) => index < per_page * (page + 1) && index >= per_page * page)

      return {
        'total': mockList.length,
        'page': page,
        'per_page': per_page,
        'count': pageList.length,
        'where': {
        },
        'path': '/api/admin/ffmpeg/v1/inputs',
        'items': pageList
      }
    }
  }
]
