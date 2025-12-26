
export type Category = 'أخبار المغرب' | 'التقنية' | 'تطوير الذات' | 'تقييم المنتجات' | 'الأفلييت';

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: Category;
  imageUrl: string;
  date: string;
  author: string;
  isPublished: boolean;
  affiliateLink?: string;
}

export interface SiteSettings {
  title: string;
  description: string;
  logo: string;
  adsenseId: string;
  footerText: string;
  adminPassword?: string;
}

export interface AdConfig {
  id: string;
  position: 'header' | 'sidebar' | 'content_middle';
  code: string;
  isActive: boolean;
}
