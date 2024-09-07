<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { FormRules, UploadProps, ElMessage, UploadRawFile, genFileId } from 'element-plus';

import { userApi, articleApi } from '@/http/api';
import { fullUrl } from "@/utils/url";
import { tokenMgr } from "@/utils/token";
import { baseURL } from "@/utils/constant";
import Dialog from "@/components/Dialog.vue";


const props = defineProps(["onSuccess"]);
const upload = ref();
const formRef = ref();
const uploadPath = `${baseURL}/article/upload/headers`;
const formData = reactive({
    nickName: "",
    company: "",
    position: "",
    profile: "",
    photo: ""
});
const deletePhotos: Array<string> = [];
const rules = reactive<FormRules>({
  nickName: [ { required: true, message: '用户名不能为空', trigger: 'blur', whitespace: true, max: 20 }],
  company: [ { message: '公司长度不超过 40 字符', trigger: 'blur', whitespace: true, max: 40 }],
  position: [ { message: '职位长度不超过 30 字符', trigger: 'blur', whitespace: true, max: 30 }],
  profile: [ { message: '个人简介长度不超过 50 字符', trigger: 'blur', whitespace: true, max: 50 }],
});
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.size / 1024 / 1024 > 5) {
        ElMessage.error('文件大小不能超过 5MB！');
        return false;
    }
    return true;
}
const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
    deletePhotos.push(formData.photo);
    formData.photo = response.data.url;
}
const handleExceed: UploadProps['onExceed'] = (files) => {
    upload.value!.clearFiles();
    const file = files[0] as UploadRawFile;
    file.uid = genFileId();
    upload.value!.handleStart(file);
    upload.value!.submit();
}
const submitForm = async () => {
    if (!formRef.value) return;
    await formRef.value.validate(async (valid) => {
        if (!valid) return;
        await userApi.updateUserInfo(formData);
        articleApi.deleteFiles(deletePhotos);
        props.onSuccess();
    });
}

onMounted(async () => {
    const data = await userApi.getUserInfo();
    Object.assign(formData, data);
});
</script>

<template>
    <Dialog name="PersonData" title="编辑个人资料" width="900">
        <div class="content">
            <el-form
                ref="formRef"
                style="max-width: 600px"
                :model="formData"
                :rules="rules"
                label-width="auto"
                status-icon>
                <el-form-item label="用户名" prop="nickName">
                    <el-input v-model="formData.nickName" placeholder="请输入用户名" />
                </el-form-item>
                <el-form-item label="公司" prop="company">
                    <el-input v-model="formData.company" placeholder="请输入公司" />
                </el-form-item>
                <el-form-item label="职位" prop="position">
                    <el-input v-model="formData.position" placeholder="请输入职位" />
                </el-form-item>
                <el-form-item label="个人简介" prop="profile">
                    <el-input v-model="formData.profile" placeholder="请输入个人简介" />
                </el-form-item>
            </el-form>
            <div class="header">
                <el-upload
                    ref="upload"
                    :action="uploadPath"
                    :headers="{token: tokenMgr.getToken()}"
                    :show-file-list="false"
                    accept="image/*"
                    :limit="1"
                    :on-exceed="handleExceed"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img :src="fullUrl(formData.photo)" class="avatar" />
                </el-upload>
                <el-text style="color: #000; font-weight: bold;">我的头像</el-text>
                <el-text style="color: #8a919f; font-size: 12px;">支持 jpg、png、jpeg 格式大小 5M 以内的图片</el-text>
            </div>
        </div>
        <el-divider style="margin: 0 0 15px 0;" />
        <div class="btn_container">
            <el-button type="primary" size="large" @click="submitForm">保&nbsp;存</el-button>
        </div>
    </Dialog>
</template>

<style lang="scss" scoped>
.content {
    display: flex;
    align-items: center;

    .el-form {
        flex-grow: 1;
        margin-right: auto;
    }
    .header {
        width: 135px;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-right: 30px;

        .avatar {
            width: 90px;
            height: 90px;
            border-radius: 100%;
        }
    }
}
.btn_container {
    display: flex;
    justify-content: center;

    .el-button {
        margin: auto;
        margin-bottom: 15px;
    }
}
</style>