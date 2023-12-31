export type NaverBooksType = {
  lastBuildDate: Date;
  total: number;
  start: number;
  display: number;
  items: BookType[];
};

export type BookType = {
  title: string;
  link: string;
  image: string;
  author: string;
  discount: string;
  publisher: string;
  isbn: string;
  description: string;
};

export type CommentType = {
  id: number;
  comment: string;
  record_id: number;
};

export type RecordType = {
  id: number;
  total_page: number;
  current_page: number;
} & BookType;

export type AddRecordType = Omit<RecordType, "id">;
