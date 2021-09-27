import {Fragment} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {XIcon} from '@heroicons/react/outline'
import './ShoppingCart.css';
import CartHelper from "../../helper/CartHelper";
import {Link} from "react-router-dom";
import CartItemShow from "../cart-item-show/CartItemShow";
import {useDispatch, useSelector} from "react-redux";
import {OPEN_MODAL} from "../../state/action-types/modalActions";

const ShoppingCart = () => {
    const dispatch = useDispatch();
    const openModal = useSelector(state => state.modalReducer.openModal);
    const {allItemPriceAddedInCart} = CartHelper();

    return (
        <Transition.Root show={openModal} as={Fragment}>
            <Dialog as="div" className="ShoppingCart fixed inset-0 z-20 overflow-hidden" onClose={() => dispatch({type: OPEN_MODAL})}>
                <div className="absolute inset-0 overflow-hidden">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                    </Transition.Child>

                    <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transform transition ease-in-out duration-500 sm:duration-700"
                            enterFrom="translate-x-full"
                            enterTo="translate-x-0"
                            leave="transform transition ease-in-out duration-500 sm:duration-700"
                            leaveFrom="translate-x-0"
                            leaveTo="translate-x-full">
                            <div className="w-screen max-w-md">
                                <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                                    <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                                        <div className="flex items-start justify-between">
                                            <Dialog.Title className="text-lg font-medium text-gray-900">Shopping
                                                cart</Dialog.Title>
                                            <div className="ml-3 h-7 flex items-center">
                                                <button
                                                    type="button"
                                                    className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                                                    onClick={() => dispatch({type: OPEN_MODAL})}>
                                                    <span className="sr-only">Close panel</span>
                                                    <XIcon className="h-6 w-6" aria-hidden="true"/>
                                                </button>
                                            </div>
                                        </div>

                                        <div className="mt-8">
                                            <CartItemShow/>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                            <p>Subtotal</p>
                                            <p>${allItemPriceAddedInCart()}</p>
                                        </div>
                                        <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at
                                            checkout.</p>
                                        <Link to='/checkout'>
                                            <button
                                                onClick={() => dispatch({type: OPEN_MODAL})}
                                                className="w-full mt-4 flex justify-center items-center px-6 py-3 border border-transparent
                                                rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                                                Checkout
                                            </button>
                                        </Link>
                                        <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                                            <p>
                                                or{' '}
                                                <Link to='/'>
                                                    <button
                                                        type="button"
                                                        className="text-indigo-600 font-medium hover:text-indigo-500"
                                                        onClick={() => dispatch({type: OPEN_MODAL})}>
                                                        Continue Shopping<span aria-hidden="true"> &rarr;</span>
                                                    </button>
                                                </Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default ShoppingCart;
