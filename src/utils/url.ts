import { baseURL } from '@/utils/constant';

export function fullUrl(url: string) {
    return `${baseURL}${url.startsWith("/") ? "" : "/"}${url}`;
}