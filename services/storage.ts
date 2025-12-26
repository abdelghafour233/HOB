
import { Post, SiteSettings } from '../types';
import { INITIAL_POSTS, INITIAL_SETTINGS } from '../constants';

// مفاتيح جديدة كلياً لضمان عدم تداخل البيانات القديمة
const KEYS = {
  POSTS: 'abdou_v3_posts',
  SETTINGS: 'abdou_v3_settings',
  AUTH: 'abdou_v3_auth'
};

export const storage = {
  getPosts: (): Post[] => {
    const data = localStorage.getItem(KEYS.POSTS);
    return data ? JSON.parse(data) : INITIAL_POSTS;
  },
  savePosts: (posts: Post[]) => {
    localStorage.setItem(KEYS.POSTS, JSON.stringify(posts));
  },
  getSettings: (): SiteSettings => {
    const data = localStorage.getItem(KEYS.SETTINGS);
    return data ? JSON.parse(data) : INITIAL_SETTINGS;
  },
  saveSettings: (settings: SiteSettings) => {
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
  },
  login: (password: string): boolean => {
    const settings = storage.getSettings();
    if (password === (settings.adminPassword || 'admin')) {
      sessionStorage.setItem(KEYS.AUTH, 'true');
      return true;
    }
    return false;
  },
  isLoggedIn: (): boolean => {
    return sessionStorage.getItem(KEYS.AUTH) === 'true';
  },
  logout: () => {
    sessionStorage.removeItem(KEYS.AUTH);
    window.location.reload();
  },
  hardReset: () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = '/';
  }
};
