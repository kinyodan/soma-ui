<template>
  <aside v-show="isAsideVisible" class="aside is-placed-left is-expanded">
    <aside-tools :is-main-menu="true">
    
          <span slot="label"> <img :src="main_logo" alt="wira link " width="500" height="600"> </span>


    </aside-tools>
    <div class="menu is-menu-main">
      <template v-for="(menuGroup, index) in menu">
        <p v-if="typeof menuGroup === 'string'" :key="index" class="menu-label">
          {{ menuGroup }}
        </p>
        <aside-menu-list
          v-else
          :key="index"
          :menu="menuGroup"
          @menu-click="menuClick"
        />
      </template>
    </div>
  </aside>
</template>

<script>
import { mapState } from 'vuex'
import AsideTools from '@/components/AsideTools'
import AsideMenuList from '@/components/AsideMenuList'
import LogoUrl from "~/services/LogoService"

export default {
  name: 'AsideMenu',
  components: { AsideTools, AsideMenuList },
  props: {
    menu: {
      type: Array,
      default: () => [],
    },
  },
  data(){
    return{
      main_logo:"",
    }
  },
  created(){
    this.setMainLogo()
  },
  computed: {
    ...mapState(['isAsideVisible']),
  },
  methods: {
    menuClick(item) {
      //
    },
    setMainLogo(){
      let logo_url = LogoUrl.setLogo()
      console.log(logo_url)
      this.main_logo= logo_url
    }
  },
}
</script>
