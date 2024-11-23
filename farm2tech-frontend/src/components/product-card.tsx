import { server } from "../redux/store";
import { CartItem } from "../types/types";
import { useNavigate } from "react-router-dom";

type ProductsProps = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  // orderType: String;
  stock: number;
  handler: (cartItem: CartItem, buttonName: string) => void;
};


const ProductCard = ({
  productId,
  price,
  name,
  photo,
  stock,
  // orderType,
  handler,
}: ProductsProps) => {

  const navigate = useNavigate();

  return (
    <div className="product-card">
      <img src={`${server}/${photo}`} alt={name} />

      <section>

        <article>
          <p>{name}</p>
          <span>₹{price}</span>
          {/* <p>We provide dairy products that cater to cousumer who put a premium on taste, nutrition, health, craftmanship and sheer indulgence.</p> */}
        </article>

        <div>
          <button name="addToCart" className="bynow"
            onClick={() =>
              handler({ productId, price, name, photo, stock, quantity: 1, orderType: "addToCart" }, "addToCart")
            }
          >
            Buy Now
          </button>

          <button name="OneTimeOrder"
            onClick={() => {
              handler({ productId, price, name, photo, stock, quantity: 1, orderType: "OneTimeOrder" }, "OneTimeOrder")
              navigate("/cart")
            }}
          >
            One Time Order
          </button>

          <button name="Subscription"
            onClick={() => {
              handler({ productId, price, name, photo, stock, quantity: 1, orderType: "Subscription" }, "Subscription")
              navigate("/subscription")
            }}
          >
            Subscription
          </button>
        </div>
      </section>
    </div>
  );
};

export default ProductCard;
