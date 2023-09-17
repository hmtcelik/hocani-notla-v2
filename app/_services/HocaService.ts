import {
  doc,
  getFirestore,
  limit,
  query,
  getDocs,
  collection,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
} from 'firebase/firestore';
import initFirebase from './InitService';
import { CommentType } from '../_models/Comment';
import { HocaType } from '../_models/Hoca';
import Config from './Config';

initFirebase();

const db = getFirestore();
const collectionName = Config.collections.hoca;

const getHoca = async (uid: string) => {
  const collection_ref = collection(db, collectionName);
  const doc_ref = doc(collection_ref, uid); // Reference to the document using its UID
  const docSnapshot = await getDoc(doc_ref);

  if (docSnapshot.exists()) {
    return { id: docSnapshot.id, ...docSnapshot.data() };
  }

  return null;
};

const getRandom5Hoca = async () => {
  const collection_ref = collection(db, collectionName);
  const q = query(collection_ref, limit(10));
  const hocas = await getDocs(q);

  const res = Array();

  hocas.forEach((d) => {
    res.push({
      id: d.id,
      ...d.data(),
    });
  });

  return res;
};

const createComment = async (hocaUid: string, newComment: CommentType) => {
  const doc_ref = doc(collection(db, collectionName), hocaUid);

  await updateDoc(doc_ref, {
    comments: arrayUnion(newComment),
  });
};

const updateHocaComments = async (
  hocaUid: string,
  newComments: CommentType[]
) => {
  const doc_ref = doc(collection(db, collectionName), hocaUid);

  await updateDoc(doc_ref, {
    comments: newComments,
  });
};

export default { getHoca, getRandom5Hoca, createComment, updateHocaComments };
