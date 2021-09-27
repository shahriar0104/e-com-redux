import {useState} from 'react'
import {StarIcon} from '@heroicons/react/solid'
import {Link, useParams} from "react-router-dom";
import CartHelper from "../../helper/CartHelper";
import {MinusIcon, PlusIcon} from "@heroicons/react/outline";
import classNames from "../../helper/ClassNameJoiner";
import {keyProductList} from "../../constants/keys";
import {useDispatch} from "react-redux";
import {addToCart, decQuantity, incQuantity} from "../../state/action/cartActions";

const ProductOverview = () => {
    const {productId} = useParams();
    const setTheProduct = () => {
        for (const el of JSON.parse(localStorage.getItem(keyProductList)))
            if (el.id === Number(productId)) return el;
    }
    const [product] = useState(setTheProduct());
    const dispatch = useDispatch();
    const {
        isProductAvailable,
        itemsLeft,
        isItemPresentInCart,
        getNumOfSpecificItemAddedInCart
    } = CartHelper();

    return (
        <div className="bg-white">
            <div className="pt-8">

                <nav aria-label="Breadcrumb">
                    <ol role="presentation"
                        className="max-w-2xl mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-7xl lg:px-8">
                        <li>
                            <div className="flex items-center">
                                <Link to="/" className="mr-2 text-sm font-medium text-gray-900">
                                    products
                                </Link>
                                <svg
                                    width={16}
                                    height={20}
                                    viewBox="0 0 16 20"
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden="true"
                                    className="w-4 h-5 text-gray-300">
                                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z"/>
                                </svg>
                            </div>
                        </li>
                        <li className="text-sm">
                            <p aria-current="page"
                               className="font-medium text-gray-500 hover:text-gray-600">
                                {product.category}
                            </p>
                        </li>
                    </ol>
                </nav>

                {/* Product info */}
                <div
                    className="max-w-2xl mt-8 mx-auto pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pb-24 lg:px-8
                    lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">

                    <div
                        className="block aspect-w-3 aspect-h-4 rounded-lg overflow-hidden lg:border-r lg:border-gray-200 lg:pr-8">
                        <img
                            src={product.image}
                            alt="product"
                            className="w-full h-full object-center object-cover"
                        />
                    </div>

                    {/* Options */}
                    <div className="mt-4 lg:mt-0 lg:col-span-2 lg:row-span-3">
                        <div className="lg:col-span-2">
                            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">{product.title}</h1>
                        </div>

                        <div
                            className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 ">
                            {/* Description and details */}
                            <div>
                                <h3 className="sr-only">Description</h3>
                                <div className="space-y-6">
                                    <p className="text-base text-gray-900">{product.description}</p>
                                </div>
                            </div>
                        </div>

                        <h2 className="sr-only">Product information</h2>
                        <p className="text-3xl text-gray-900">${product.price}</p>

                        {/* Reviews */}
                        <div className="mt-6">
                            <h3 className="sr-only">Rating</h3>
                            <div className="flex items-center">
                                <div className="flex items-center">
                                    {[0, 1, 2, 3, 4].map((rating) => (
                                        <StarIcon
                                            key={rating}
                                            className={classNames(
                                                product.rating['rate'] > rating ? 'text-gray-900' : 'text-gray-200',
                                                'h-5 w-5 flex-shrink-0'
                                            )}
                                            aria-hidden="true"
                                        />
                                    ))}
                                </div>
                                <p className="sr-only">{product.rating['rate']} out of 5 stars</p>
                                <p className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                    {isItemPresentInCart(product.id) ? itemsLeft(product.id) : product.rating['count']} left
                                </p>
                            </div>
                        </div>

                        {
                            product.rating['count'] <= 0 ?
                                (<div className="mt-10">
                                    <button
                                        disabled
                                        className="flex justify-center items-center px-8 py-3 border border-transparent
                                                   w-full rounded-md shadow-sm text-base font-medium text-white
                                                   cursor-not-allowed bg-red-500">
                                        Out of stock
                                    </button>
                                </div>) :

                                (
                                    !isItemPresentInCart(product.id) ?
                                        (<button
                                            type="submit"
                                            onClick={() => dispatch(addToCart(product))}
                                            className="mt-10 w-full bg-indigo-600 border border-transparent
                                        rounded-md py-3 px-8 flex items-center justify-center text-base
                                        font-medium text-white hover:bg-indigo-700 focus:outline-none
                                        focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                            Add to Cart
                                        </button>) :

                                        (<div className="mt-10">
                                            <div className="flex justify-center items-center px-4 py-2 border border-transparent
                                            rounded-md shadow-sm text-base font-medium text-gray-900 bg-gray-100">
                                                <button
                                                    className="bg-indigo-700 text-white p-2 rounded-lg shadow-sm cursor-pointer"
                                                    onClick={() => dispatch(decQuantity(product.id))}>
                                                    <MinusIcon className="h-4 w-4" aria-hidden="true"/>
                                                </button>
                                                <span
                                                    className="mx-3">{getNumOfSpecificItemAddedInCart(product.id)}</span>
                                                <button className={classNames(
                                                    isProductAvailable(product.id) ? 'bg-indigo-700 text-white' : 'bg-gray-300',
                                                    'p-2 rounded-lg shadow-sm cursor-pointer'
                                                )}
                                                        disabled={!isProductAvailable(product.id)}
                                                        onClick={() => dispatch(incQuantity(product.id))}>
                                                    <PlusIcon className="h-4 w-4" aria-hidden="true"/>
                                                </button>
                                            </div>
                                        </div>)
                                )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductOverview;
