export type AppCategory =
  | 'study'
  | 'communication'
  | 'social'
  | 'payments'
  | 'entertainment'
  | 'productivity'
  | 'ai';

export interface AppItem {
  id: string;
  name: string;
  category: AppCategory;
  description: string;
  url: string;
  iconName: string;
  badge?: string;
  color: {
    bg: string;
    text: string;
    border: string;
    glow: string;
  };
  tags: string[];
  features?: string[];
  popular?: boolean;
}

export interface StudentUser {
  fullName: string;
  email: string;
  college: string;
  course: string;
  yearOfStudy: string;
  avatar: string;
  bio?: string;
  joinDate: string;
}

export interface RecentlyUsedItem {
  appId: string;
  timestamp: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  category: 'system' | 'academic' | 'security';
}
