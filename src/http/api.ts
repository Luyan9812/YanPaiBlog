import request from '@/http/request';

class UserApi {
    async login(params: object) {
        return request({
            url: '/user/login',
            method: 'POST',
            data: params
        });
    }

    async getIndexUserInfo() {
        return request({
            url: "/user/indexUserInfo",
            method: "GET"
        });
    }

    async getUserInfo() {
        return request({
            url: "/user/userInfo",
            method: "GET"
        });
    }

    async getAchievement() {
        return request({
            url: "/user/achievement",
            method: "GET"
        });
    }

    async getAuthorInfo(authorId: number) {
        return request({
            url: `/user/author`,
            method: "GET",
            params: {authorId}
        });
    }

    async changeFollowState(authorId: number, followState: boolean) {
        return request({
            url: `/user/changeFollowState`,
            method: "GET",
            params: {authorId, followState}
        });
    }

    async getFansList() {
        return request({
            url: "/user/fansList",
            method: "GET"
        });
    }

    async getFollowList() {
        return request({
            url: "/user/followList",
            method: "GET"
        });
    }

    async updateUserInfo(params: object) {
        return request({
            url: "/user/update",
            method: "PUT",
            data: params
        });
    }
}

class ArticleApi {
    async getCategories() {
        return request({
            url: "/category/all",
            method: "GET"
        });
    }

    async getCategoriesHavingArticles() {
        return request({
            url: "/category/haveArticles",
            method: "GET"
        });
    }

    async getTagsByCategory(categoryId: number) {
        return request({
            url: "/tag/getTagsByCategory",
            method: "GET",
            params: {categoryId}
        });
    }

    async uploadFile(type: string, data: FormData) {
        return request({
            url: `/article/upload/${type}`,
            method: "POST",
            data: data,
            headers: {"Content-Type": "multipart/form-data"}
        });
    }

    async deleteFile(path: string) {
        return request({
            url: "/article/upload/delete",
            method: "GET",
            params: {path}
        });
    }

    async save(params: object) {
        return request({
            url: "/article/save",
            method: "POST",
            data: params
        });
    }

    async list(categoryId: number, currentPage: number) {
        return request({
            url: "/article/list",
            method: "GET",
            params: {categoryId, currentPage}
        });
    }

    async getPublishedArticles(currentPage: number) {
        return request({
            url: "/article/published",
            method: "GET",
            params: {currentPage}
        });
    }

    async getReadArticles(currentPage: number) {
        return request({
            url: "/article/foot",
            method: "GET",
            params: {currentPage}
        });
    }

    async getCollectionArticles(currentPage: number) {
        return request({
            url: "/article/collection",
            method: "GET",
            params: {currentPage}
        });
    }

    async getArticleDetails(articleId: number) {
        return request({
            url: `/article/details/${articleId}`,
            method: "GET"
        });
    }

    async changePraiseState(articleId: number, praiseState: boolean) {
        return request({
            url: "/article/changePraiseState",
            method: "GET",
            params: {articleId, praiseState}
        });
    }

    async changeCollectionState(articleId: number, collectionState: boolean) {
        return request({
            url: "/article/changeCollectionState",
            method: "GET",
            params: {articleId, collectionState}
        });
    }

    async deleteArticle(articleId: number) {
        return request({
            url: `/article/${articleId}`,
            method: "DELETE"
        });
    }

    async deleteFiles(fileNames: Array<string>) {
        return request({
            url: `/article/upload/deleteFiles`,
            method: "DELETE",
            data: fileNames
        });
    }

    async getHotList() {
        return request({
            url: "/article/hot",
            method: "GET"
        });
    }

    async getArticlesByTag(tagId: number, currentPage: number) {
        return request({
            url: "/article/byTag",
            method: "GET",
            params: {tagId, currentPage}
        });
    }

    async search(title: string, currentPage: number) {
        return request({
            url: "/article/search",
            method: "POST",
            params: {title, currentPage}
        });
    }

    async updateArticle(article: object) {
        return request({
            url: "/article/update",
            method: "PUT",
            data: article
        });
    }
}

export const userApi = new UserApi();
export const articleApi = new ArticleApi();