import type { PartialWithFieldValue } from "firebase/firestore";
import { addDoc, deleteDoc } from "firebase/firestore";
import { collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";

import { db, getConverter } from "@/lib/firebase";
import type { Book } from "@/models/book";
import { bookSchema } from "@/models/book";

const bookConverter = getConverter<Book>(bookSchema.parse);

const getBookDocRef = (id: string) => {
  return doc(db, "books", id).withConverter(bookConverter);
};

const getBookColRef = () => {
  return collection(db, "books").withConverter(bookConverter);
};

export const addBook = async (book: Book) => {
  await addDoc(getBookColRef(), book);
};

export const getBook = async (id: string) => {
  const doc = await getDoc<Book>(getBookDocRef(id));
  return doc.data();
};

export const getBooks = async () => {
  const snapshot = await getDocs<Book>(getBookColRef());
  return snapshot.docs.map((doc) => doc.data());
};

export const updateBook = async (id: string, book: PartialWithFieldValue<Book>) => {
  await updateDoc<Book>(getBookDocRef(id), book);
};

export const deleteBook = async (id: string) => {
  await deleteDoc(getBookDocRef(id));
};
