import { tokenStr } from '@/utils/constant';

class TokenMgr {
    hasToken() {
        return this.getToken() != null;
    }

    getToken() {
        return localStorage.getItem(tokenStr);
    }

    setToken(token: string) {
        localStorage.setItem(tokenStr, token);
    }

    removeToken() {
        localStorage.removeItem(tokenStr);
    }
}

export const tokenMgr = new TokenMgr();