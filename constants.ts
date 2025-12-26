
import { Post, SiteSettings, AdConfig } from './types';

export const INITIAL_SETTINGS: SiteSettings = {
  title: 'عبو ويب - Abdou Web',
  description: 'مدونتك المفضلة لأخبار المغرب والتقنية وتطوير الذات.',
  logo: 'عبو ويب',
  adsenseId: 'ca-pub-0000000000000000',
  footerText: '© 2024 عبو ويب. جميع الحقوق محفوظة.',
  adminPassword: 'admin', // Default password for initial setup
};

export const INITIAL_POSTS: Post[] = [
  {
    id: '1',
    title: 'أهم التحديثات التقنية في عام 2024',
    slug: 'tech-updates-2024',
    content: 'هذا مقال تجريبي يتحدث عن التكنولوجيا والذكاء الاصطناعي...',
    excerpt: 'اكتشف آخر ما وصل إليه العالم في مجال التكنولوجيا خلال هذا العام.',
    category: 'التقنية',
    imageUrl: 'https://picsum.photos/seed/tech/800/400',
    date: new Date().toLocaleDateString('ar-MA'),
    author: 'عبدالرحمن',
    isPublished: true,
  },
  {
    id: '2',
    title: 'كيف تبدأ في الربح من الأفلييت؟',
    slug: 'affiliate-marketing-start',
    content: 'التسويق بالعمولة هو وسيلة رائعة لبدء عمل تجاري عبر الإنترنت...',
    excerpt: 'دليل شامل للمبتدئين حول كيفية البدء في مجال الأفلييت والربح منه.',
    category: 'الأفلييت',
    imageUrl: 'https://picsum.photos/seed/aff/800/400',
    date: new Date().toLocaleDateString('ar-MA'),
    author: 'عبدالرحمن',
    isPublished: true,
    affiliateLink: 'https://example.com/join-affiliate'
  }
];

export const CATEGORIES: string[] = ['أخبار المغرب', 'التقنية', 'تطوير الذات', 'تقييم المنتجات', 'الأفلييت'];
