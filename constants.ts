
import { Post, SiteSettings } from './types';

export const INITIAL_SETTINGS: SiteSettings = {
  title: 'ABDO WEB',
  description: 'المنصة الرائدة في أخبار التقنية، تطوير الذات، وأسرار الربح من الإنترنت في المغرب.',
  logo: 'ABDO WEB',
  adsenseId: 'ca-pub-0000000000000000',
  footerText: '© 2024 ABDO WEB. صُنع بشغف للمستقبل.',
  adminPassword: 'admin'
};

export const INITIAL_POSTS: Post[] = [
  {
    id: '1',
    title: 'مستقبل الذكاء الاصطناعي في المغرب 2025',
    slug: 'ai-future-morocco',
    content: 'نشهد اليوم ثورة تقنية كبرى في المملكة المغربية حيث بدأت الشركات في دمج تقنيات الذكاء الاصطناعي...',
    excerpt: 'كيف سيغير الذكاء الاصطناعي المشهد الاقتصادي والتقني في المغرب خلال السنوات القادمة؟',
    category: 'التقنية',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1600',
    date: '24 ماي 2024',
    author: 'عبده',
    isPublished: true
  },
  {
    id: '2',
    title: 'أفضل استراتيجيات الأفلييت للمغاربة',
    slug: 'affiliate-morocco-guide',
    content: 'إذا كنت تبحث عن مصدر دخل إضافي، فإن التسويق بالعمولة يوفر فرصاً مذهلة إذا تم تنفيذه بشكل صحيح...',
    excerpt: 'دليل شامل حول كيفية البدء في مجال الأفلييت من الصفر وتحقيق أول دولار لك.',
    category: 'الأفلييت',
    imageUrl: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=1600',
    date: '23 ماي 2024',
    author: 'عبده',
    isPublished: true,
    affiliateLink: 'https://example.com'
  }
];

export const CATEGORIES = ['أخبار المغرب', 'التقنية', 'تطوير الذات', 'تقييم المنتجات', 'الأفلييت'];
