export interface ISubjectList {
  totalCount: number;
  maxPageCount: number;
  subjectList: SubjectList[];
}

export interface SubjectList {
  subjectId: number;
  name: string;
  subName: string;
  isRequired: boolean;
  credit: number;
  kyCount: number;
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
  reviewCount: number;
  avgStarScore: number;
  reviewDataList: ISubjectReviewDataList[];
}

export interface ISubjectReviewDataList {
  reviewId: number;
  title: string;
  username: string;
  starScore: number;
}
