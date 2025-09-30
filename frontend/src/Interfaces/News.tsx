export interface NewsData {
    id: number;
    title_notice: string;
    content_notice: string;
    image_notice: string;
    video_notice: string;
    publishedAt: string;
}

export interface NewsContextType {
    news: NewsData[] | null;
    fetchAllNews: () => Promise<void>;
    fetchNewsById: (id: number) => Promise<NewsData | null>;
}