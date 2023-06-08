<template>
  <div class="login-container">
    <div id="login-bg-container" class="login-bg-container">
      <div class="login-bg-inside">
        <div class="login-operation-container">

          <div class="title">
            {{ title }}
          </div>

          <div class="login-bg-form">
            <el-form
              ref="loginForm"
              :model="loginForm"
              :rules="loginRules"
              class="login-form"
              autocomplete="on"
              label-position="left"
            >
              <div class="login-label">用户名</div>

              <el-form-item prop="username">
                <span class="svg-container">
                  <svg-icon icon-class="user" />
                </span>
                <el-input
                  ref="username"
                  v-model="loginForm.username"
                  placeholder="请输入用户名"
                  name="username"
                  type="text"
                  tabindex="1"
                  auto-complete="new-password"
                />
              </el-form-item>

              <div class="login-label">密码</div>

              <el-form-item prop="password">
                <span class="svg-container">
                  <svg-icon icon-class="password" />
                </span>
                <el-input
                  :key="passwordType"
                  ref="password"
                  v-model="loginForm.password"
                  :type="passwordType"
                  placeholder="请输入密码"
                  name="password"
                  tabindex="2"
                  auto-complete="new-password"
                  @keyup.native="checkCapslock"
                  @blur="capsTooltip = false"
                  @keyup.enter.native="handleLogin"
                />
                <span class="show-pwd" @click="showPwd">
                  <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
                </span>
              </el-form-item>

              <el-button
                :loading="loading"
                type=""
                size="large"
                class="login-button"
                @click.native.prevent="handleLogin"
              >
                登   录
              </el-button>
            </el-form>
          </div>
        </div>
      </div>
      <version class="version" />
    </div>
  </div>
</template>

<script>
import { useAuthUserStore } from '@/store/modules/user'
import Version from '@/layout/components/Sidebar/Version'
import defaultSettings from '@/settings'

const userStore = useAuthUserStore()

export default {
  name: 'Login',
  components: { Version },
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能少于6位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      redirect: undefined,
      otherQuery: {},
      QRCodeDialogVisible: false,
      changePwdDialogVisible: false,
      adminListDialogVisible: false,
      title: defaultSettings.title
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
  },
  methods: {
    checkCapslock({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        this.capsTooltip = shiftKey && (key >= 'a' && key <= 'z') || !shiftKey && (key >= 'A' && key <= 'Z')
      }
      if (key === 'CapsLock' && this.capsTooltip === true) {
        this.capsTooltip = false
      }
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          userStore.login(this.loginForm.username, this.loginForm.password).then(() => {
            this.loading = false
            this.$router.push('/dashboard')
          }).catch(() => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>

<style lang="scss">
@import "../../styles/variables";
//公用ui
/* 修复input 背景不协调 和光标变色 */

$bg: #EDE9E0;
$light_gray: #fff;
$cursor: grey;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 50px;
    width: 85%;

    input {
      background: transparent;
      border: 0;
      -webkit-appearance: none;
      border-radius: 0;
      padding: 12px 5px 12px 15px;
      color: #000000;
      height: 47px;
      caret-color: #333;
    }

    input:-webkit-autofill {
      -webkit-text-fill-color: $cursor !important;
      transition: background-color 5000s ease-in-out 0s !important;
    }

    input:-webkit-autofill:focus {
      -webkit-text-fill-color: $cursor !important;
      transition: background-color 5000s ease-in-out 0s !important;
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 5px;
  }

  .el-input__inner {
    font-size: 14px;
    background-color: transparent;
    color: $main-color
  }

  .el-form-item__error {
    padding-left: 5px;
    padding-top: 5px;
    padding-bottom: 5px;
    font-size: 12px;
    color: $red;
  }
}
</style>

<style lang="scss" scoped>
@import "../../styles/variables";
$bg: #EDE9E0;

::v-deep .el-form-item__content{
  background: $bg;
  border-radius: 4px;
}

::v-deep input::-webkit-input-placeholder{
  -webkit-text-fill-color: $main-color;
  font-size: 14px;
}

.login-container{
  min-height: 750px;
  height: 100%;
  width: 100%;
  overflow-x: auto;

  .login-bg-container{
    position: relative;
    width: 100%;
    height: 100%;
    min-width: 1400px;
    margin-left: auto;
    margin-right: auto;
    background-color: white;
    background-size: 100% 100%;
    background-image: url("../../assets/login/background.jpg");

    .login-bg-inside {
      border-radius: 10px;
      position: absolute;
      height: 600px;
      width: 1200px;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      background-size: 100% 100%;

      .login-operation-container{
        position: absolute;
        z-index: 2;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        background: #efefef;
        padding: 0 0 50px 0;
        border-radius: 12px;

        .login-bg-form {
          padding: 0 80px;
        }

        .title {
          border-radius: 12px 12px 0 0;
          text-align: center;
          font-size: 30px;
          background: #1B232C;
          color: white;
          line-height: 80px;
          height: 80px;
          margin-bottom: 40px;
        }

        .login-logo-text {
          width: 350px;
          padding-bottom: 10px;
          //border-bottom: 1px solid $main-color-dark;
          //border-bottom: 1px solid #C5B99F;
        }

        .login-form {
          width: 350px;
          max-width: 100%;
          margin-top: 10px;

          .title-container {
            position: relative;
            padding: 10px;
            margin-bottom: -10px;

            .title-pre-span {
              z-index: 2;
              display: inline-block;
              width: 5px;
              height: 20px;
              vertical-align: top;
              line-height: 20px;
              background-color: $main-color;
            }

            .title {
              font-size: 18px;
              color: #333333;
              margin: 0 auto 40px 10px;
              text-align: center;
              font-weight: bold;
            }
          }

          .svg-container {
            padding: 6px 5px 6px 15px;
            color: $main-color;
            vertical-align: middle;
            width: 30px;
            display: inline-block;
            background-color: $bg;
          }

          .show-pwd {
            position: absolute;
            right: 15px;
            top: 15px;
            font-size: 16px;
            color: $main-color;
            cursor: pointer;
            user-select: none;
          }

          .forget-tip{
            margin-top: -10px;
            text-align: right;

            .tip{
              font-size: 12px;
              color: $red;
              cursor: pointer;

              &:hover {
                text-decoration: underline;
              }
            }
          }

          .login-button {
            margin-top: 20px;
            width: 100%;
            color: white;
            height: 50px;
            background-color: $main-color;
            font-size: 21px;
            font-weight: bold
          }
        }

        .get-QR-code-container{
          margin-top: 10px;
          text-align: center;

          .el-button:hover{
            text-decoration: underline;
          }
        }
      }
    }
  }
}
.QR-code-container{
  height: 300px;
  text-align: center;

  img{
    width: 200px;
    height: 200px;
    margin-top: 30px;
    //border: 1px solid $main-color;
  }

  .QR-code-msg{
    display: block;
    margin-top: 20px;
    text-align: center;
    font-size: 16px;
    color: $main-color;
  }

}

.version {
  position: absolute;
  bottom: 0;
}

.login-label {
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: bold;
}

</style>
