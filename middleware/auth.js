export default ({ app, store, route }) => {
  const user = app.$cookies.get('user')
  store.commit('SET_USER', user)

  // const cookieRes = app.$cookies.get('cookie-name', { fromRes: true }) // get from res instead of req
}
