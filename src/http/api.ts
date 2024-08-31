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
}

export const userApi = new UserApi();