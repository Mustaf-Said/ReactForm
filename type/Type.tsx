interface Subject {
  english: boolean;
  svesnka: boolean;
  Arabisk: boolean;
}

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
  gender: string;
  url: string;
  subject: Subject;
  resum: string | null;
  selectOption: string;
  text: string;
}