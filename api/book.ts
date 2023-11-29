import axios from "axios";
import { AddRecordType, NaverBooksType, RecordType } from "@/types/bookType";
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
): Promise<undefined | boolean> => {
  try {
    const result = await server.post("/records", form);

    if (result.status === 201) {
      return true;
    }

    return false;
  } catch (err) {
    return false;
  }
};
