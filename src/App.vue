<template>
  <div id="app">
    <ht-check-version />
    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script>
import HtCheckVersion from '@/components/HtCheckVersion'

export default {
  name: 'App',
  components: { HtCheckVersion },
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(function() {
        this.isRouterAlive = true
      })
    }
  }
}
</script>
