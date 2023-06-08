<template>
  <div class="navbar">
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <template>
          <div class="right-menu-item">
            <div class="avatar-wrapper">
              <img :src="userInfo ? (userInfo.avatarUrl || AvatarImage) : AvatarImage" class="user-avatar" alt="">
            </div>
          </div>
        </template>
        <div class="avatar-container right-menu-item hover-effect" trigger="click">
          <div class="right-menu-item name-size">
            <small v-if="userInfo" class="user-info">{{ userInfo.username }}</small>
            <span class="divider" />
          </div>
        </div>
      </template>
      <template>
        <div class="right-menu-item login-out-div" @click="logout">
          <svg-icon icon-class="exit" class="login-out-img" />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import permission from '../../directive/permission/permission'
import AvatarImage from '@/assets/avatar.png'
import loginOutImg from '@/assets/exit.png'
import { mapState } from 'pinia'
import { useAuthUserStore } from '@/store/modules/user'
import { useAppStore } from '@/store/modules/app'

export default {
  directives: { permission },
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      AvatarImage,
      loginOutImg,
      switchUserList: [],
      timer: undefined
    }
  },
  computed: {
    ...mapState(useAppStore, ['sidebar', 'device']),
    ...mapState(useAuthUserStore, ['avatar', 'userInfo', 'permissions', 'messageCount'])
  },
  created() {
  },
  beforeDestroy() {
  },
  methods: {
    toggleSideBar() {
      useAppStore().toggleSideBar()
    },
    async logout() {
      try {
        await useAuthUserStore().logout()
      } finally {
        this.$router.push({ name: 'Login' })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/variables.scss";
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      .el-icon-caret-bottom{
        font-size: 10px;
        vertical-align: middle;
      }
      .user-info{
        color: $main-color;
      }
      .divider{
        display: inline-block;
        width: 1px;
        height: 60%;
        background: #dddddd;
        vertical-align: middle;
        margin-left: 10px;
      }
    }
  }

  .item {
    margin-top: 5px;
  }
  .message-div {
    cursor: pointer;
    .el-icon-bell{
      font-size: 22px;
      vertical-align: middle;
    }
    .message-badge {
      position: absolute;
      margin-left: -20px;
      margin-top: -2px;
    }
    ::v-deep .el-badge__content{
      background-color: #F56c6c;
    }
    .divider{
      display: inline-block;
      width: 1px;
      height: 60%;
      background: #dddddd;
      vertical-align: middle;
      margin-left: 10px;
    }
  }
  .login-out-div{
    cursor: pointer;
    margin: 0 12px 0 -8px ;
    .login-out-img{
      width: 20px;
      vertical-align: middle;
      color: $main-color;
    }
  }
  .avatar-wrapper {
    margin-top: 5px;
    position: relative;

    .user-avatar {
      cursor: pointer;
      width: 40px;
      height: 40px;
      border-radius: 20px;
      margin: 0 -12px 0 0;
    }

    .el-icon-caret-bottom {
      cursor: pointer;
      position: absolute;
      right: -20px;
      top: 25px;
      font-size: 12px;
    }
  }
}
</style>
