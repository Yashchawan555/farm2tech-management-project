
export type User={

    name: string;
    email: string;
    photo: string;
    gender: string;
    role: string;
    dob: string;
    _id: string;
};
export interface Product{
    name: string;
    price:number;
    stock:number;
    category: string;
    photo: string;
    _id: string;
};

export type ShippingInfo={
    address:string;
    city:string;
    state:string;
    country:string;
    pinCode:string;
    
};
export type CartItem={
    productId:string;
    photo:string;
    name:string;
    price:number;
    quantity:number;
    stock:number;
    orderType: String; // Add orderType property
    // orderType: 'one-time' | 'subscription'; // Add orderType property
    
};

export type OrderItem= Omit<CartItem,"stock"> & {_id:string};

// export interface CartReducerInitialState {
//     loading: boolean;
//     oneTimeOrder: OrderState;
//     subscriptionOrder: OrderState;
// }

// export interface OrderState {
//     cartItems: CartItem[];
//     subtotal: number;
//     tax: number;
//     shippingCharges: number;
//     discount: number;
//     total: number;
//     couponCode: string;
//     isValidCouponCode: boolean;
// }
  

export type Order={
    orderItems:OrderItem[];
    shippingInfo: ShippingInfo;
    subtotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: number;
    status:string;
    user:{
        name:string;
        _id:string;
    };
    _id:string;
};

type CountAndChange={
    revenue:number;
    product:number;
    user:number;
    order:number;
};
type LatestTransaction={
    _id: string;
    amount: number;
    discount: number;
    quantity: number;
    status:string;
};
export type Stats={
    categoryCount:Record<string,number>[];
    changePercent:CountAndChange;
    count:CountAndChange;
    chart:{
        order:number[];
        revenue:number[];
    };
    userRatio:{
        male:number;
        female:number;
    };
    latestTransaction: LatestTransaction[];

};

type RevenueDistribution={
    netMargin: number;
    discount: number;
    productionCost: number;
    burnt: number;
    marketingCost: number;
};

type OrderFullfillment={
    processing: number;
    shipped: number;
    delivered: number;
};

type UsersAgeGroup={
    teen: number;
    adult: number;
    old: number;
};
type AdminCustomer={
    admin: number;
    customer: number;
};

type StockAvailablity={
    inStock: number;
    outOfStock: number;
};
export type Pie={
    orderFullfillment: OrderFullfillment;
    productCategories: Record<string, number>[];
    stockAvailablity:StockAvailablity; 
    revenueDistribution:RevenueDistribution;
    usersAgeGroup: UsersAgeGroup;
    adminCustomer: AdminCustomer;
};

export type Bar={
    users: number[];
    products: number[];
    orders: number[];
};
export type Line={
    users: number[];
    products: number[];
    discount:number[];
    revenue: number[];
};