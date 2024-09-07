<script setup lang="ts">
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";

import { userApi } from '@/http/api';
import Dialog from "@/components/Dialog.vue";

const formRef = ref();
const form = reactive({
    username: "",
    password: ""
});
const props = defineProps(["success"]);
const rules = reactive({
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
});

const onClose = () => {  // 关闭弹窗的回调
    if (!formRef.value) return;
    formRef.value.resetFields();
}
const fastLogin = () => {
    form.username = "guest";
    form.password = "123456";
    submitForm();
}
const submitForm = async () => {
    if (!formRef.value) return;
    await formRef.value.validate(async (valid: boolean) => {
        if (!valid) return;
        const data = await userApi.login(form);
        if (data) {
            props.success(data);
            ElMessage({
                message: '登录成功',
                type: 'success',
            });
        }
    })
}
</script>

<template>
    <Dialog name="Login" title="登录技术派畅享更多权益" width="400" :onClose="onClose">
        <el-form :model="form" label-width="auto" :rules="rules" ref="formRef">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="form.username" placeholder="请输入用户名" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="form.password" placeholder="请输入密码" />
            </el-form-item>
            <el-form-item label="">
                <el-button color="#ff6900" @click="submitForm">登&nbsp;&nbsp;录</el-button>
            </el-form-item>
            <el-form-item label="">
                <el-button type="primary" link @click="fastLogin">
                    一键登录
                </el-button>
            </el-form-item>
        </el-form>
    </Dialog>
</template>

<style lang="scss" scoped>
.el-button {
    width: 100%;
    color: #fff;
}
.el-button:hover {
    color: #fff;
}
</style>