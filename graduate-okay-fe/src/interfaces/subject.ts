export interface ISubjectData {
  totalCount: number;
  maxPageCount: number;
  subjectList: ISubject[];
}

export interface ISubject {
  subjectId: number;
  name: string;
  subName: string;
  isRequired: boolean;
  credit: number;
  kyModelType: string;
  kyCoreType: string;
  kyCount: number;
}

export interface ISubjectDetail extends ISubject {
  reviewSummary: IReviewSummary[];
}

export interface IReviewSummary {
  totalCount: number;
  avgStarScore: number;
  reviewIdList: number[];
}
