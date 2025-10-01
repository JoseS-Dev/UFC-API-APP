export interface LegendData {
    id: number;
    name_legend: string;
    nickname_legend: string;
    image_legend: string;
    weight_legend: string;
    height_legend: string;
    stance_legend: string;
    country_legend: string;
    streak_legend: string;
    title_win_legend: number;
    trophys_legend: number;
    description_legend: string;
    date_debut_legend: string;
    date_retirement_legend: string;
    period_active_legend: string;
    name_category: string;
}

export interface LegendsContextType {
    Legends: LegendData[];
    fetchAllLegends: () => Promise<void>;
    fetchLegendById: (id: number) => Promise<LegendData | null>;
}