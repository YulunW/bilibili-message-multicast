export enum ViewerType {
  总督 = 1,
  提督 = 2,
  舰长 = 3,
  无 = 4,
}

export type ViewerInfoFetched = {
  guard_level: ViewerType;
  face: string;
  username: string;
  uid: number;
  rank: number;
};

export type ViewerInfo = ViewerInfoFetched & {
  previous_usernames: string[];
};
