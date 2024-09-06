<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import 'md-editor-v3/lib/style.css';
import emitter from "@/utils/emitter";
import { MdEditor } from 'md-editor-v3';
import { useRouter } from 'vue-router';
import { FormRules, UploadProps, ElMessage, UploadRawFile, genFileId } from 'element-plus';

import { articleApi } from "@/http/api";
import Dialog from "@/components/Dialog.vue";
import { fullUrl } from "@/utils/url";
import { tokenMgr } from "@/utils/token";
import { baseURL } from "@/utils/constant";


const article = reactive({
    title: "测试文章",
    picture: "",
    summary: "",
    categoryId: 0,
    tags: [],
    content: "",
});
const upload = ref();
const formRef = ref();
const router = useRouter();
const tags = reactive([]);
const categories = reactive([]);
const uploadPath = `${baseURL}/article/upload/covers`;
const rules = reactive<FormRules>({
    categoryId: [{required: true, message: '请选择类别', trigger: 'change'}],
    tags: [{required: true, message: '请选择标签'}],
    summary: [{required: true, message: '请输入文章摘要'}]
});


const getCategories = async () => {
    const data = await articleApi.getCategories();
    categories.length = 0;
    data.map((item) => {
        categories.push(item);
    });
}
const getTagsByCategory = async (categoryId: number) => {
    const data = await articleApi.getTagsByCategory(categoryId);
    data.map((item) => {
        tags.push(item);
    });
}
const handleCategoryChange = (categoryId: number) => {
    tags.length = 0;
    article.tags.length == 0;
    getTagsByCategory(categoryId);
}
const submitForm = async () => {
    if (!formRef.value) return;
    await formRef.value.validate(async (valid) => {
        if (!valid) return;
        const data = await articleApi.save(article);
        if (data) {
            router.push("/");
        }
    });
}
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.size / 1024 / 1024 > 5) {
        ElMessage.error('文件大小不能超过 5MB！');
        return false;
    }
    return true;
}
const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
    article.picture = response.data.url;
}
const handleExceed: UploadProps['onExceed'] = (files) => {
    articleApi.deleteFile(article.picture);
    upload.value!.clearFiles();
    const file = files[0] as UploadRawFile;
    file.uid = genFileId();
    upload.value!.handleStart(file);
    upload.value!.submit();
}
const changeSaveDialogState = (state: boolean) => {
    emitter.emit("changeDialogState",  {name: "Editor", state: state});
}
const onUploadImg = async (files: FileList, callback: (urls: string[]) => void) => {
    const res = await Promise.all(
        Array.from(files).map((file) => {
            return new Promise((rev, rej) => {
                const form = new FormData();
                form.append('file', file);
                articleApi.uploadFile("covers", form).then((res) => {
                    rev(res);
                });
            });
        })
    );
    callback(res.map((item: any) => fullUrl(item.url)));
}


onMounted(async () => {
    getCategories();
});
</script>

<template>
    <div class="editor_container">
        <div class="title">
            <input v-model="article.title" type="text" placeholder="输入文章标题" />
            <el-button type="primary" @click="changeSaveDialogState(true)" :disabled="!article.title">保存</el-button>
        </div>
        <MdEditor 
            class="md"
            :toolbarsExclude="['github', 'mermaid', 'save', 'pageFullscreen', 'fullscreen']"
            @on-upload-img="onUploadImg"
            v-model="article.content"/>
        <Dialog name="Editor" title="发布文章" width="628">
            <el-form :model="article" label-width="auto" :rules="rules" ref="formRef">
                <el-form-item label="分类" prop="categoryId">
                    <el-radio-group v-model="article.categoryId" @change="handleCategoryChange">
                        <el-radio
                            v-for="category in categories"
                            :key="category.id" 
                            :value="category.id" size="small" border>
                            {{ category.categoryName }}
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="添加标签" prop="tags">
                    <el-select-v2
                        v-model="article.tags"
                        filterable
                        :options="tags"
                        placeholder="请选择你需要的标签，最多三个"
                        multiple
                        :multiple-limit="3"
                        style="width: 430px;"
                        :props="{label: 'tagName', value: 'id'}"
                    />
                </el-form-item>
                <el-form-item label="文章封面" prop="picture">
                    <el-upload
                        ref="upload"
                        class="avatar-uploader"
                        :action="uploadPath"
                        :headers="{token: tokenMgr.getToken()}"
                        :show-file-list="false"
                        accept="image/*"
                        :limit="1"
                        :on-exceed="handleExceed"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="article.picture" :src="fullUrl(article.picture)" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                    </el-upload>
                </el-form-item>
                <el-form-item label="文章摘要" prop="summary">
                    <el-input
                        v-model="article.summary"
                        maxlength="256"
                        rows="5"
                        style="width: 430px;"
                        placeholder="摘要（必填）：会在推荐、列表等场景外露，帮助读者快速了解内容"
                        show-word-limit
                        type="textarea"/>
                </el-form-item>
            </el-form>
            <el-divider style="margin: 0 0 15px 0;" />
            <div id="publish_wrapper">
                <el-button type="primary" @click="submitForm()">发布</el-button>
            </div>
        </Dialog>
    </div>
</template>

<style scoped lang="scss">
.editor_container {
    .title {
        display: flex;
        align-items: center;
        padding: 0 10px 0 20px;
        box-sizing: border-box;

        input {
            width: 500px;
            height: 40px;
            font-size: 20px;
            font-weight: 500;
            outline: none;
            border: none;
            margin-right: auto;
        }
    }

    .md {
        height: calc(100vh - 150px);
    }
    
    .el-form {
        .el-radio {
            width: 100px;
            height: 32px;
            margin: 0 10px 8px 0;
        }
        .avatar-uploader .avatar {
            width: 230px;
            height: 150px;
            display: block;
        }
        .avatar-uploader {
            border: 1px dashed #dcdfe6;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            transition: .2s;
        }

        .avatar-uploader:hover {
            border-color: #409eff;
        }

        .el-icon.avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 230px;
            height: 150px;
            text-align: center;
        }
    }

    #publish_wrapper {
        display: flex;
        justify-content: flex-end;

        .el-button {
            margin-bottom: 15px;
            
        }
    }
}
</style>