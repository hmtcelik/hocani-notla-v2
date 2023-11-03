import { CommentType } from './Comment';

export default interface Session {
  user: {
    uid: string;
    email: string;
    comments: CommentType[];
  };
}
