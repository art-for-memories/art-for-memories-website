export interface CustomStory {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  storyType: string;
  title: string;
  author: string;
  date: string;
  file?: string;
  image?: string;
  kinyarwandaContent: string;
  englishContent: string;
  frenchContent: string;
  status?: 'pending' | 'approved' | 'rejected';
  publishedStoryId?: string | null;
  createdAt?: string;
}
