<template>
  <div id="app">
    <nav-bar />
    <aside-menu :menu="menu" />
    <nuxt />
    <footer-bar />
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from '@/components/NavBar'
import AsideMenu from '@/components/AsideMenu'
import FooterBar from '@/components/FooterBar'
import AuthenticationService from '~/services/AuthenticationService'

export default {
  name: 'Default',
  components: {
    FooterBar,
    AsideMenu,
    NavBar,
  },
  computed: {
    menu() {
      return [
        'General',
        [
          {
            to: '/',
            icon: 'desktop-mac',
            label: 'Dashboard',
          },
        ],
        [
          {
            to: '/applications',
            icon: 'desktop-mac',
            label: 'Applications',
          },
          {
            to: '/students',
            icon: 'desktop-mac',
            label: 'Students',
          },
          {
            to: '/institutions',
            icon: 'desktop-mac',
            label: 'Institutions',
          },
        ],
        // 'Examples',
        // [
        //   {
        //     to: '/tables',
        //     label: 'Tables',
        //     icon: 'table',
        //     updateMark: true,
        //   },
        //   {
        //     to: '/forms',
        //     label: 'Forms',
        //     icon: 'square-edit-outline',
        //   },
        //   {
        //     to: '/profile',
        //     label: 'Profile',
        //     icon: 'account-circle',
        //   },
        //   {
        //     label: 'Submenus',
        //     subLabel: 'Submenus Example',
        //     icon: 'view-list',
        //     menu: [
        //       {
        //         href: '#void',
        //         label: 'Sub-item One',
        //       },
        //       {
        //         href: '#void',
        //         label: 'Sub-item Two',
        //       },
        //     ],
        //   },
        // ],
        // 'About',
        // [
        //   {
        //     href: 'https://admin-one-nuxt.justboil.me',
        //     label: 'Premium Demo',
        //     icon: 'credit-card',
        //   },
        //   {
        //     href: 'https://justboil.me/bulma-admin-template/one-nuxt',
        //     label: 'About',
        //     icon: 'help-circle',
        //   },
        // ],
      ]
    },
  },
  created() {
    const user = this.$cookies.get('user')
    if (user && user.data.status) {
      this.verifyLogin(user.data)
      this.$store.commit('user', {
        name: '',
        email: user.profile,
        avatar: 'https://avatars.dicebear.com/v2/gridy/John-Doe.svg',
      })
    } else {
      this.$router.push('/login')
    }
  },
  mounted() {
    document.documentElement.classList.add('has-aside-left')
    document.documentElement.classList.add('has-aside-mobile-transition')
    document.documentElement.classList.add('has-navbar-fixed-top')
    document.documentElement.classList.add('has-aside-expanded')
  },
  methods: {
    async verifyLogin(user) {
      const response = await AuthenticationService.verifyUser(user)
      if (response.data.status) {
        console.log('authenticated')
      } else {
        await this.$router.push('/login')
      }
    },
  },
}
</script>
