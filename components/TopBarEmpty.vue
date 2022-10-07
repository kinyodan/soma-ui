<template>
  <nav v-show="isNavBarVisible" id="navbar-main" class="navbar is-fixed-top">
    <aside-tools :is-main-menu="true">
      <span slot="label"> 
      <a href="#about2" class="">
                          <img src="https://res.cloudinary.com/selae-learning/image/upload/c_thumb,g_face,r_15,w_200/v1664905155/wankimani/Indigo_White_Modern_Minimal_Typographic_Business_Brand_Identity_Logo_2_xnofnz.png"> </a>
                           </span>
    </aside-tools>
<!--    <h3>WANKIMANI ADMIN</h3>-->
    <div
      class="navbar-menu fadeIn animated faster"
      :class="{ 'is-active': isMenuNavBarActive }"
    >
      <div class="navbar-end">

      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'
import NavBarMenu from '@/components/NavBarMenu'
import UserAvatar from '@/components/UserAvatar'

export default {
  name: 'TopBarEmpty',
  components: {
    UserAvatar,
    NavBarMenu,
  },
  data() {
    return {
      isMenuNavBarActive: false,
      isNavBarVisible: true,
    }
  },
  computed: {
    menuNavBarToggleIcon() {
      return this.isMenuNavBarActive ? 'close' : 'dots-vertical'
    },
    menuToggleMobileIcon() {
      return this.isAsideMobileExpanded ? 'backburger' : 'forwardburger'
    },
    // ...mapState([
    //   'isNavBarVisible',
    //   'isAsideMobileExpanded',
    //   'userName',
    //   'userEmail',
    // ]),
  },
  methods: {
    menuToggleMobile() {
      // this.$store.commit('asideMobileStateToggle')
    },
    menuNavBarToggle() {
      this.isMenuNavBarActive = !this.isMenuNavBarActive
    },
    logout() {
      this.$cookies.removeAll()
      this.$buefy.snackbar.open({
        message: 'Log out clicked',
        queue: false,
      })
      this.$router.push('/login')
    },
  },
}
</script>
