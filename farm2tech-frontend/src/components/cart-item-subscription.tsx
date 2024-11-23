import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCalendarPlus, FaTrash } from "react-icons/fa";
import { server } from "../redux/store";
import { CartItem } from "../types/types";
// import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
// import { useNavigate } from "react-router-dom";
import CalendarDisplay from "../components/calendar";
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

type CartItemProps = {
     cartItem: CartItem;
     incrementHandler: (cartItem: CartItem) => void;
     decrementHandler: (cartItem: CartItem) => void;
     removeHandler: (id: string) => void;
     // setMyDate: (id: string) => void;
};

const CartItemSubscription = ({
     cartItem,
     incrementHandler,
     decrementHandler,
     removeHandler,
     setMyDate,
     myDate,
     setMyQuantity,
}: CartItemProps) => {
     const { photo, productId, name, price, quantity } = cartItem;
     // const [value, onChange] = useState<Value>(new Date());
     // const navigate = useNavigate();
     setMyQuantity(quantity)

     return (
          <div className="cart-item-subscription">
               <article>
                    <img src={`${server}/${photo}`} alt={name} />
                    {/* <Link to={`/product/${productId}`}>{name}</Link> */}
                    <h1>{name}</h1>
                    <span>₹{price}</span>
               </article>

               {/* <div className="datesDisplay">
                    <h3>Date: <span>6/06/2024 - 2/2/2024</span> </h3>
               </div> */}
               {/* <div> */}
               <CalendarDisplay setMyDate={setMyDate} myDate={myDate} />
               {/* </div> */}

               <div>
                    <button onClick={() => decrementHandler(cartItem)}>-</button>
                    <p>{quantity}</p>
                    <button onClick={() => incrementHandler(cartItem)}>+</button>
               </div>

               <button onClick={() => removeHandler(productId)}>
                    <FaTrash />
               </button>
          </div>
     );
};

export default CartItemSubscription;
