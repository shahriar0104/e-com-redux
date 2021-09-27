import classNames from "../../helper/ClassNameJoiner";
import CartHelper from "../../helper/CartHelper";
import {useDispatch, useSelector} from "react-redux";
import {changeQuantity, decQuantity, incQuantity, removeItem} from "../../state/action/cartActions";

const CartItemShow = () => {
    const dispatch = useDispatch();
    const cartItemList = useSelector(state => state.cartReducer.cartItemList);
    const {
        isProductAvailable,
        getNumOfSpecificItemAddedInCart,
    } = CartHelper();

  return (
      <div className="flow-root">
          <ul role="presentation" className="-my-6 divide-y divide-gray-200">
              {[...cartItemList.keys()].map((cartItemKey) => (
                  <li key={cartItemKey} className="py-6 flex">
                      <div
                          className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                          <img
                              src={cartItemList.get(cartItemKey).image}
                              alt="Not Found"
                              className="w-full h-full object-center object-fill"
                          />
                      </div>

                      <div className="ml-4 flex-1 flex flex-col">
                          <div>
                              <div
                                  className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>
                                      <a href={cartItemList.get(cartItemKey).href}>{cartItemList.get(cartItemKey).title}</a>
                                  </h3>
                                  <p className="ml-4">${(cartItemList.get(cartItemKey).price
                                      * getNumOfSpecificItemAddedInCart(cartItemKey)).toFixed(2)}</p>
                              </div>
                              {/*<p className="mt-1 text-sm text-gray-500">{product.color}</p>*/}
                          </div>
                          <div
                              className="mt-2 flex-1 flex items-center items-end justify-between text-sm">
                              {/*<p className="text-gray-500">Qty {product.quantity}</p>*/}
                              <div
                                  className="relative text-gray-600 focus-within:text-gray-400">
                                  <input type="number"
                                         className="cart-quantity w-6/12 py-2 text-sm text-gray-900 bg-gray-200 rounded-md pl-2
                                                    focus:outline-none focus:bg-white focus:ring-indigo-500 focus:ring-2"
                                         value={cartItemList.get(cartItemKey).quantity}
                                         onChange={event => dispatch(changeQuantity(cartItemKey, event.target.value))}/>

                                  <span className="absolute flex flex-col justify-center items-center inset-y-0 left-8 sm:left-10 lg:left-12 pl-2">
                                        <button disabled={!isProductAvailable(cartItemKey)}
                                                onClick={(event) => {
                                                    event.preventDefault();
                                                    dispatch(incQuantity(cartItemKey));
                                                }}
                                                // onClick={() => onChangeQuantity(Number(cartItem.quantity), cartItem, true, true)}
                                                className={classNames(
                                                    isProductAvailable(cartItemKey) ? 'hover:text-indigo-600' : 'hover:text-gray-600',
                                                    'focus:outline-none focus:shadow-outline'
                                                )}>
                                          <svg fill="none"
                                               stroke="currentColor"
                                               strokeLinecap="round"
                                               strokeLinejoin="round"
                                               strokeWidth="2"
                                               viewBox="0 0 24 24"
                                               className="w-4 h-4">
                                              <path d="M5 15l7-7 7 7"/>
                                          </svg>
                                        </button>

                                        <button disabled={cartItemList.get(cartItemKey).quantity === 1}
                                                onClick={(event) => {
                                                    event.preventDefault();
                                                    dispatch(decQuantity(cartItemKey));
                                                }}
                                                // onClick={() => onChangeQuantity(Number(cartItem.quantity), cartItem, true,false)}
                                                className={classNames(
                                                    cartItemList.get(cartItemKey).quantity !== 1 ? 'hover:text-indigo-600' : 'hover:text-gray-600',
                                                    'focus:outline-none focus:shadow-outline'
                                                )}>
                                            <svg fill="none"
                                                 stroke="currentColor"
                                                 strokeLinecap="round"
                                                 strokeLinejoin="round"
                                                 strokeWidth="2"
                                                 viewBox="0 0 24 24"
                                                 className="w-4 h-4">
                                              <path d="M19 9l-7 7-7-7"/>
                                          </svg>
                                        </button>
                                </span>
                              </div>

                              <div className="flex">
                                  <button type="button"
                                          onClick={() => dispatch(removeItem(cartItemKey))}
                                          className="font-medium text-indigo-600 hover:text-indigo-500">
                                      Remove
                                  </button>
                              </div>
                          </div>
                      </div>
                  </li>
              ))}
          </ul>
      </div>
  )
}

export default CartItemShow;
