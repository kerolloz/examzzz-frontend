import axios from "axios";
import { tokenStore } from "../stores/auth";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

axios.defaults.baseURL = API_BASE_URL;

tokenStore.subscribe((v) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${v}`;
});

export type ExamDTO = {
  id: number;
  name: string;
  duration: number;
};

export default {
  users: {
    signup: ({ name, age }) => axios.post("/users/signup", { name, age }),
  },
  exams: {
    getAll: async () => {
      const response = await axios.get("/exams");
      return response.data.data.exams as ExamDTO[];
    },
  },
};
