import {useState} from "react";
import {RadioGroup} from '@headlessui/react'
import CartHelper from "../../helper/CartHelper";
import {Redirect, useHistory} from "react-router-dom";
import CartItemShow from "../cart-item-show/CartItemShow";
import InputField from "./InputField";
import {useDispatch, useSelector} from "react-redux";
import {clearCart} from "../../state/action/cartActions";
import {setProducts} from "../../state/action/productActions";

const methods = [
    {
        name: 'Standard',
        time: '4-10 business days',
        price: '5.00',
    },
    {
        name: 'Express',
        time: '2-5 business days',
        price: '16.00',
    },
]

function CheckIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" {...props}>
            <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2"/>
            <path
                d="M7 13l3 3 7-7"
                stroke="#fff"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

const Checkout = () => {
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productReducer.productList);
    const cartItemList = useSelector(state => state.cartReducer.cartItemList);
    const {allItemPriceAddedInCart} = CartHelper();
    const [selected, setSelected] = useState(methods[0]);
    const [formFields, setFormFields] = useState(
        {
            email: '', firstName: '', lastName: '', company: '', address: '', city: '', country: '',
            province: '', postalCode: '', phone: '',
        }
    );
    const history = useHistory();

    const inputChangeHandler = (event) => {
        if (event.target.name === 'phone') {
            const phoneNum = event.target.value;
            const pattern = new RegExp(/^[0-9\b+#*]+$/);
            if (phoneNum !== '' && !pattern.test(phoneNum)) {
                return event.preventDefault();
            }
        }
        setFormFields({...formFields, [event.target.name]: event.target.value});
    }

    const navigateToOrderSummary = (event) => {
        event.preventDefault();
        setAfterOrderProducts();

        history.replace({
            pathname: '/order-summary',
            state: {
                formFields,
                deliveryMethod: selected,
                cartItems: new Map(cartItemList),
            }
        });
    }

    const setAfterOrderProducts = () => {
        const products = [...productList];
        cartItemList.forEach((value, key) => products[key - 1].rating['count'] -= value.quantity);
        dispatch(clearCart());
        dispatch(setProducts(products));
    }

    return (
        <form onSubmit={navigateToOrderSummary}>
            <div
                className="mt-4 max-w-2xl mx-auto py-4 px-2 sm:py-8 sm:px-4 lg:max-w-7xl lg:px-8 grid grid-cols-1 lg:grid-cols-2 lg:gap-16">

                {
                    cartItemList.size === 0 ?
                        (
                            <Redirect to="/"/>
                        ) :

                        (
                            <>
                                <div>
                                    <h1 className="text-lg font-bold text-indigo-600">Contact Information</h1>

                                    <InputField label="Email address" name="email" isRequired={true}
                                                value={formFields.email} change={inputChangeHandler}/>

                                    <hr className="my-10 block border-1 bg-gray-500 h-0.1"/>

                                    <h1 className="text-lg font-bold text-indigo-600">Shipping Information</h1>
                                    <div className="flex flex-col lg:flex-row gap-4">
                                        <InputField label="First Name" name="firstName" isRequired={true}
                                                    value={formFields.firstName} change={inputChangeHandler}/>
                                        <InputField label="Last Name" name="lastName" isRequired={false}
                                                    value={formFields.lastName} change={inputChangeHandler}/>
                                    </div>

                                    <InputField label="Company" name="company" isRequired={false}
                                                value={formFields.company} change={inputChangeHandler}/>
                                    <InputField label="Address" name="address" isRequired={true}
                                                value={formFields.address} change={inputChangeHandler}/>

                                    <div className="flex flex-col lg:flex-row gap-4">
                                        <InputField label="City" name="city" isRequired={true} value={formFields.city}
                                                    change={inputChangeHandler}/>
                                        <InputField label="Country" name="country" isRequired={true}
                                                    value={formFields.country} change={inputChangeHandler}/>
                                    </div>

                                    <div className="flex flex-col lg:flex-row gap-4">
                                        <InputField label="Province" name="province" isRequired={false}
                                                    value={formFields.province} change={inputChangeHandler}/>
                                        <InputField label="Postal Code" name="postalCode" isRequired={false}
                                                    value={formFields.postalCode} change={inputChangeHandler}/>
                                    </div>

                                    <InputField label="Phone" name="phone" isRequired={true} value={formFields.phone}
                                                change={inputChangeHandler}/>

                                    <hr className="my-10 block border-1 bg-gray-500 h-0.1"/>

                                    <h1 className="text-lg font-bold text-indigo-600">Delivery Method</h1>
                                    <div className="w-full py-8">
                                        <div className="w-full">
                                            <RadioGroup value={selected} onChange={setSelected}>
                                                <RadioGroup.Label className="sr-only">Delivery Method</RadioGroup.Label>
                                                <div className="space-y-2">
                                                    {methods.map((plan) => (
                                                        <RadioGroup.Option
                                                            key={plan.name}
                                                            value={plan}
                                                            className={({active, checked}) =>
                                                                `${active
                                                                    ? 'ring-2 ring-offset-2 ring-offset-indigo-300 ring-white ring-opacity-60'
                                                                    : ''}
                                                                ${checked ? 'bg-indigo-700 bg-opacity-75 text-white' : 'bg-white'}
                                                                    relative border border-2 rounded-lg shadow-md px-5 py-4 
                                                                    cursor-pointer flex focus:outline-none`
                                                            }>
                                                            {({active, checked}) => (
                                                                <>
                                                                    <div
                                                                        className="flex items-center justify-between w-full">
                                                                        <div className="flex items-center">
                                                                            <div className="text-sm">
                                                                                <RadioGroup.Label
                                                                                    as="p"
                                                                                    className={`font-bold ${
                                                                                        checked ? 'text-white' : 'text-gray-900'
                                                                                    }`}>
                                                                                    {plan.name}
                                                                                </RadioGroup.Label>
                                                                                <RadioGroup.Description
                                                                                    as="span"
                                                                                    className={`inline ${
                                                                                        checked ? 'text-sky-100' : 'text-gray-500'
                                                                                    }`}>
                                                                                    <span>
                                                                                      {plan.time}
                                                                                    </span>
                                                                                    <span
                                                                                        className="block mt-5 font-bold">${plan.price}</span>
                                                                                </RadioGroup.Description>
                                                                            </div>
                                                                        </div>
                                                                        {checked && (
                                                                            <div className="flex-shrink-0 text-white">
                                                                                <CheckIcon className="w-6 h-6"/>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </>
                                                            )}
                                                        </RadioGroup.Option>
                                                    ))}
                                                </div>
                                            </RadioGroup>
                                        </div>
                                    </div>

                                </div>

                                <div>
                                    <h1 className="text-lg font-bold text-indigo-600">Order Summary</h1>
                                    <div className="mt-4 p-4 lg:p-8 bg-white rounded-lg shadow-lg border">

                                        <CartItemShow/>

                                        <div className="mt-8 border-t border-gray-200 py-6 font-bold text-gray-900">
                                            <div className="flex justify-between text-base">
                                                <p>Subtotal</p>
                                                <p>${allItemPriceAddedInCart()}</p>
                                            </div>

                                            <div className="flex justify-between text-base mt-2">
                                                <p>Shipping</p>
                                                <p>${selected.price}</p>
                                            </div>

                                            <div
                                                className="my-4 py-4 border-t border-gray-200 flex justify-between text-base">
                                                <p>Total</p>
                                                <p>${(Number(allItemPriceAddedInCart()) + Number(selected.price)).toFixed(2)}</p>
                                            </div>

                                            <div className="mt-6">
                                                <button
                                                    type="submit"
                                                    className="w-full flex justify-center items-center px-6 py-3 border border-transparent
                                                rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                                                    Confirm Order
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                }

            </div>
        </form>
    )
}

export default Checkout;
