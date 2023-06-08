<template>
  <transition name="slide-fade">
    <div v-if="show" class="version" @click="refresh()">
      <el-image class="icon" :src="ReloadImg" />
      <div class="tips">
        发现新版本点击刷新
      </div>
    </div>
  </transition>
</template>

<script>
import ReloadImg from '@/assets/logo/logo.png'
import axios from 'axios'
import defaultSettings from '@/settings'

export default {
  props: {
  },
  data() {
    return {
      ReloadImg,
      key: 'version',
      show: false,
      timer: null
    }
  },
  watch: {
  },
  created() {
    // 10分钟轮询检测版本更新
    const timeout = 1000 * 60 * 10
    this.timer = setInterval(() => {
      this.checkVersion()
    }, timeout)
  },
  methods: {
    refresh() {
      location.reload()
    },
    checkVersion() {
      axios.get('/', { headers: { 'Cache-Control': 'no-cache' }})
        .then(res => {
          if (res && res.data) {
            const data = res.data.replace(/"/g, '')
            const match = `<meta name=version content=`
            const stIdx = data.indexOf(match) + match.length
            if (data && stIdx !== -1) {
              const edIdx = data.indexOf('>', stIdx)
              const newVersion = data.substring(stIdx, edIdx)
              this.show = newVersion !== defaultSettings.version
              if (this.show) {
                clearInterval(this.timer)
              }
            }
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variables.scss';
.version {
  position: fixed;
  background-color: white;
  right: 0;
  bottom: 5%;
  z-index: 99999;
  cursor: pointer;
  display: flex;
  height: 50px;
  justify-items: center;
  border-radius: 30px 0 0 30px;
  box-shadow:
    inset 0 -3em 3em rgba(255,255,255,0),
    0.3em 0.3em 1em rgba(0,0,0,0.3);
  .icon {
    height: 30px;
    margin: 10px 0 0 10px;
    -webkit-animation: self-rotation 5s linear infinite;
    animation: self-rotation 5s linear infinite;
  }
  .tips {
    margin-left: 10px;
    color: $main-color;
    width: 80px;
    font-size: 14px;
    height: 22px;
    line-height: 22px;
  }
}

@keyframes self-rotation {
  0% {
    -webkit-transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
  }
}

.slide-fade-enter-active {
  transition: all 3s ease;
  transition-duration: 3s;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
