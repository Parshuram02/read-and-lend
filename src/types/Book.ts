export type Book = {
  id: string;
  title: string;
  author: string;
  isbn: string;
  genre: string;
  available: boolean;
  issuedTo?: string;
  issuedDate?: string;
  returnDate?: string;
  description: string;
  coverImage: string;
};

export type BookIssue = {
  bookId: string;
  userId: string;
  userName: string;
  issueDate: string;
  returnDate: string;
};