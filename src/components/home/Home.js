// import ShoppingContext from "../../context/ShoppingContext";
import Navbar from "../navbar/Navbar";
import ProductList from "../product-list/ProductList";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import ProductOverview from "../product-overview/ProductOverview";
import Checkout from "../checkout/Checkout";
import AboutUs from "../about/AboutUs";
import ContactUs from "../contact/ContactUs";
import ErrorPage from "../error/ErrorPage";
import OrderSummary from "../order-summary/OrderSummary";
import {Provider} from "react-redux";
import store from "../../state/store/store";

const Home = () => {
    return (
        <Router>
            <Provider store={store}>
                <Navbar/>
                <Switch>
                    <Route exact path="/" component={ProductList}/>
                    <Route exact path="/product/:productId" component={ProductOverview}/>
                    <Route exact path="/about" component={AboutUs}/>
                    <Route exact path="/contact" component={ContactUs}/>
                    <Route exact path="/checkout" component={Checkout}/>
                    <Route exact path="/order-summary" component={OrderSummary}/>
                    <Route exact path="*" component={ErrorPage}/>
                </Switch>
            </Provider>
        </Router>
    )
}

export default Home;
