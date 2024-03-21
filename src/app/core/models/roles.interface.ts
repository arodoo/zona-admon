export interface Roles {
    [key: string]: boolean | undefined;
    ADMIN?: boolean;
    EDITOR?: boolean;
    VISUALIZER?: boolean;
}