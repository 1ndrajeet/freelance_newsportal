export interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  date: string;
  imageUrl?: string;
}

export interface AdminCredentials {
  username: string;
  password: string;
} 