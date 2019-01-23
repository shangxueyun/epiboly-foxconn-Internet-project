<template>
  <router-view @returnSensorType="returnSType"></router-view>
</template>

<script>
export default {
  name: 'dataIncrement',
  components: {},
  data() {
    return {}
  },
  methods: {
    returnSType: function (type) {
      this.$emit('returnSensorType', type);
    }
  },
  computed: {}
}
</script>