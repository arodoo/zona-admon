export interface Register {
    id: string;
    active: boolean;
    title: string;
    description: string;
    date: string;
    latitud: string;
    longitud: string;
    defussions?: number;
    hurts?: number;
    images: string;
    user_id: string;
}