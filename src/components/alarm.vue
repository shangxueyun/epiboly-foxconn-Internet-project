<template>
<section>
  <h4>
    <Breadcrumb separator=">">
      <BreadcrumbItem>告警</BreadcrumbItem>
      <BreadcrumbItem>{{ routerName }}</BreadcrumbItem>
    </Breadcrumb>
  </h4>
  <router-view></router-view>
</section>
</template>

<script>
export default {
  name: 'Alarm',
  data() {
    return {}
  },
  computed: {
    routerName: function () {
      return this.$route.name;
    }
  }
}
</script>