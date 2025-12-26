
import { Post, SiteSettings, AdConfig } from '../types';
import { INITIAL_POSTS, INITIAL_SETTINGS } from '../constants';

const KEYS = {
  POSTS: 'abdou_web_posts',
  SETTINGS: 'abdou_web_settings',
  ADS: 'abdou_web_ads',
  AUTH: 'abdou_web_auth',
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
    const isValid = password === settings.adminPassword;
    if (isValid) {
      sessionStorage.setItem(KEYS.AUTH, 'true');
    }
    return isValid;
  },
  isLoggedIn: (): boolean => {
    return sessionStorage.getItem(KEYS.AUTH) === 'true';
  },
  logout: () => {
    sessionStorage.removeItem(KEYS.AUTH);
  }
};
