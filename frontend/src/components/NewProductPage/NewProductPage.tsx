import { useState } from "react";

//navigation
import { useNavigate } from "react-router-dom";

// toast
import { toast } from "react-hot-toast";

// Api
import { createProduct } from "../../api/api";

const NewProductPage = () => {
  const [name, setName] = useState<string>("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [details, setDetails] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);
  const navigate = useNavigate();

  const handlecreateProduct = async () => {
    try {
      if (!name || !photo || !details || !price || !stock) return;
      console.log(photo);
      const response = await createProduct({
        name,
        photo,
        details,
        price,
        stock,
      });
      toast.success(response?.data?.message || "Product Created Successfully");
      navigate("/");
    } catch (error) {
      toast.error("Error While Creating Product");
    }
  };
  return (
    <>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="file"
          onChange={(e) => {
            if (e.target.files) {
              console.log(e.target.files);
              setPhoto(e.target.value);
            }
          }}
        />
        <input
          type="text"
          value={details}
          onChange={(e) => {
            setDetails(e.target.value);
          }}
        />
        <input
          type="text"
          value={price}
          onChange={(e) => {
            setPrice(Number(e.target.value));
          }}
        />
        <input
          type="text"
          value={stock}
          onChange={(e) => {
            setStock(Number(e.target.value));
          }}
        />

        <button onClick={handlecreateProduct}>Create</button>
      </div>
    </>
  );
};

export default NewProductPage;
