export interface INoticeList {
  id: number;
  title: string;
  content: string;
}

export interface INotice {
  totalCount: number;
  maxPageCount: number;
  noticeList: INoticeList[];
}

export interface INoticeDetail {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}
