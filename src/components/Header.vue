<script setup lang="ts">
    import emitter from "@/utils/emitter";
    import { useRouter } from 'vue-router';
    import { onMounted, reactive, ref } from "vue";

    import { userApi } from '@/http/api';
    import { fullUrl } from '@/utils/url';
    import { tokenMgr } from '@/utils/token';
    import { tokenStr } from '@/utils/constant';
    import LoginDialog from "@/components/LoginDialog.vue";
import { ElMessage } from "element-plus";
    
    const isLogin = ref(false);
    const router = useRouter();
    const indexUserInfo = reactive({
        photo: '',
        msgCount: 0
    });

    const navigateTo = (path: string) => {
        router.push(path);
    }
    const changeLoginState = (isShow: boolean) => {
        emitter.emit("changeDialogState", {name: "Login", state: isShow});
    }
    const loginSuccess = async (data: object) => {
        tokenMgr.setToken(data[tokenStr]);
        changeLoginState(false);
        isLogin.value = true;
        getIndexUserInfo();
    }
    const logout = () => {
        tokenMgr.removeToken();
        navigateTo("/index");
        isLogin.value = false;
    }
    const getIndexUserInfo = async () => {
        const data = await userApi.getIndexUserInfo();
        Object.assign(indexUserInfo, data);
        indexUserInfo.photo = fullUrl(indexUserInfo.photo);
    }
    const edit = () => {
        if (tokenMgr.hasToken()) {
            navigateTo('/editor');
        } else {
            ElMessage.error("登录后开启功能");
        }
    }

    onMounted(async () => {
        if (tokenMgr.hasToken()) {
            isLogin.value = true;
            getIndexUserInfo();
        }
    });
</script>

<template>
    <div class="hd_ext">
        <div class="hd_container">
            <img src="@/assets/logo.svg" style="margin-right: auto;" @click="navigateTo('/index')" />
            <el-button color="#ff6900" class="publish_btn" @click="edit">写文章</el-button>
            <el-link v-if="!isLogin" :underline="false" class="login_btn" @click="changeLoginState(true)">登录</el-link>
            <template v-else>
                <el-badge :is-dot="indexUserInfo.msgCount > 0" class="bell" @click="navigateTo('/message')">
                    <el-icon :size="24"><Bell /></el-icon>
                </el-badge>
                <el-dropdown trigger="click" placement="bottom">
                    <div class="header">
                        <el-avatar :size="40" :src="indexUserInfo.photo" />
                        <el-icon :size="20" color="#fff"><CaretBottom /></el-icon>
                    </div>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="navigateTo('/user')">个人主页</el-dropdown-item>
                            <el-dropdown-item @click="logout">登出</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </template>
            <LoginDialog :success="loginSuccess" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.hd_ext {
    width: 100%;
    min-width: 1200px;
    height: fit-content;
    cursor: pointer;
    background-color: rgba(36, 41, 47, 1);

    .hd_container {
        width: 1200px;
        height: 60px;
        padding: 8px 0;
        margin: auto;
        display: flex; 
        align-items: center;
        box-sizing: border-box;

        .publish_btn {
            color: #fff;
            border-radius: 3px;
            margin-right: 30px;
        }
        .publish_btn:hover {
            color: #fff;
        }

        .login_btn {
            color: #fff;
            font-size: 18px;
            font-weight: 500;
            justify-self: end;
        }
        .login_btn:hover {
            color: #ff6900;
        }

        .bell {
            display: flex; 
            justify-content: center;
            margin-right: 30px;

            i {
                color: #fff;
                cursor: pointer;
            }
            i:hover {
                color: #ff6900;
            }
        }

        .header {
            cursor: pointer;
            display: flex;
            align-content: center;
            
            i {
                cursor: pointer;
                align-self: center;
            }
        }
    }
}
</style>