import {Post} from "./search-result.model";

export interface User {
    id: number;
    login: string;
    password: string;
    bookmarks?: Post[];
    words?: string[];
}