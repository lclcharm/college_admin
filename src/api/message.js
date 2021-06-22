import request from '@/utils/request'

export default {

  saveMessage(messageInfo) {
    return request({
      url: '/admin/edu/message/save-message-info',
      method: 'put',
      data: messageInfo
    })
  },

  getMessageById(id) {
    return request({
      url: `/admin/edu/message/message-info/${id}`,
      method: 'get'
    })
  },

  updateMessageById(messageInfo) {
    return request({
      url: '/admin/edu/message/update-message-info',
      method: 'put',
      data: messageInfo
    })
  },
  getPageList(page, limit, searchObj) {
    return request({
      url: `/admin/edu/message/list/${page}/${limit}`,
      method: 'get',
      params: searchObj
    })
  },

  removeById(id) {
    return request({
      url: `/admin/edu/message/remove/${id}`,
      method: 'delete'
    })
  },
  batchRemove(idList) {
    return request({
      url: `/admin/edu/message/batch-remove`,
      method: 'delete',
      data: idList
    })
  }
}
