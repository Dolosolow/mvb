export default {
  dropDowns: {
    userMenu: $('#user-menu-btn').dropdown()
  },
  modals: {
    messageModal: $('#modal-msg').modal({
      startingTop: '-10%',
      endingTop: '10%',
      inDuration: 350,
      outDuration: 350
    }),
    loginModal: $('#modal-login').modal({
      startingTop: '-10%',
      endingTop: '10%',
      inDuration: 350,
      outDuration: 350
    })
  }
}