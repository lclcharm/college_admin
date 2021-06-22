import request from '@/utils/request'

export default {

  saveArticle(articleInfo) {
    return request({
      url: '/admin/edu/article/save-article-info',
      method: 'put',
      data: articleInfo
    })
  },

  getArticleById(id) {
    return request({
      url: `/admin/edu/article/article-info/${id}`,
      method: 'get'
    })
  },

  updateArticleById(articleInfo) {
    return request({
      url: '/admin/edu/article/update-article-info',
      method: 'put',
      data: articleInfo
    })
  },
  getPageList(page, limit, searchObj) {
    return request({
      url: `/admin/edu/article/list/${page}/${limit}`,
      method: 'get',
      params: searchObj
    })
  },

  removeById(id) {
    return request({
      url: `/admin/edu/article/remove/${id}`,
      method: 'delete'
    })
  },

  batchRemove(idList) {
    return request({
      url: `/admin/edu/article/batch-remove`,
      method: 'delete',
      data: idList
    })
  }
}
