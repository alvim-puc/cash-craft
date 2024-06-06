const cookie = require('cookie')

export class Cookie {
    setCookie(name, value, options = {}) {
        const cookieStr = cookie.serialize(name, value, {
            maxAge: 60 * 60 * 24 * 14, // 2 semanas
            path: '/',
            ...options,
        });
        document.cookie = cookieStr;
    }
    
    unsetCookie(name) {
        document.cookie = cookie.serialize(name, '', {
            maxAge: -1,
            path: '/',
        });
    }
    
    getCookie(name) {
        const cookies = cookie.parse(document.cookie || '');
        return cookies[name];
    }
}