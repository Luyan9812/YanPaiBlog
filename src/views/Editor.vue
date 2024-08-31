<script setup lang="ts">
import { ref, reactive } from 'vue';
import 'md-editor-v3/lib/style.css';
import emitter from "@/utils/emitter";
import { MdEditor } from 'md-editor-v3';
import Dialog from "@/components/Dialog.vue";


const text = ref('### Hello Editor!');
const categories = reactive([
    {id: 1, categoryName: "人工智能"},
    {id: 2, categoryName: "IOS"},
    {id: 3, categoryName: "代码人生"},
    {id: 4, categoryName: "开发工具"},
    {id: 5, categoryName: "前端"},
    {id: 6, categoryName: "后端"},
    {id: 7, categoryName: "阅读"},
    {id: 8, categoryName: "大数据"},
    {id: 9, categoryName: "Android"},
]);
const tags = reactive([
    {id: 1, tagName: "Java"},
    {id: 2, tagName: "KafKa"},
    {id: 3, tagName: "Json"},
    {id: 4, tagName: "Vue"},
    {id: 5, tagName: "MySQL"},
    {id: 6, tagName: "MongoDB"},
    {id: 7, tagName: "Hadoop"},
    {id: 8, tagName: "Spark"},
    {id: 9, tagName: "Git"},
]);
const form = reactive({
    category: 0,
    tags: [],
    picture: "",
    summary: ""
});
const textarea = ref('')
const hideAdd = ref(false)
const handleRemove = (file: any) => {
  hideAdd.value = false;
}
const onSuccess = (response: any, uploadFile: any) => { //上传成功
    hideAdd.value = true;
}

const onError = (error: any) => {
    console.log(error)
}

function showSaveDialog() {
    emitter.emit("changeDialogState",  {name: "Editor", state: true});
}
</script>

<template>
    <div class="editor_container">
        <div class="title">
            <input type="text" />
            <el-button type="primary" @click="showSaveDialog">保存</el-button>
        </div>
        <MdEditor 
            :toolbarsExclude="['github']"
            v-model="text"/>
        <Dialog name="Editor" title="发布文章" width="628">
            <el-form :model="form" label-width="auto">
                <el-form-item label="分类">
                    <el-radio-group v-model="form.category">
                        <el-radio
                            v-for="category in categories" 
                            :key="category.id" 
                            :value="category.id" size="small" border>
                            {{ category.categoryName }}
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="添加标签">
                    <el-select-v2
                        v-model="form.tags"
                        filterable
                        :options="tags"
                        placeholder="请选择你需要的标签，最多三个"
                        multiple
                        :multiple-limit="3"
                        style="width: 430px;"
                        :props="{label: 'tagName', value: 'id'}"
                    />
                </el-form-item>
                <el-form-item label="文章封面">
                    <el-upload 
                    action="#" 
                    list-type="picture-card" 
                    :auto-upload="false"
                    :on-error="onError"
                    :on-success="onSuccess"
                    :class="{'hideAdd': hideAdd}">
                        <el-icon><Plus /></el-icon>
                        <template #file="{ file }">
                        <div>
                            <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                            <span class="el-upload-list__item-actions">
                                <span
                                    class="el-upload-list__item-delete"
                                    @click="handleRemove(file)">
                                    <el-icon><Delete /></el-icon>
                                </span>
                            </span>
                        </div>
                        </template>
                    </el-upload>
                </el-form-item>
                <el-form-item label="文章摘要">
                    <el-input
                        v-model="textarea"
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
                <el-button type="primary">发布</el-button>
            </div>
        </Dialog>
    </div>
</template>

<style scoped lang="scss">
.editor_container {
    .title {
        display: flex;
        align-items: center;
        padding: 0 10px;
        box-sizing: border-box;

        input {
            width: 500px;
            height: 40px;
            font-size: 25px;
            font-weight: 500;
            outline: none;
            border: none;
            margin-right: auto;
        }
    }
    
    .el-form {
        .el-radio {
            width: 100px;
            height: 32px;
            margin: 0 10px 8px 0;
        }
    }

    .hideAdd {
        ::v-deep .el-upload--picture-card{
            display: none;
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