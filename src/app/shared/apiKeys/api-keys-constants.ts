export const API_KEYS = {

  // public && userManagment
  LOGIN: 'public/userManagment/login',
  FORGOTPASSWORD: 'public/userManagment/forgotPassword',
  RESETPASSWORD: 'public/userManagment/updatePassword',

  // content management
  ADDUTILITY: 'private/contentManagment/addUtilities',
  GETUTILITY: 'private/contentManagment/getUtilites',
  DELETEUTILITY: 'private/contentManagment/removeUtilites',
  GETTERM: 'private/contentManagment/getTerms',
  ADDTERM: 'private/contentManagment/addTerms',
  LINKTEXT: 'private/contentManagment/listLinksText?size=:size&&pageNo=:pageNo',
  ADDTEXTLINK: 'private/contentManagment/addLinksText',
  ADDADVERTISE: 'private/contentManagment/addAdvertisement',
  DELETEADVERTISELINK: 'private/contentManagment/deleteAdvertisementLinks',
  // template management
  ADDTEMPLATE: 'private/templateManagment/addTemplate',
  EDITTEMPLATE: 'private/templateManagment/editTemplate',
  DELETETEMPLATE: 'private/templateManagment/deleteTemplate',
  VIEWTEMPLATE: 'private/templateManagment/viewtemplate',
  LISTTEMPLATE: 'private/templateManagment/listTemplate?size=:size&&pageNo=:pageNo',
  // private && userManagment
  CHKFIRMSIZE: 'private/userManagment/chkFirmSize',
  adminResetPassword: 'private/userManagment/adminResetPassword',
  ExtendValidity: 'private/userManagment/extendUserValidity',
  AllUser: 'private/userManagment/listAllUser?size=:size&&pageNo=:pageNo',
  REGISTERFIRMUSER: 'private/userManagment/registerFirmUser',
  UPDATEUSERSTATUS: 'private/userManagment/updateUserStatus',
  VIEWUSER: 'private/userManagment/viewUserDetail?userId=:userId',
  SEARCHUSER: 'private/userManagment/searchUser?size=:size&&pageNo=:pageNo',
  ROLELIST: 'private/userManagment/userRoleList',
  FILTERUSER: 'private/userManagment/filterUser?size=:size&&pageNo=:pageNo',
  EDITUSER: 'private/userManagment/editUser',

  //private && data management
  dataChat: 'private/dataManagment/graphicalUserData',
  PLANLIST: 'private/dataManagment/listAllPlan?size=:size&&pageNo=:pageNo',
  VIEWPLAN: 'private/dataManagment/viewPlanDetail',
  ADDPLAN: 'private/dataManagment/addPlan',
  EDITPLAN: 'private/dataManagment/editPlan',
  DELETEPLAN: 'private/dataManagment/deletePlan',

  // private && firmManagment
  REQUEST: 'private/firmManagment/listFrimRequest?size=:size&&pageNo=:pageNo',
  GETFIRMREQUESTDETAIL: 'private/firmManagment/getFirmRequestDetail',
  FILTERREQUEST: 'private/firmManagment/filterFirmRegisterRequest?size=:size&&pageNo=:pageNo',
  FIRMLIST: 'private/firmManagment/listAllFirm?size=:size&&pageNo=:pageNo',
  REGISTERFIRM: 'private/firmManagment/registerFirm',
  FIRMDETAIL: 'private/firmManagment/viewFirmDetail?firmId=:firmId',
  UpDATEFIRMSTATUS: 'private/firmManagment/updateFirmStatus',
  EDITFIRM: 'private/firmManagment/editFirm',
  SEARCHFIRM: 'private/firmManagment/searchFirm?size=:size&&pageNo=:pageNo',

  // private && issueManagment
  ALLISSUES: 'private/issueManagment/listAllIssues?size=:size&&pageNo=:pageNo',
  SEARCHISSUE: 'private/issueManagment/searchIssue?size=:size&&pageNo=:pageNo',
  FILTERISSUE: 'private/issueManagment/FilterIssueStatus?size=:size&&pageNo=:pageNo',
  UpDATEISSUESTATUS: 'private/issueManagment/updateIssueStatus',
};
