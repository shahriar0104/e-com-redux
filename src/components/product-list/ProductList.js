import {Fragment, useRef, useState} from "react";
import {CheckIcon, MinusIcon, PlusIcon, SelectorIcon} from "@heroicons/react/outline";
import {Listbox, Transition} from '@headlessui/react'
import CartHelper from "../../helper/CartHelper";
import {Link} from "react-router-dom";
import classNames from "../../helper/ClassNameJoiner";
import MyLoader from "../content-loader/MyLoader";
import {useDispatch, useSelector} from "react-redux";
import {setFilterProducts} from "../../state/action/productActions";
import {addToCart, decQuantity, incQuantity} from "../../state/action/cartActions";
import useSetProducts from "../../hooks/useSetProducts";

const ProductList = () => {
    const {loader} = useSetProducts();
    const {isProductAvailable, isItemPresentInCart, getNumOfSpecificItemAddedInCart} = CartHelper();
    const [selectedCategory, setSelectedCategory] = useState('All');
    const inputSearchRef = useRef('');

    const dispatch = useDispatch();
    const {productList, filteredProducts, categoryList} = useSelector(state => state.productReducer);

    const searchAndFilterProducts = (category) => {
        if (category !== undefined) setSelectedCategory(category);
        else category = selectedCategory;

        let products = [];
        const inputValue = inputSearchRef.current.value;
        for (const filteredProductsEl of productList) {
            if ((filteredProductsEl.title).toLowerCase().includes(inputValue.toLowerCase()))
                if (category === 'All') products.push(filteredProductsEl);
                else if (category === filteredProductsEl.category) products.push(filteredProductsEl);
        }
        dispatch(setFilterProducts(products));
    }

    const textTransform = (text, search) => {
        if (search && text) {
            let pattern = search.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');
            pattern = pattern.split(' ').filter((t) => {
                return t.length > 0;
            }).join('|');
            const regex = new RegExp(pattern, 'gi');
            return (
                text.replace(regex, (match) => `<span style="background-color: yellow">${match}</span>`)
            );

        } else {
            return text;
        }
    }

    return (
        <div>
            <div className="max-w-2xl mx-auto py-4 px-2 sm:py-8 sm:px-4 lg:max-w-7xl lg:px-8">

                {loader ? <MyLoader/> : null}

                <div className="mt-2 grid grid-cols-1 sm:grid-cols-6">

                    <div className="relative sm:col-start-1 sm:col-span-2">
                        <input ref={inputSearchRef}
                               onChange={() => searchAndFilterProducts()}
                               type="text"
                               className="w-full py-2 text-sm text-gray-700 bg-white rounded-md border-2 shadow-2xl pl-8
                                          focus:outline-none focus:border-indigo-500"
                               placeholder="search"/>

                        <span className="absolute flex flex-row justify-center items-center inset-y-0
                                         left-0 pl-2">
                              <svg fill="none"
                                   stroke="currentColor"
                                   strokeLinecap="round"
                                   strokeLinejoin="round"
                                   strokeWidth="2"
                                   viewBox="0 0 24 24"
                                   className="w-4 h-4">
                                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                              </svg>
                        </span>
                    </div>

                    <Listbox value={selectedCategory} onChange={category => searchAndFilterProducts(category)}>
                        {({open}) => (
                            <>
                                <div className="relative mt-4 sm:mt-0 sm:col-start-5 sm:col-span-2">
                                    <Listbox.Button
                                        className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm
                                        pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1
                                        focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                          <span className="flex items-center">
                                              <span className="ml-3 block truncate">{selectedCategory}</span>
                                          </span>
                                        <span
                                            className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                            <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                                          </span>
                                    </Listbox.Button>

                                    <Transition
                                        show={open}
                                        as={Fragment}
                                        leave="transition ease-in duration-100"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0">
                                        <Listbox.Options
                                            className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md
                                                       py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto
                                                       focus:outline-none sm:text-sm">
                                            {categoryList.map((category, idx) => (
                                                <Listbox.Option
                                                    key={idx}
                                                    className={({active}) =>
                                                        classNames(
                                                            active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                                            'cursor-default select-none relative py-2 pl-3 pr-9'
                                                        )
                                                    }
                                                    value={category}>
                                                    {({selected, active}) => (
                                                        <>
                                                            <div className="flex items-center">
                                                                <span className={classNames(selected ? 'font-semibold' :
                                                                    'font-normal', 'ml-3 block truncate')}>
                                                            {category}
                                                          </span>
                                                            </div>

                                                            {selected ? (
                                                                <span className={classNames(
                                                                    active ? 'text-white' : 'text-indigo-600',
                                                                    'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                )}>
                                                                <CheckIcon className="h-5 w-5" aria-hidden="true"/>
                                                              </span>
                                                            ) : null}
                                                        </>
                                                    )}
                                                </Listbox.Option>
                                            ))}
                                        </Listbox.Options>
                                    </Transition>
                                </div>
                            </>
                        )}
                    </Listbox>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {filteredProducts.map((product) => (
                        <div key={product.id} className="flex flex-col bg-white p-4 shadow-lg rounded-lg">
                            <Link to={`/product/${product.id}`}>
                                <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden
                                                hover:opacity-75 cursor-pointer lg:h-80 lg:aspect-none">
                                    <img
                                        src={product.image}
                                        alt="Not Found"
                                        className="w-full h-full object-center object-fill"
                                    />
                                </div>
                            </Link>
                            <div className="font-normal">
                                {/*<h3 className="text-base font-medium text-gray-900">{product.title}</h3>*/}
                                <h3 className="text-base text-gray-900"
                                    dangerouslySetInnerHTML={{__html: textTransform(product.title, inputSearchRef.current.value)}}>
                                </h3>
                            </div>
                            <div className="my-4 flex justify-between">
                                <p className="text-sm text-gray-900">${product.price}</p>
                                <p className="text-sm text-gray-900">
                                    <span><i className="fa fa-star"/></span>
                                    <span> {product.rating['rate']}</span>
                                </p>
                            </div>

                            {
                                product.rating['count'] <= 0 ?
                                    (<div className="mt-auto">
                                        <button
                                            disabled
                                            className="flex justify-center items-center px-6 py-2 border border-transparent
                                                       w-full rounded-md shadow-sm text-base text-white
                                                       cursor-not-allowed bg-red-500">
                                            Out of stock
                                        </button>
                                    </div>) :

                                    (
                                        !isItemPresentInCart(product.id) ?
                                            (<div className="mt-auto">
                                                <button
                                                    onClick={() => dispatch(addToCart(product))}
                                                    // onClick={() => onChangeQuantity(1, product, false, true)}
                                                    className="flex justify-center items-center px-6 py-2 border border-transparent
                                                               w-full rounded-md shadow-sm text-base text-white
                                                               cursor-pointer bg-indigo-700 hover:bg-indigo-800">
                                                    Add to Cart
                                                </button>
                                            </div>) :

                                            (<div className="mt-auto">
                                                <div className="flex justify-center items-center px-4 py-1 border border-transparent
                                            rounded-md shadow-sm text-base text-gray-900 bg-gray-100">
                                                    <button
                                                        className="bg-indigo-700 text-white p-2 rounded-lg shadow-sm cursor-pointer"
                                                        onClick={() => dispatch(decQuantity(product.id))}>
                                                        <MinusIcon className="h-3 w-3" aria-hidden="true"/>
                                                    </button>
                                                    <span
                                                        className="mx-3">{getNumOfSpecificItemAddedInCart(product.id)}</span>
                                                    <button className={classNames(
                                                        isProductAvailable(product.id) ? 'bg-indigo-700 text-white' : 'bg-gray-300',
                                                        'p-2 rounded-lg shadow-sm cursor-pointer'
                                                    )}
                                                            disabled={!isProductAvailable(product.id)}
                                                            onClick={() => dispatch(incQuantity(product.id))}>
                                                        <PlusIcon className="h-3 w-3" aria-hidden="true"/>
                                                    </button>
                                                </div>
                                            </div>)
                                    )
                            }
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default ProductList;
