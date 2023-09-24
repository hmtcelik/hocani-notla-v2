import { CommentType } from './Comment';

export interface HocaType {
  id: string;
  title: string;
  name: string;
  university: string;
  faculty: string;
  department: string;
  comments: CommentType[];
  userId: string;
  searchIdx: string;
}
