export interface IReview {
  id: number;
  author: string;
  subject: string;
  title: string;
  content: string;
  starScore: number;
}

export interface IReviewData {
  status: string;
  code: number;
  data: IReview[];
}
