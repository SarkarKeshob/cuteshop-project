import { useSelector } from "react-redux";

const CheckoutSummary = () => {
    const cartItems=useSelector(state=>state.cart.cartItems);
    const cartItemsQuantity=useSelector(state=>state.cart.cartItemsQuantity);
    const cartAmount=useSelector(state=>state.cart.cartAmount);

    return (
        <div className="w-full shadow-2xl bg-white card-body rounded grid gap-5 mt-10">
            <h2 className="text-xl md:text-2xl lg:text-4xl text-slate-500">Checkout Summary</h2>
            <div>
                <p className="text-lg text-slate-400">Cart Item(s) {cartItemsQuantity}</p>
                <p className="text-slate-600 text-2xl font-bold">Sub Total : <span className="text-orange-600">{cartAmount}$</span></p>
                <div>
                    {cartItems.map(item=><div key={item.id} className="border border-teal-500 p-5 my-4">
                        <h4 className="text-xl text-slate-600">Product: {item.name}</h4>
                        <div className="text-slate-500 text-sm">
                            <p>Quantity:  {item.cartQuantity}</p>
                            <p>Unit Price:  {item.price}$</p>
                            <p>Set Price:  {(Number(item.cartQuantity))*(item.price)}$</p>
                        </div>
                    </div>)}
                </div>

            </div>
        </div>
    );
};

export default CheckoutSummary;