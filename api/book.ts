import axios from "axios";
import {
  AddRecordType,
  CommentType,
  CommentsType,
  NaverBooksType,
  RecordType,
} from "@/types/bookType";
import { server } from "./common";

export const getSearchBooks = async (
  keyword: string
): Promise<undefined | NaverBooksType> => {
  if (
    !process.env.NEXT_PUBLIC_NAVER_CLIENT_ID ||
    !process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET
  ) {
    return undefined;
  }

  try {
    const res = await axios.get(
      `naver/api/search/book.json?query=${keyword}&display=10&start=1`,
      {
        headers: {
          "X-Naver-Client-Id": process.env.NEXT_PUBLIC_NAVER_CLIENT_ID,
          "X-Naver-Client-Secret": process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET,
        },
      }
    );

    if (res.status === 200) {
      return res.data;
    }

    return undefined;
  } catch (err) {
    return undefined;
  }
};

export const getRecords = async (): Promise<undefined | RecordType[]> => {
  try {
    const res = await server.get("/records");

    if (res.status === 200) {
      return res.data;
    }

    return undefined;
  } catch (err) {
    return undefined;
  }
};

export const getRecord = async (
  id: string
): Promise<undefined | RecordType> => {
  try {
    const res = await server.get(`/records/${id}`);

    if (res.status === 200) {
      return res.data;
    }

    return undefined;
  } catch (err) {
    return undefined;
  }
};

export const postRecord = async (
  form: AddRecordType
): Promise<number | boolean> => {
  try {
    const res = await server.post("/records", form);

    if (res.status === 201) {
      return res.data.id;
    }

    return false;
  } catch (err) {
    return false;
  }
};

export const patchCurrentPage = async (
  id: string,
  current_page: number
): Promise<boolean> => {
  try {
    const res = await server.patch(`/records/${id}`, { current_page });

    if (res.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};

export const getComments = async (
  id: string
): Promise<undefined | CommentType[]> => {
  try {
    const res = await server.get(`/comments/${id}`);

    if (res.status === 200) {
      return res.data;
    } else {
      return undefined;
    }
  } catch (err) {
    return undefined;
  }
};

export const postNewComment = async (form: CommentsType): Promise<boolean> => {
  try {
    const res = await server.post(`/comments`, form);

    if (res.status === 201) {
      return true;
    }

    return false;
  } catch (err) {
    return false;
  }
};

export const postAddComment = async (
  id: string,
  form: CommentType
): Promise<boolean> => {
  try {
    const res = await server.post(`/comments/${id}`, form);

    if (res.status === 201) {
      return true;
    }

    return false;
  } catch (err) {
    return false;
  }
};
