import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// toast
import { toast } from "react-hot-toast";

// types
import { Product } from "../../types/Product";

//Api
import { addToCart, getSingleProduct } from "../../api/api";

const SingleProductPage = () => {
  const [Product, setProduct] = useState<Product | null>(null);
  const [name, setName] = useState<string | null>(null);

  const navigate = useNavigate();

  // search params
  const Params = useParams();
  const id = Params["id"];
  useEffect(() => {
    if (id) handleGetProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  const handleGetProduct = async () => {
    try {
      const response = await getSingleProduct(id || "");
      setProduct(response?.data?.data || null);
      setName(response?.data?.data?.name || "");
    } catch (error) {
      setProduct(null);
      toast.error("Error while loading Product");
    }
  };

  const handleCart = async () => {
    try {
      if (!id) return;
      console.log(id);
      const response = await addToCart({ id });
      toast.success(response?.data?.message || "Added to Cart Successfully");
      navigate("/");
    } catch (error) {
      toast.error("Error While Creating Product");
    }
  };

  return (
    <>
      <div>
        <div className="font-head-2"> Name - {name}</div>
        <div className="font-head-2">
          <b>Product Details</b>
        </div>
        <div className="font-body-2">Details - {Product?.details}</div>
      </div>
      <button type="button" onClick={handleCart}>
        Add To Cart
      </button>
    </>
  );
};

export default SingleProductPage;
