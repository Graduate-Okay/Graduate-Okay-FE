export interface GraduateResponse {
  status: string;
  code: number;
  data: IGraduate[];
}

export interface IGraduate {
  isGraduateOk: boolean;
  totalCredit: number;
  kyCredit: number;
  majorCredit: number;
  doubleMajorCredit: number;
  nonSubject: number;
  mileage: number;
  failure: string;
}
