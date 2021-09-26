import {Link, useLocation} from "react-router-dom";
import {ArrowRightIcon} from "@heroicons/react/outline";
import CartHelper from "../../helper/CartHelper";

const OrderSummary = () => {
    const location = useLocation();
    const {
        formFields,
        deliveryMethod,
        cartItems,
    } = location.state;
    const {
        firstName,
        lastName,
        company,
        address,
        city,
        country,
        postalCode,
        phone,
    } = formFields;
    const {allItemPriceAddedInCart} = CartHelper();

    return (
        <div className="max-w-2xl mx-auto py-4 px-2 sm:py-8 sm:px-4 lg:py-16
                       lg:max-w-7xl lg:px-8 grid grid-cols-1 lg:grid-cols-6">
            <div className="lg:col-start-2 lg:col-span-4 flex flex-col">
                <p className="font-bold text-3xl sm:text-4xl lg:text-6xl">
                    Thanks for ordering
                </p>
                <p className=" mt-2 text-gray-500">We appreciate your order, we're currently processing it.
                    So hang tight and we'll send you confirmation very soon!
                </p>
                <p className="mt-8 font-bold">Tracking number</p>
                <p className="mt-1 text-indigo-600">{Math.floor(100000000000 + Math.random() * 900000000000)}</p>

                <div className="mt-6 p-4 lg:p-8 bg-white rounded-lg shadow-lg border">
                    <div className="flow-root mb-8">
                        <ul role="presentation" className="-my-6 divide-y divide-gray-200">
                            {[...cartItems.keys()].map((cartItemKey) => (
                                <li key={cartItemKey} className="py-6 flex">
                                    <div
                                        className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                                        <img
                                            src={cartItems.get(cartItemKey).image}
                                            alt="Not Found"
                                            className="w-full h-full object-center object-fill"
                                        />
                                    </div>

                                    <div className="ml-4 flex-1 flex flex-col">
                                        <div>
                                            <div
                                                className="flex justify-between text-base font-medium text-gray-900">
                                                <h3>
                                                    <a href={cartItems.get(cartItemKey).href}>{cartItems.get(cartItemKey).title}</a>
                                                </h3>
                                                <p className="ml-4">${(cartItems.get(cartItemKey).price *
                                                    cartItems.get(cartItemKey).quantity).toFixed(2)}</p>
                                            </div>
                                        </div>
                                        <div
                                            className="mt-2 flex-1 flex items-center items-end justify-between text-sm">
                                            <p className="text-gray-500">Qty {cartItems.get(cartItemKey).quantity}</p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="border-t border-gray-200 py-6 font-bold text-gray-900">
                        <div className="flex justify-between text-base">
                            <p>Subtotal</p>
                            <p>${allItemPriceAddedInCart(cartItems)}</p>
                        </div>

                        <div className="flex justify-between text-base mt-2">
                            <p>Shipping</p>
                            <p>${deliveryMethod.price}</p>
                        </div>

                        <div className="my-4 py-4 border-t border-gray-200 flex justify-between text-base">
                            <p>Total</p>
                            <p>${(Number(allItemPriceAddedInCart(cartItems)) + Number(deliveryMethod.price)).toFixed(2)}</p>
                        </div>

                        <div className="mt-8 grid grid-cols-1 grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                            <div>
                                <p className="font-bold mb-2">Shipping Address</p>
                                <p className="text-gray-700 font-medium">{firstName + lastName}</p>
                                <p className="text-gray-700 font-medium">{phone}</p>
                                {company !== '' ? (<p className="text-gray-700 font-medium">{company}</p>) : null}
                                <p className="text-gray-700 mt-2 font-medium">
                                    {address + ', ' + city + (postalCode !== '' ? ('-' + postalCode + ', ') : ', ') + country}
                                </p>
                            </div>

                            <div>
                                <p className="font-bold mb-2">Payment Information</p>
                                <div className="pl-6 py-2 rounded shadow ring-2">
                                    <p className="font-bold mb-2">{deliveryMethod.name}</p>
                                    <p className="font-medium">{deliveryMethod.time}</p>
                                    <p className="font-medium">${deliveryMethod.price}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-16 border-t flex justify-end">
                            <Link to='/' replace className="font-bold text-indigo-600 mt-2">
                                Continue Shopping<span><ArrowRightIcon
                                className="animate-ping inline-block ml-2 h-4 w-4"
                                aria-hidden="true"/></span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderSummary;
