import { create } from 'zustand';
import type { NewsContextType } from '../Interfaces/News';
import { getAllNews, getNewsById } from '../services/ServicesNews';

export const useNewsStore = create<NewsContextType>((set) => ({
    news: [],
    fetchAllNews: async () => {
        try{
            const allNews = await getAllNews();
            set({ news: allNews.data });
        }
        catch(error){
            console.error('Error fetching all news:', error);
        }
    },
    fetchNewsById: async (id: number) => {
        try{
            const newsItem = await getNewsById(id);
            return newsItem;
        }
        catch(error){
            console.error('Error fetching news by ID:', error);
            return null;
        }
    }
}))