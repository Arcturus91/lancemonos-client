export type HitSearch = {
  keyPhrases: string;
  objectID: string;
  videoTitle: string;
};

export type SearchResponse = {
  hit: HitSearch;
  sendEvent: any;
};

export type VideoContent = {
  videoUrl: string;
  videoKey: string;
  videoName: string;
  videoSection: string;
};

export type ContentListType = { videoName: string; videoSection: string };
