<template>
<section>
  <h4>
    <Breadcrumb separator=">">
      <BreadcrumbItem>分析</BreadcrumbItem>
      <BreadcrumbItem v-for="(name, idx) in routerName" :key="idx">{{ name }}</BreadcrumbItem>
    </Breadcrumb>
  </h4>
  <router-view></router-view>
</section>
</template>

<script>
export default {
  name: 'Analysis',
  data() {
    return {}
  },
  mounted () {},
  computed: {
    routerName: function () {
      return this.$route.name;
      
    },
  },
  methods: {}
}
</script>