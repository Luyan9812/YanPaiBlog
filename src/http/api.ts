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
}

class ArticleApi {
    async getCategories() {
        return request({
            url: "/article/categories",
            method: "GET"
        });
    }

    async getTagsByCategory(categoryId: number) {
        return request({
            url: "/article/tags",
            method: "GET",
            params: {categoryId}
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
}

export const userApi = new UserApi();
export const articleApi = new ArticleApi();