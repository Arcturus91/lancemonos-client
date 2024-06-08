export type HitSearch = {
  keyPhrases: string;
  objectID: string;
  videoTitle: string;
  __position: number;
};

export type SearchResponse = {
  hit: HitSearch;
  sendEvent: any;
};
