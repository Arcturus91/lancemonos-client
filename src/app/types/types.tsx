export type HitSearch = {
  keyPhrases: string;
  objectID: string;
  videoTitle: string;
};

export type SearchResponse = {
  hit: HitSearch;
  sendEvent: any;
};

export type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  checkAuth: () => Promise<void>;
};
