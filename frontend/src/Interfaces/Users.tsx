export interface UserData {
    id: number;
    name_user: string;
    username_user: string;
    email_user: string;
    password_user: string;
    createdAt: string;
}

export interface LoginData {
    email_user: string;
    password_user: string;
}

export interface UsersContextType {
    user: UserData | null;
    handleLogout: () => Promise<void>;
}