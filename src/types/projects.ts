export interface Project {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  role: string;
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}