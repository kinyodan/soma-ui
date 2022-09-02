<template>
  <div id="app">
    <nav-bar />
    <aside-menu v-if="role_student" :menu="menuStudent" />
    <aside-menu v-else :menu="menu" />
    <template v-if="loading">
      <card-component
        title="Performance"
        icon="finance"
        header-icon="reload"
      >
        <square>
          <vue-content-loading :width="300" :height="100">
            <circle cx="30" cy="30" r="30" />
            <rect x="75" y="13" rx="4" ry="4" width="100" height="15" />
            <rect x="75" y="37" rx="4" ry="4" width="50" height="10" />
          </vue-content-loading>
        </square>
      </card-component>
    </template>
    <template v-else>

      <nuxt />
    </template>
    <footer-bar />
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from '@/components/NavBar'
import AsideMenu from '@/components/AsideMenu'
import FooterBar from '@/components/FooterBar'
import AuthenticationService from '~/services/AuthenticationService'
import { VclFacebook, VclInstagram } from 'vue-content-loading';
import VueContentLoading from 'vue-content-loading';
import Vue from 'vue'
import { VueSpinners } from 'vue-spinners'

export default {
  name: 'Default',
  components: {
    FooterBar,
    AsideMenu,
    NavBar,
    VueContentLoading,
    VueSpinners,
    VclFacebook,
    VclInstagram
  },
  data(){
    return{
      role_student:null,
      student:null,
      loading:true,
    }
  },
  computed: {
    menuStudent() {
      return [
        'General',
        [
          {
            to: `/profiles/${this.student}`,
            icon: 'desktop-mac',
            label: 'Profile',
          },
        ],
        [
          {
            to: '/applications',
            icon: 'desktop-mac',
            label: 'Applications',
          },
        ]
      ]
    },
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
        //     to: '/profiles',
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
        this.loading=false
        if(response.data.role_student){
          this.role_student = response.data.role_student
          this.student = response.data.id
          await this.$router.push(`/profiles/${response.data.id}`)
        }
      } else {
        await this.$router.push('/login')
      }
    },
  },
}
</script>
