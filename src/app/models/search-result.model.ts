export interface SearchResult {
    id: string;
    kind: string;
    title: string;
    description: string;
    thumbnailUrl: string;
}

export interface AllResults {
    availableResults: number;
    searchResults: SearchResult[];
}