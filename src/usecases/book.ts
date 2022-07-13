import useSWR, { mutate } from "swr";

import { getCacheKeyGenerator } from "@/lib/swr";
import type { Book } from "@/models/book";
import { addBook, deleteBook, getBook, getBooks, updateBook } from "@/repositories/book";

const bookCacheKey = getCacheKeyGenerator("book")();

export const useBooks = () => {
  return useSWR<Book[]>(bookCacheKey, getBooks);
};

export const useBook = (id: string) => {
  return useSWR<Book | undefined>(bookCacheKey, () => getBook(id));
};

export const useAddBook = async (book: Book) => {
  await addBook(book);
  await mutate(
    bookCacheKey,
    () => (prev?: Book[]) => {
      if (!prev) return;
      return [...prev, book];
    },
    false
  );
};

export const useUpdateBook = async (id: string, book: Book) => {
  await updateBook(id, book);
  await mutate(
    bookCacheKey,
    () => (prev?: Book[]) => {
      if (!prev) return;
      return prev.map((prevBook) => (prevBook.id === id ? book : prevBook));
    },
    false
  );
};

export const useDeleteBook = async (id: string) => {
  await deleteBook(id);
  await mutate(
    bookCacheKey,
    () => (prev?: Book[]) => {
      if (!prev) return;
      return prev.filter((prevBook) => prevBook.id !== id);
    },
    false
  );
};
