import {
  getStorage,
  FirebaseStorage,
  ref,
  getBytes,
  getDownloadURL,
} from 'firebase/storage';
import { getApp } from 'firebase/app';
import initFirebase from '../_services/InitService';
import TrieSearch from 'trie-search';

function useHocaSearch() {
  const search = async (keyword: string) => {
    if (!keyword && keyword.length < 3) {
      return null;
    }

    initFirebase();

    const storage = getStorage(getApp());
    const storageRef = ref(
      storage,
      `search/${keyword.slice(0, 3).toUpperCase()}.json`
    );

    try {
      const byteData = await getBytes(storageRef);

      const textDecoder = new TextDecoder('utf-8');
      const jsonString = textDecoder.decode(byteData);
      const jsonData = JSON.parse(jsonString);

      const load_trie: TrieSearch<String> = new TrieSearch<String>(null, {
        splitOnRegEx: false,
        ignoreCase: true,
        cache: true,
      });

      load_trie.root = jsonData;

      return load_trie.search(keyword);
    } catch (error) {
      console.error('Error fetching JSON file:', error);
      return null;
    }
  };
  return search;
}

export default useHocaSearch;
