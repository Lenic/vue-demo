<template>
  <el-dialog :title=title
             @open="getUserDetails"
             :visible="isShow"
             ref="defaultDialog"
             class="edit-employee"
             :before-close="() => $emit('close')">
    <div class="small-title">客户端展示</div>
    <el-form :model="form"
             :rules="rules"
             ref="defaultForm"
             label-width="80px"
             @submit.prevent="submitHandler">
      <el-form-item label="姓名"
                    prop="userName">
        <el-input auto-complete="off"
                  v-model.trim="form.userName" />
      </el-form-item>
      <el-form-item label="工号"
                    prop="jobnumber">
        <el-input auto-complete="off"
                  v-model.trim.number="form.jobnumber" />
      </el-form-item>
      <el-form-item label="手机号"
                    prop="mobile">
        <el-input auto-complete="off"
                  v-model.trim="form.mobile" />
      </el-form-item>
      <el-form-item label="职称">
        <el-input auto-complete="off"
                  v-model.trim="form.userPosition" />
      </el-form-item>
      <el-form-item label="邮箱"
                    prop="email">
        <el-input auto-complete="off"
                  v-model.trim="form.email" />
      </el-form-item>
      <el-form-item label="科室"
                    prop="deptVal">
        <el-cascader filterable
                     change-on-select
                     :options="dataSource"
                     v-model="form.deptVal"
                     :show-all-levels="false" />
      </el-form-item>
      <div class="small-title">客户端不展示</div>
      <el-form-item label="办公地点">
        <el-input auto-complete="off"
                  v-model.trim="form.workPlace" />
      </el-form-item>
      <el-form-item label="备注">
        <el-input auto-complete="off"
                  v-model.trim="form.remark" />
      </el-form-item>
    </el-form>
    <div slot="footer"
         class="dialog-footer">
      <el-button class="cancel-btn"
                 v-show="isEditor"
                 @click="delayingIsSubmitting ? '' : cancelUser()">
        删除员工
      </el-button>
      <el-button type="primary"
                 :loading="currentIsSubmitting"
                 @click="delayingIsSubmitting ? '' : saveHandler(false)">
        保存
      </el-button>
      <el-button type="primary"
                 v-show="!isEditor"
                 :loading="currentIsSubmitting"
                 @click="delayingIsSubmitting ? '' : saveHandler(true)">
        保存并继续添加
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import _ from 'underscore';
import isEmail from 'validator/lib/isEmail';
import { mapGetters, mapActions } from 'vuex';

import Loading from '$lib/components/loading';
import delay from '$lib/mixins/delay-property';
import linkStore from '$lib/mixins/link-store';
import { mapBus } from '$lib/utils/map-bus';
import { getLazyObjectNames } from '$lib/utils/lazy-object';

import ajax from '../config';
import store from './add-user-store';
import { CHANGE_USER_COUNT } from './constants';

const moduleName = 'manage.addressBook.addUser';

export default {
  props: {
    title: {
      type: String,
      require: true,
    },
    isShow: {
      type: Boolean,
      require: true,
    },
    isEditor: {
      type: Boolean,
      require: true,
    },
    value: {
      type: String,
      require: true,
    },
    editForm: {
      type: Object,
      require: true,
    },
  },
  components: { Loading },
  mixins: [linkStore(moduleName, store), delay('isSubmitting')],
  data() {
    return {
      isSubmitting: false,
      formLabelWidth: '120px',
      dept: {},
      form: {
        userName: '',
        jobnumber: '',
        mobile: '',
        userPosition: '',
        email: '',
        deptVal: [],
        workPlace: '',
        remark: '',
        regUserId: '',
      },
      rules: {
        userName: [
          {
            required: true,
            message: '请输入姓名',
            trigger: 'blur',
          },
          {
            min: 2,
            max: 5,
            message: '长度在 2 到 5 个字符',
            trigger: 'change',
          },
        ],
        jobnumber: [
          {
            validator: (rule, value, cb) => {
              if (!value) {
                cb();
              }
              const numericValue = parseFloat(value);
              if (_.isFinite(numericValue)) {
                return cb();
              }

              cb('请输入正确的数字工号');
            },
            trigger: 'change',
          },
        ],
        mobile: [
          {
            required: true,
            message: '请输入手机号码',
            trigger: 'blur',
          },
          {
            validator: (rule, value, cb) =>
              /^1[34578]\d{9}$/.test(value) ? cb() : cb('请输入正确的手机号码'),
            trigger: 'change',
          },
        ],
        email: [
          {
            validator: (rule, value, cb) =>
              !value ? cb() : (isEmail(value) ? cb() : cb('请输入正确的邮箱格式')),
            trigger: 'change',
          },
        ],
        deptVal: [
          {
            validator: (rule, value, cb) =>
              value && value.length ? cb() : cb('请选择员工所属科室'),
            trigger: 'change',
          },
        ],
      },
      dataApi: ajax({
        url: '/station/dept',
        stationId: () => this.value,
      }),
      employeeApi: ajax(
        { url: '/station/user/save' },
        () => ({
          stationId: this.value,
          ..._.chain(this.form).omit('deptVal').extend(this.getDept()).value(),
        }),
        { continue: true },
      ),
    };
  },
  computed: {
    ...mapBus(),
    ...mapGetters(moduleName, getLazyObjectNames('dataSource')),
  },
  methods: {
    ...mapActions(moduleName, ['fetchData']),
    saveHandler(isContinued) {
      const { defaultForm } = this.$refs;
      defaultForm.validate(valid => {
        if (!valid) {
          return false;
        }

        this.isSubmitting = true;
        this.employeeApi.post().then(() => {
          this.$message({
            message: '成功添加员工',
            type: 'success',
          });

          if (!this.form.regUserId) {
            this.bus.$emit(CHANGE_USER_COUNT, true, this.form.deptVal, 1);
          }

          this.isSubmitting = false;
          this.currentIsSubmitting = false;
          defaultForm.resetFields();
          if (!isContinued) {
            this.$emit('close');
          }
        }, () => this.isSubmitting = false);
      });
    },
    getUserDetails() {
      if (!this.editForm.id) {
        this.form = {};
        return false;
      }

      const val = this.editForm;
      val.deptVal = [];
      _.map(this.dataSource, v => {
        if (parseInt(v.value) === parseInt(val.hlDeptId)) {
          val.deptVal = [v.value];
        } else {
          _.map(v.children, v1 => {
            if (v1.value === val.hlDeptId) {
              val.deptVal = [v.value, v1.value];
            }
          });
        }
      });

      this.form = { ...this.form, ...val };
    },
    cancelUser() {
      this.$emit('cancel-user', this.form);
      this.$emit('close');
    },
    getDept() {
      const dept = {};
      _.map(this.dataSource, v => {
        if (parseInt(v.value) === parseInt(this.form.deptVal[0])) {
          if (this.form.deptVal.length === 1) {
            dept.hlDeptId = this.form.deptVal[0];
            dept.hlDeptName = v.label;
          } else {
            _.map(v.children, v1 => {
              if (parseInt(v1.value) === parseInt(this.form.deptVal[1])) {
                dept.hlDeptId = this.form.deptVal[1];
                dept.hlDeptName = v1.label;
              }
            });
          }
        }
      });
      return dept;
    },
  },
  mounted() {
    if (!this.dataSource.length) {
      this.fetchData(this.dataApi);
    }
  },
};
</script>
