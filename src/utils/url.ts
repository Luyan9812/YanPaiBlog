import { baseURL } from '@/utils/constant';

export function fullUrl(url: string) {
    return `${baseURL}${url.startsWith("/") ? "" : "/"}${url}`;
}

export function rewriteArticleContent(content: string) {
    // 这边的 pi 表示第 i 组，原串不算一个组
    return content.replace(/!\[\]\((.*?)\)|(<img.*?src=")(.*?)(".*?>)/g, (match, p1, p2, p3, p4) => {
        const url = fullUrl(p1 || p3);
        if (p1) {
            // Markdown图片链接
            return `![](${url})`;
        } else if (p3) {
            // HTML图片标签
            return `${p2}${url}${p4}`;
        }
    });
}