<template>
  <el-dialog size="large"
             title="发公告"
             @open="getNoticeDetails"
             :before-close="() => $emit('close')"
             :visible="isShow">
    <loading css="height: 500px;"
             v-if="loadingNoticeIng" />
    <el-form v-else
             :model="form"
             :rules="rules"
             ref="defaultForm"
             :inline="true"
             label-width="54px">
      <el-form-item label="标题："
                    prop="title"
                    :label-width="formLabelWidth">
        <div class="title-width">
          <el-input v-model="form.title"
                    auto-complete="off" />
        </div>
      </el-form-item>
      <el-form-item label="作者："
                    prop="author"
                    :label-width="formLabelWidth">
        <el-input v-model="form.author"
                  auto-complete="off" />
      </el-form-item>
      <el-form-item label="置顶：">
        <el-checkbox v-model="form.isTop" />
      </el-form-item>
      <vue-editor v-model="content" />
    </el-form>
    <div slot="footer"
         class="dialog-footer">
      <el-button @click="$emit('close')">取 消</el-button>
      <el-button type="primary"
                 :loading="isSaveing"
                 @click="saveNotice">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { VueEditor } from 'vue2-editor';

import Loading from '$lib/components/loading';

import ajax from '../config';

export default {
  components: { VueEditor, Loading },
  props: {
    isShow: {
      type: Boolean,
      required: true,
    },
    value: {
      type: String,
      require: true,
    },
    noticeId: {
      type: Number,
      require: true,
    },
  },
  data() {
    return {
      form: {
        title: '',
        author: '',
        isTop: false,
        id: 0,
      },
      isSaveing: false,
      content: null,
      formLabelWidth: '80px',
      loadingNoticeIng: false,
      saveApi: ajax(
        { url: '/station/notice/save' },
        () => ({
          stationId: this.value,
          content: this.content,
          ...this.form,
          files: [],
          users: [],
          isTop: this.isTop ? 0 : 1,
        }),
      ),
      getNotice: ajax({
        url: () => `/station/notice/${this.noticeId}`,
      }),
      rules: {
        title: [
          {
            required: true,
            message: '请输入标题',
            trigger: 'blur',
          },
        ],
        author: [
          {
            required: true,
            message: '请输入作者',
            trigger: 'blur',
          },
        ],
      },
    };
  },
  methods: {
    saveNotice() {
      const { defaultForm } = this.$refs;
      defaultForm.validate(valid => {
        if (!valid) {
          return false;
        }

        if (!this.content) {
          this.$message('请先填写正文');
          return false;
        }
        this.isSaveing = true;
        this.saveApi.post().then(() => {
          this.$message({
            message: '保存成功',
            type: 'success',
          });

          this.isSaveing = false;
          defaultForm.resetFields();
          this.$emit('close');
          this.$emit('getNoticeList');
        });
      });
    },
    async getNoticeDetails() {
      if (this.noticeId < 0) {
        return false;
      }

      const token = setTimeout(() => this.loadingNoticeIng = true, 100);

      const { result } = await this.getNotice.fetch();

      clearTimeout(token);
      this.loadingNoticeIng = false;
      this.form = result;
      this.content = result.content;
      this.form.isTop = result.isTop === 1;
    },
    clearForm() {
      this.form = {
        title: '',
        author: '',
        isTop: false,
        id: 0,
      };
      this.content = null;
    },
  },
};
</script>
