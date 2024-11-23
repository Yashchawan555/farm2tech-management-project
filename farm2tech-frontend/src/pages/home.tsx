import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Skeleton } from "../components/loader";
import ProductCard from "../components/product-card";
import { useLatestProductsQuery } from "../redux/api/productAPI";
import {
  addToCart,
  // addToOneTimeOrder,
  // addToSubscription
} from "../redux/reducer/cartReducer";
import { CartItem } from "../types/types";
import home from "../assets/images/home.png";

const Home = () => {
  const { data, isLoading, isError } = useLatestProductsQuery("");

  const dispatch = useDispatch();


  const addToCartHandler = (cartItem: CartItem, buttonName: string) => {
    if (cartItem.stock < 1) {
      return toast.error("Out of Stock");
    }

    switch (buttonName) {
      case "addToCart":
        dispatch(addToCart({ ...cartItem, orderType: 'one-time' })); // For one-time order
        toast.success("Added to cart");
        break;
      case "OneTimeOrder":
        // dispatch(addToOneTimeOrder(cartItem)); // Dispatch action for one-time order
        dispatch(addToCart({ ...cartItem, orderType: 'one-time' })); // For one-time order
        toast.success("One-time order added");
        break;
      case "Subscription":
        // dispatch(addToSubscription(cartItem)); // Dispatch action for subscription
        dispatch(addToCart({ ...cartItem, orderType: 'subscription' })); // For subscription
        toast.success("Subscription added");
        break;
      default:
        break;
    }
  };

  if (isError) toast.error("Cannot Fetch the Products");

  return (
    <>
      <div className="home">
        <div className='section-home-data'>
          <h2 className='home-h2'>Welcome to,</h2>
          <h1 className='home-h1'>Farm2Tech</h1>
          <p className='home-p'>
            Digitalization in Dairy for Farmer's
            Development  in Rural Areas.
          </p>
          <Link to='feature'> <button className='home-btn'>Explore more</button></Link>
        </div>
        <div className="section-home-image">
          <img src={home} alt="homelogo" className="home-image" />
        </div>
      </div>

      <div className="product-display">
        <h1>Latest Products</h1>
        <Link to="/search" className="findmore">More</Link>
      </div>

      <div className="product-loading">
        <main>
          {isLoading ? (
            <Skeleton width="80vw" />
          ) : (
            data?.products.map((i) => (
              <ProductCard
                key={i._id}
                productId={i._id}
                name={i.name}
                price={i.price}
                stock={i.stock}
                handler={addToCartHandler}
                photo={i.photo}
              />
            ))
          )}
        </main>
      </div>
    </>
  );
};

export default Home;
