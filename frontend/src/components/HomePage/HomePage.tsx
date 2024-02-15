import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Product } from "../../types/Product";
import { listProducts } from "../../api/api";

const ListProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    handleGetProducts();
  }, []);

  const handleGetProducts = async () => {
    try {
      const response = await listProducts();
      setProducts(response?.data?.data || []);
    } catch (error) {
      setProducts([]);
      toast.error("Error while loading products");
    }
  };

  return (
    <div className="product-list-container">
      <h1>Product List</h1>

      <div className="product-cards-container">
        {products.map((product, index) => (
          <div key={index} className="product-card">
            <img
              src={product.photo}
              alt={product.name}
              className="product-image"
            />
            <div className="product-details">
              <h2>{product.name}</h2>
              <p>{product.details}</p>
              <div className="price-stock-container">
                <span className="price">Price: Rs.{product.price}</span>
                <span className="stock">Stock: {product.stock}</span>
              </div>
            </div>
            <Link to={`/${product._id}`} className="edit-link">
              View
            </Link>
          </div>
        ))}
      </div>

      <div className="create-product-button">
        <button
          type="button"
          onClick={() => {
            navigate("/new");
          }}
        >
          Create Product
        </button>
      </div>
    </div>
  );
};

export default ListProductPage;
