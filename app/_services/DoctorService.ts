import {
  and,
  endAt,
  getFirestore,
  limit,
  orderBy,
  query,
  startAt,
  where,
} from 'firebase/firestore';
import { getDocs, collection } from 'firebase/firestore';
import initFirebase from '../_services/InitService';

initFirebase();

const db = getFirestore();
const collectionName = 'doctors';

const getDoctor = async (id: number) => {
  const collection_ref = collection(db, collectionName);
  const q = query(collection_ref, where('id', '==', id));
  const doctors = await getDocs(q);

  const res = Array();

  doctors.forEach((d) => {
    res.push({
      ...d.data(),
    });
  });

  return res;
};

const findByName = async (searchValue: string) => {
  const collection_ref = collection(db, collectionName);
  const q = query(
    collection_ref,
    where('fullname', '>=', searchValue),
    where('fullname', '<=', searchValue + '\uf8ff')
  );
  const doctors = await getDocs(q);

  const res = Array();

  doctors.forEach((d) => {
    res.push({
      ...d.data(),
    });
  });

  return res;
};

const getAll = async (name: string) => {
  const doctors = await getDocs(collection(db, collectionName));

  const res = Array();

  doctors.forEach((d) => {
    res.push({
      ...d.data(),
    });
  });

  return res;
};

const getRandom5Doctor = async () => {
  const collection_ref = collection(db, collectionName);
  const q = query(collection_ref, limit(5));
  const doctors = await getDocs(q);

  const res = Array();

  doctors.forEach((d) => {
    res.push({
      ...d.data(),
    });
  });

  return res;
};

export default { getAll, findByName, getDoctor, getRandom5Doctor };
