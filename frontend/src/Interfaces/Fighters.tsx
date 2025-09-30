export interface FightersData {
    id: number;
    name_fighter: string;
    nickname_fighter: string;
    age_fighter: number;
    weight_fighter: number;
    height_fighter: number;
    stance_fighter: string;
    country_fighter: string;
    image_fighter: string;
}

export interface FightersContextType {
    fighters: FightersData[];
    fightersFavoriteByUser: FightersData[];
    fetchAllFighters: () => Promise<void>;
    fetchFighterById: (id: number) => Promise<FightersData>;
    fetchFightersFavoritebyUserId: (userId: number | undefined) => Promise<void>;
}