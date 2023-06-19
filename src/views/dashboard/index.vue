<template>
  <div>
    <statistics class="statistics" />

    <el-card>
      <line-chart :chart-data="lineChartData" />
    </el-card>
  </div>
</template>

<script>
import Statistics from './statistics'
import LineChart from './line-chart'
import { getRandomNumber } from '@/utils/business'

export default {
  name: 'Dashboard',
  components: { Statistics, LineChart },
  data() {
    return {
      lineChartData: {
        expectedData: this.getExpectedData(),
        actualData: this.getActualData()
      }
    }
  },
  created() {
  },
  methods: {
    getExpectedData() {
      const data = []
      for (let i = 0; i < 7; i++) {
        data.push(getRandomNumber(100, 9999))
      }
      return data
    },
    getActualData() {
      const data = []
      for (let i = 0; i < 7; i++) {
        data.push(getRandomNumber(100, 9999))
      }
      return data
    }
  }
}
</script>

<style lang="scss" scoped>
.statistics {
  margin-bottom: 50px;
}
</style>
