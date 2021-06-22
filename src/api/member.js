import request from '@/utils/request'

export default {

  saveMember(memberInfo) {
    return request({
      url: '/admin/ucenter/member/save-member-info',
      method: 'put',
      data: memberInfo
    })
  },

  getMemberById(id) {
    return request({
      url: `/admin/ucenter/member/get/${id}`,
      method: 'get'
    })
  },

  updateMemberById(memberInfo) {
    return request({
      url: '/admin/ucenter/member/update-member-info',
      method: 'put',
      data: memberInfo
    })
  },
  getPageList(page, limit, searchObj) {
    return request({
      url: `/admin/ucenter/member/list-page/${page}/${limit}`,
      method: 'get',
      params: searchObj
    })
  },

  removeById(id) {
    return request({
      url: `/admin/ucenter/member/remove/${id}`,
      method: 'delete'
    })
  },

  batchRemove(idList) {
    return request({
      url: `/admin/ucenter/member/batch-remove`,
      method: 'delete',
      data: idList
    })
  },
  selectNameListByKey(key) {
    return request({
      url: `/admin/ucenter/member/list/name/${key}`,
      method: 'get'

    })
  },
  disableById(id) {
    return request({
      url: `/admin/ucenter/member/disable-member-info/${id}`,
      method: 'put'

    })
  },
  deDisableById(id) {
    return request({
      url: `/admin/ucenter/member/dedisable-member-info/${id}`,
      method: 'put'

    })
  }

}

