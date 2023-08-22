export interface CommentType {
  comment: string;
  date: string; // should be in this format "dd/mm/yyyy"
  commenter: string;
  course: string;
  star: number;
  like: number;
  dislike: number;
  again: boolean | null;
  attendance: boolean | null;
  grade: string | null;
  online: boolean | null;
  flag: boolean;
  visiable: boolean;
  survey_id: string;
}
