export interface CommentType {
  id?: string;
  rate: number;
  comment: string;
  date: string; // should be in this format "dd/mm/yyyy"
  commenter: string;
  course: string;
  likes: string[];
  dislikes: string[];
  again: boolean | null;
  attandance: boolean | null;
  grade: string | null;
  online: string | null;

  flag: boolean; // default false
  visible: boolean; // default true
  survey_id: string; // default ''
}
