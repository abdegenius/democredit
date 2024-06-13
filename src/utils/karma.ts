import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const Api = axios.create({
  baseURL: process.env.LENDSQR_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + process.env.LENDSQR_SECRET_KEY,
  },
});

export const checkPhone = async (phone: string) => {
  const { data } = await Api.get(
    `/verification/karma/0zspgifzbo.ga?identity=${phone}`
  );
  if (
    data &&
    data.status === "success" &&
    data.data &&
    data.data.amount_in_contention === "0.00"
  ) {
    return false;
  } else {
    return true;
  }
};
