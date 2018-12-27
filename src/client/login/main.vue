<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      autocomplete="on"
      :model="loginForm"
      :rules="loginRules"
      label-position="left"
      class="card-box login-form"
    >
      <h3 class="title">系统登录</h3>

      <el-form-item prop="username">
        <i class="el-icon-mobile-phone icon-prefix"></i>
        <el-input
          type="text"
          name="username"
          autocomplete="on"
          placeholder="用户名"
          v-model="loginForm.username"
        />
      </el-form-item>

      <el-form-item prop="password">
        <i class="el-icon-more icon-prefix"></i>
        <el-input
          name="password"
          :type="pwdType"
          autocomplete="on"
          placeholder="密码"
          v-model="loginForm.password"
          @keyup.enter.native="handleLogin"
        />
        <i @click="showPwd" class="el-icon-view icon-suffix" :class="{'show-pwd': !pwdType}"/>
      </el-form-item>

      <el-button
        type="primary"
        class="btn-submit"
        :loading="currentIsLoading"
        native-type="submit"
        @click.native.prevent="handleLogin"
      >登录</el-button>
    </el-form>
  </div>
</template>

<script>
import Auth from '$config/auth';
import useStyle from '$lib/mixins/useStyle';
import delay from '$lib/mixins/delayProperty';
import ajax, { debounce } from '$config/config';

import style from './css';

export default {
  mixins: [useStyle(style), delay('isLoading', debounce)],
  data() {
    this.loginRules = {
      username: [
        {
          required: true,
          trigger: 'blur',
          validator: (rule, value, callback) => {
            if (value.length <= 1) {
              callback(new Error('请输入正确的用户名'));
            } else {
              callback();
            }
          }
        }
      ],
      password: [
        {
          required: true,
          trigger: 'blur',
          validator: (rule, value, callback) => {
            if (value.length < 6) {
              callback(new Error('密码不能少于 6 位'));
            } else {
              callback();
            }
          }
        }
      ]
    };

    this.dataApi = ajax('/login', () => this.loginForm);

    return {
      loginForm: {
        username: 'admin',
        password: '1111111'
      },
      pwdType: 'password',
      isLoading: false
    };
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = '';
      } else {
        this.pwdType = 'password';
      }
    },
    handleLogin() {
      if (this.delayingIsLoading) {
        return;
      }

      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          this.isLoading = true;

          try {
            const res = await this.dataApi.post();

            // 下买两行位置不能互换，参考 delay-property.js 实现
            this.currentIsLoading = false;
            this.isLoading = false;

            Auth.setAuth(res.uid, res.token, res.mobile);
            this.$router.push({
              name: '首页',
              params: { abc: 'test-parameter' }
            });
          } catch (e) {
            this.currentIsLoading = false;
            this.isLoading = false;
          }
        }

        return false;
      });
    }
  }
};
</script>
