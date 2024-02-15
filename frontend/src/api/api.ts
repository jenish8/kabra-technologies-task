import Axios from "../axiosInstance";

export const listProducts = async () => {
  return Axios.get("/");
};

export const createProduct = async (body: {
  name: string;
  photo: string;
  details: string;
  price: number;
  stock: number;
}) => {
  return Axios.post("/new", body);
};

export const getSingleProduct = async (id: string) => {
  return Axios.get(`/${id}`);
};

export const updateSingleProduct = async (id: string) => {
  return Axios.patch(`/${id}`);
};

export const addToCart = async (body: { id: string }) => {
  return Axios.post("/cart", body);
};

export const showCart = async () => {
  return Axios.get("/api/cart");
};
