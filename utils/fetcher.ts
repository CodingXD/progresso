import axios from "axios";

export const fetcher = axios.create({
  baseURL: `${process.env.CF_PAGES_URL}/api`,
});
