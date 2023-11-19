import axios from "axios";
import { NaverBooksType, RecordsType } from "@/types/bookType";

export const getRecords = async (): Promise<RecordsType | undefined> => {
  return axios
    .get("http://localhost:3030/records")
    .then((res) => {
      if (res.status === 400) {
        return res.data;
      } else {
        return undefined;
      }
    })
    .catch((err) => {
      console.log("ERROR ");
      return undefined;
    });
};

export const getSearchBooks = async (
  keyword: string
): Promise<NaverBooksType | undefined> => {
  if (
    !process.env.NEXT_PUBLIC_NAVER_CLIENT_ID ||
    !process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET
  ) {
    return undefined;
  }

  return axios
    .get(`naver/api/search/book.json?query=${keyword}&display=10&start=1`, {
      headers: {
        "X-Naver-Client-Id": process.env.NEXT_PUBLIC_NAVER_CLIENT_ID,
        "X-Naver-Client-Secret": process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET,
      },
    })
    .then((res) => {
      if (res.status === 200) {
        return res.data;
      }
    })
    .catch((err) => {
      return undefined;
    });
};
