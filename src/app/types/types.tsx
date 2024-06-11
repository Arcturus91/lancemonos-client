export type HitSearch = {
  keyPhrases: string;
  objectID: string;
  videoTitle: string;
};

export type SearchResponse = {
  hit: HitSearch;
  sendEvent: any;
};
