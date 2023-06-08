<template>
  <div>
    <statistics class="statistics" />

    <div class="chart-container">
      <mix-chart height="500px" width="100%" />
    </div>
  </div>
</template>

<script>
import Statistics from './statistics'
import MixChart from './mix-chart'

export default {
  name: 'Dashboard',
  components: { Statistics, MixChart },
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.statistics {
  margin-bottom: 50px;
}

.chart-container{
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>
