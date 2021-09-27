import {useState} from 'react'
import {Disclosure} from '@headlessui/react'
import {MenuIcon, XIcon} from '@heroicons/react/outline'
import ShoppingCart from "../shopping-cart/ShoppingCart";
import CartHelper from "../../helper/CartHelper";
import {Link} from "react-router-dom";
import classNames from "../../helper/ClassNameJoiner";

const navigationItems = [
    {name: 'Products', href: '#', path: '/', current: true},
    {name: 'About', href: '#', path: '/about', current: false},
    {name: 'Contact', href: '#', path: '/contact', current: false},
]

const Navbar = () => {
    const [openModal, setOpenModal] = useState(false);
    const [navigation, setNavigation] = useState(navigationItems);
    const {getTotalNumOfItemAddedInCart} = CartHelper();

    const changeNavigation = (navName) => {
        const newNavigation = [...navigationItems];
        for (const newNavigationEl of newNavigation)
            newNavigationEl.current = newNavigationEl.name === navName;
        setNavigation(newNavigation);
    }

    return (
        <Disclosure as="nav" className="sticky top-0 z-10 bg-gray-800">
            {({open}) => (
                <>
                    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                        <div className="relative flex items-center justify-between h-16">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button
                                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400
                                    hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XIcon className="block h-6 w-6" aria-hidden="true"/>
                                    ) : (
                                        <MenuIcon className="block h-6 w-6" aria-hidden="true"/>
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                                <Link to='/' onClick={() => changeNavigation('Products')}
                                      className="flex-shrink-0 flex items-center">
                                    <img
                                        className="block h-8 w-auto"
                                        src="https://img.icons8.com/fluency-systems-filled/100/ffffff/e-commerce.png"
                                        alt="DSI-E.com"
                                    />
                                </Link>

                                <div className="hidden sm:block sm:ml-6">
                                    <div className="flex space-x-4">
                                        {navigation.map((item) => (
                                            <Link key={item.name} to={item.path}
                                                  onClick={() => changeNavigation(item.name)}
                                                  className={classNames(
                                                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                      'px-3 py-2 rounded-md text-sm font-medium'
                                                  )}
                                                  aria-current={item.current ? 'page' : undefined}>
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div
                                className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                                {/*<button*/}
                                {/*    onClick={() => setOpenModal(!openModal)}*/}
                                {/*    type="button"*/}
                                {/*    className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white*/}
                                {/*    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800*/}
                                {/*    focus:ring-white">*/}
                                {/*    <span className="sr-only">Shopping Cart</span>*/}
                                {/*    <ShoppingCartIcon className="h-6 w-6" aria-hidden="true"/>*/}
                                {/*</button>*/}

                                <span className="relative inline-block">
                                    <button onClick={() => setOpenModal(!openModal)}
                                            type="button">
                                        <svg className="w-6 h-6 text-gray-300 fill-current" viewBox="0 0 20 20"><path
                                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                            clipRule="evenodd" fillRule="evenodd"/>
                                        </svg>
                                        {
                                            getTotalNumOfItemAddedInCart() !== 0 ?
                                                (<span
                                                    className="absolute top-0 right-0 inline-flex items-center justify-center
                                                px-2 py-1 text-xs font-bold leading-none text-red-100 transform
                                                translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                                                {getTotalNumOfItemAddedInCart()}
                                            </span>) : null
                                        }
                                    </button>
                                </span>

                            </div>

                            <ShoppingCart modal={{openModal, setOpenModal}}/>

                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navigation.map((item) => (
                                <Link key={item.name} to={item.path}
                                      onClick={() => changeNavigation(item.name)}
                                      className={classNames(
                                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                          'block px-3 py-2 rounded-md text-base font-medium'
                                      )}
                                      aria-current={item.current ? 'page' : undefined}>
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}

export default Navbar;
