export default ({ app, store, route }) => {
  const user = app.$cookies.get('user')
  store.commit('SetUser', user)

  // const cookieRes = app.$cookies.get('cookie-name', { fromRes: true }) // get from res instead of req
}
