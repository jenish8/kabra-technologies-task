import { useEffect, useState } from "react";
import { Cart } from "../../types/Cart";
import { showCart } from "../../api/api";

const CartPage = () => {
  const [cartItems, setCartItems] = useState<Cart[]>([]);
  const [totalBill, setTotalBill] = useState(0);

  useEffect(() => {
    // Fetch cart items from the server or update them as needed
    fetchCartItems();
  }, [setCartItems]);

  const fetchCartItems = async () => {
    try {
      const response = await showCart();
      console.log(response?.data?.data);
      setCartItems(response?.data?.data);
      calculateTotalBill(response?.data?.data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const calculateTotalBill = (items: Cart[]) => {
    const total = items.reduce(
      (acc: number, item: Cart) => acc + item.quantity * item.productId.price,
      0
    );
    setTotalBill(total);
  };

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleUpdateCart = async () => {
    try {
      // Update cart items on the server
      await showCart();

      // Recalculate total bill
      calculateTotalBill(cartItems);
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  return (
    <div>
      <h1>Cart</h1>
      {!cartItems ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li key={item.productId}>
                <div>
                  <p>{item.name}</p>
                  <p>Price: ${item.productId.price}</p>
                  <label>Quantity:</label>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.productId, +e.target.value)
                    }
                  />
                  <p>Total: Rs{item.quantity * item.productId.price}</p>
                </div>
              </li>
            ))}
          </ul>
          <p>Total Bill: Rs{totalBill}</p>
          <button onClick={handleUpdateCart}>Update Cart</button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
