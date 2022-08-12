<template>
  <!--    <embed :src="`${file}`" width="1440px" height="900px" />-->
</template>
<script>
export default {
  name: 'DocumentDisplay',
  props: ['file'],
  mounted() {
    console.log('rendering this')
  },
}
</script>

