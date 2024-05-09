import { useState } from "react";
import { CountryDropdown } from "react-country-region-selector";
import { useDispatch } from "react-redux";
import { saveBillingAddress, saveShippingAddress } from "../../../redux/features/CheckoutSlice/checkoutSlice";
import { useNavigate } from "react-router-dom";
import CheckoutSummary from "./CheckoutSummary";
const initialAddress = {
    name: '',
    line1: '',
    line2: '',
    phone: '',
    postalCode: '',
    country: '',
    state: '',
    city: '',

}
const CheckoutDetails = () => {
    const dispatch = useDispatch();
    const [shippingAddress, setShippingAddress] = useState({ ...initialAddress });
    const [billingAddress, setBillingAddress] = useState({ ...initialAddress });
    const navigate = useNavigate();
    const handleShipping = (e) => {
        const { name, value } = e.target;
        setShippingAddress({
            ...shippingAddress,
            [name]: value,
        })
    }
    const handleBilling = (e) => {
        const { name, value } = e.target;
        setBillingAddress({
            ...billingAddress,
            [name]: value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(saveBillingAddress(billingAddress));
        dispatch(saveShippingAddress(shippingAddress));
        navigate('/checkoutForm');

    }
    return (
        <div className="bg-slate-200 pb-20">
            <h2 className="text-xl md:text-3xl lg:text-5xl">Checkout Details</h2>
            <div className=" ml-0 grid lg:flex-row-reverse lg:ml-10 lg:flex lg:justify-between">
                <div className="mr-0 lg:mr-20">
                    <CheckoutSummary></CheckoutSummary>
                </div>
                <div className="shadow-2xl bg-white  grid gap-5 mt-10 lg:w-1/3">
                    {/* Shipping Address */}

                    <form onSubmit={handleSubmit} className="form grid gap-7 card-body rounded">
                        <h2 className="text-lg md:text-xl lg:text-2xl text-slate-500">Shipping Address</h2>

                        <div className="grid">
                            <label htmlFor="shippingname" > Recipent Name</label>
                            <input type="text" className="input input-bordered w-5/6" id="shippingname" placeholder="Recipent Name" name="name" value={shippingAddress.name} required onChange={(e) => handleShipping(e)} />
                        </div>
                        <div className="grid">
                            <label htmlFor="shippingline1" className="label-text">Address Line 1</label>
                            <input type="text" className="input input-bordered w-5/6" id="shippingline1" placeholder="Address Line 1" name="line1" value={shippingAddress.line1} required onChange={(e) => handleShipping(e)} />
                        </div>
                        <div className="grid">
                            <label htmlFor="shippingline2" className="label-text">Address Line 2</label>
                            <input type="text" className="input input-bordered w-5/6" id="shippingline2" placeholder="Address line 2 " name="line2" value={shippingAddress.line2} required onChange={(e) => handleShipping(e)} />
                        </div>
                        <div className="grid">
                            <label htmlFor="shippingphone" className="label-text">Phone Number</label>
                            <input type="phone" className="input input-bordered w-5/6" id="shippingphone" placeholder="Phone Number" name="phone" value={shippingAddress.phone} required onChange={(e) => handleShipping(e)} />
                        </div>
                        <div className="grid">
                            <label htmlFor="shippingpostalCode" className="label-text">Postal Code</label>
                            <input type="text" className="input input-bordered w-5/6" id="shippingpostalCode" placeholder="Postal Code" name="postalCode" value={shippingAddress.postalCode} required onChange={(e) => handleShipping(e)} />
                        </div>
                        <div className="grid">
                            <label htmlFor="shippingcountry" className="label-text">Country</label>
                            <CountryDropdown id="shippingcountry" className={'input input-bordered w-5/6'} valueType="short" value={shippingAddress.country} onChange={(val) => handleShipping({
                                target: {
                                    name: 'country',
                                    value: val,
                                }
                            })} ></CountryDropdown>
                        </div>
                        <div className="grid">
                            <label htmlFor="shippingstate" className="label-text">State</label>
                            <input type="text" className="input input-bordered w-5/6" id="shippingstate" placeholder="State" name="state" value={shippingAddress.state} onChange={(e) => handleShipping(e)} required />
                        </div>
                        <div className="grid">
                            <label htmlFor="shippingcity" className="label-text">City</label>
                            <input type="text" className="input input-bordered w-5/6" id="shippingcity" placeholder="City" name="city" value={shippingAddress.city} required onChange={(e) => handleShipping(e)} />
                        </div>

                        {/* Billing Address */}
                        <h2 className="text-lg md:text-xl lg:text-2xl text-slate-400">Billing Address</h2>
                        <div className="grid">
                            <label htmlFor="billingname" >Name</label>
                            <input type="text" className="input input-bordered w-5/6" id="billingname" placeholder=" Name" name="name" value={billingAddress.name} required onChange={(e) => handleBilling(e)} />
                        </div>
                        <div className="grid">
                            <label htmlFor="billingline1" className="label-text">Address Line 1</label>
                            <input type="text" className="input input-bordered w-5/6" id="billingline1" placeholder="Address Line 1" name="line1" value={billingAddress.line1} required onChange={(e) => handleBilling(e)} />
                        </div>
                        <div className="grid">
                            <label htmlFor="billingline2" className="label-text">Address Line 2</label>
                            <input type="text" className="input input-bordered w-5/6" id="billingline2" placeholder="Address line 2 " name="line2" value={billingAddress.line2} required onChange={(e) => handleBilling(e)} />
                        </div>
                        <div className="grid">
                            <label htmlFor="billingphone" className="label-text">Phone Number</label>
                            <input type="phone" className="input input-bordered w-5/6" id="billingphone" placeholder="Phone Number" name="phone" value={billingAddress.phone} required onChange={(e) => handleBilling(e)} />
                        </div>
                        <div className="grid">
                            <label htmlFor="billingpostalCode" className="label-text">Postal Code</label>
                            <input type="text" className="input input-bordered w-5/6" id="billingpostalCode" placeholder="Postal Code" name="postalCode" value={billingAddress.postalCode} required onChange={(e) => handleBilling(e)} />
                        </div>
                        <div className="grid">
                            <label htmlFor="billingcountry" className="label-text">Country</label>
                            <CountryDropdown className={'input input-bordered w-5/6'} id="billingcountry" valueType="short" value={billingAddress.country} onChange={(val) => handleBilling({
                                target: {
                                    name: 'country',
                                    value: val,
                                }
                            })} ></CountryDropdown>
                        </div>
                        <div className="grid">
                            <label htmlFor="billingstate" className="label-text">State</label>
                            <input type="text" className="input input-bordered w-5/6" id="billingstate" placeholder="State" name="state" value={billingAddress.state} onChange={(e) => handleBilling(e)} required />
                        </div>
                        <div className="grid">
                            <label htmlFor="billingcity" className="label-text">City</label>
                            <input type="text" className="input input-bordered w-5/6" id="billingcity" placeholder="City" name="city" value={billingAddress.city} required onChange={(e) => handleBilling(e)} />
                        </div>
                        <button className="btn btn-warning w-4/6 mx-auto" type="submit">Proceed To Checkout</button>
                    </form>

                </div>

            </div>

        </div>
    );
};

export default CheckoutDetails;