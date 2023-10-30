export interface INotice {
  totalCount: number;
  maxPageCount: number;
  noticeList: INoticeDetail[];
}

export interface INoticeDetail {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}
