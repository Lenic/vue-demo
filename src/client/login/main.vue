<template>
  <div class="login-main">
    <div class="login-page">
      <img class="login-bg"
           :src="require('$res/images/login_bg.gif')" />
      <el-form :model="form"
               :rules="rules"
               ref="defaultForm">
        <el-form-item prop="mobile">
          <el-input v-model="form.mobile"
                    auto-complete="on"
                    name="mobile"
                    placeholder="管理员账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password"
                    type="password"
                    name="password"
                    placeholder="密码"></el-input>
        </el-form-item>

        <!-- <el-input class="verification-code"
                                                placeholder="验证码"></el-input>
                                      <img alt="输入验证码"
                                           title="看不清，请点击图片刷新"
                                           src="http://crm.lianlianbox.com/authImg"
                                           class="verification-picture"> -->
        <p class="invalid-tip"
           v-show="invalidTip">{{invalidTip}}</p>
        <div class="btn">
          <el-button type="primary"
                     @click="judgeCondition">立即登录</el-button>
        </div>
      </el-form>
      <div class="footer">
        2016 浙江禾连网络科技有限公司 浙ICP备15005165号-1
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import _ from 'underscore';

import Auth from '~/common/auth';
import ajax from '$lib/utils/api-factory';
import useStyle from '$lib/mixins/use-style';

import style from './css';

const api = new ajax({ url: '/login' });

var title = null;

export default {
  mixins: [useStyle(style)],
  data() {
    return {
      invalidTip: false,
      form: {
        mobile: '',
        password: '',
      },
      dataApi: api(
        {
          mobile: () => this.form.mobile,
          password: () => this.form.password,
        },
        null,
        {
          callback: res => res.data.code
            ? Promise.reject(new Error(res.data.errorMsg || '--'))
            : res,
        },
      ),
      rules: {
        mobile: [
          {
            required: true,
            message: '请输入管理员账号',
            trigger: 'blur',
          },
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur',
          },
          {
            min: 6,
            message: '请输入完整密码',
            trigger: 'change',
          },
        ],
      },
    };
  },
  methods: {
    judgeCondition() {
      const { defaultForm } = this.$refs;
      defaultForm.validate(valid => {
        if (!valid) {
          return false;
        }

        this.login();
      });
    },
    async login() {
      const { query } = this.$route
        , path = _.has(query, 'redirect') ? query.redirect : '/';

      try {
        const { result } = await this.dataApi.post()
          , data = result.split('|');

        this.invalidTip = '';
        Auth.setAuth(data[0], data[1], this.form.mobile);

        this.$router.push({ path });
      } catch (e) {
        this.invalidTip = e.message;
      }
    },
  },
  beforeCreate() {
    title = document.title;
    document.title = '登录';
  },
  mounted() {
    if (this.$route.query.loginstate === 'login_invalid') {
      this.invalidTip = true;
    }

    document.getElementsByClassName('login-main')[0].style.height = `${window.innerHeight}px`;
  },
  destroyed() {
    document.title = title;
  },
};
</script>
