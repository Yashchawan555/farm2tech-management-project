import { BiArrowBack } from "react-icons/bi";
import { useNavigate, Link } from "react-router-dom";
import CartItemSubscription from "../components/cart-item-subscription";
import { RootState, server } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
// import { removeCartItem } from "../redux/reducer/cartReducer";
import { CartItem } from "../types/types";
import {
     addToCart,
     calculatePrice,
     discountApplied,
     removeCartItem,
     // setSubTotal,
} from "../redux/reducer/cartReducer";

const Subscription = () => {
     const navigate = useNavigate();
     const { cartItems, subtotal, tax, total, shippingCharges, discount } = useSelector((state: RootState) => state.cartReducer);
     const dispatch = useDispatch();
     const [myDate, setMyDate] = useState([]);
     console.log(myDate.length);
     const [myQuantity, setMyQuantity] = useState(0);

     // setSubTotal(subtotal*myDate.length);

     const subscriptionItems = cartItems.filter(item => item.orderType === 'subscription');

     const [couponCode, setCouponCode] = useState<string>("");
     const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);

     const incrementHandler = (cartItem: CartItem) => {
          if (cartItem.quantity >= cartItem.stock) return;

          dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }));
     };
     const decrementHandler = (cartItem: CartItem) => {
          if (cartItem.quantity <= 1) return;

          dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }));
     };
     const removeHandler = (productId: string) => {
          dispatch(removeCartItem(productId));
     };
     useEffect(() => {
          const { token: cancelToken, cancel } = axios.CancelToken.source();

          const timeOutID = setTimeout(() => {
               axios
                    .get(`${server}/api/v1/payment/discount?coupon=${couponCode}`, {
                         cancelToken,
                    })
                    .then((res) => {
                         dispatch(discountApplied(res.data.discount));
                         setIsValidCouponCode(true);
                         dispatch(calculatePrice());
                    })
                    .catch(() => {
                         dispatch(discountApplied(0));
                         setIsValidCouponCode(false);
                         dispatch(calculatePrice());
                    });
          }, 1000);

          return () => {
               clearTimeout(timeOutID);
               cancel();
               setIsValidCouponCode(false);
          };
     }, [couponCode]);

     useEffect(() => {
          dispatch(calculatePrice());
     }, [cartItems]);

     return (
          <>
               <div className="subscription">
                    {/* <button className="back-btn" onClick={() => navigate("/cart")}>
                         <BiArrowBack />
                    </button> */}
                    <h1>Subscription Monthly</h1>
                    <div className="loadProducts">
                         <main>
                              {subscriptionItems.length > 0 ? (
                                   subscriptionItems.map((i, idx) => (
                                        <CartItemSubscription
                                             incrementHandler={incrementHandler}
                                             decrementHandler={decrementHandler}
                                             removeHandler={removeHandler}
                                             key={idx}
                                             cartItem={i}
                                             setMyDate = {setMyDate}
                                             myDate= {myDate}
                                             setMyQuantity= {setMyQuantity}
                                        />
                                   ))
                              ) : (
                                   <h1>NO ITEMS ADDED</h1>
                              )}
                         </main>
                         <aside>
                              {/* <p>Subtotal: ₹{subtotal*myDate.length}</p> */}
                              <p>Subtotal: ₹{subtotal}</p>
                              <p>Shipping Charges: ₹{shippingCharges}</p>
                              <p>Tax: ₹{tax}</p>
                              <p>
                                   Discount: <em className="red"> - ₹{discount}</em>
                              </p>
                              <p>
                                   <b>Total: ₹{total}</b>
                              </p>

                              {/* {cartItems.length > 0 && <Link to="/subscription">Subscription</Link>} */}
                            
                              <input
                                   type="text"
                                   placeholder="Coupon Code"
                                   value={couponCode}
                                   onChange={(e) => setCouponCode(e.target.value)}
                              />

                              {couponCode &&
                                   (isValidCouponCode ? (
                                        <span className="green">
                                             ₹{discount} off using the <code>{couponCode}</code>
                                        </span>
                                   ) : (
                                        <span className="red">
                                             Invalid Coupon <VscError />
                                        </span>
                                   ))}

                              {cartItems.length > 0 && <Link to="/shipping">Checkout</Link>}
                         </aside>
                    </div>
               </div>
          </>
     )
}

export default Subscription