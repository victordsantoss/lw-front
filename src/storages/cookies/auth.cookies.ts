import { setCookie, getCookie, deleteCookie } from 'cookies-next';

export const AuthCookie = {
  name: 'AUTH_TOKEN',
  set(token: string, days = 30) {
    setCookie(this.name, token, {
      maxAge: days * 24 * 60 * 60,
    });
  },

  get(): string | null {
    const value = getCookie(this.name);
    return typeof value === 'string' ? value : null;
  },

  remove() {
    deleteCookie(this.name);
  },
};
