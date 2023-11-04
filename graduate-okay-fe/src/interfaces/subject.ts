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
  kyModalType: string;
  kyCoreType: string;
  kyCount: number;
}
