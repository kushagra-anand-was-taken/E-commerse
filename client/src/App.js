import React, { useEffect, lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { currentUser } from "./functions/auth";
import { getCategories } from "./functions/category";
import { LoadingOutlined } from "@ant-design/icons";

const Navbar = lazy(() => import("./layout/Navbar"));
const Login = lazy(() => import("./layout/Login"));
const Register = lazy(() => import("./layout/Register"));
const ForgotPassword = lazy(() => import("./layout/ForgotPassword"));
const Landing = lazy(() => import("./layout/Landing"));
const RegisterComplete = lazy(() => import("./layout/RegisterComplete"));
const UserRoute = lazy(() => import("./components/UserRoute"));
const AdminRoute = lazy(() => import("./components/AdminRoute"));
const History = lazy(() => import("./components/user/History"));
const Password = lazy(() => import("./components/user/Password"));
const Wishlist = lazy(() => import("./components/user/Wishlist"));
const AdminDashboard = lazy(() => import("./components/user/AdminDashboard"));
const CategoryCreate = lazy(() =>
  import("./components/category/CategoryCreate")
);
const CategoryUpdate = lazy(() =>
  import("./components/category/CategoryUpdate")
);
const SubUpdate = lazy(() => import("./components/category/SubUpdate"));
const SubCreate = lazy(() => import("./components/category/SubCreate"));
const ProductCreate = lazy(() => import("./components/product/ProductCreate"));
const AllProducts = lazy(() => import("./components/product/AllProducts"));
const ProductUpdate = lazy(() => import("./components/product/ProductUpdate"));
const Product = lazy(() => import("./layout/Product"));
const CategoryHome = lazy(() => import("./components/category/CategoryHome"));
const SubHome = lazy(() => import("./components/category/SubHome"));
const Shop = lazy(() => import("./components/filter/Shop"));
const Cart = lazy(() => import("./layout/Cart"));
const SideDrawer = lazy(() => import("./components/drawer/SideDrawer"));
const Checkout = lazy(() => import("./components/cart/Checkout"));
const CreateCouponPage = lazy(() =>
  import("./components/coupon/CreateCouponPage")
);
const Payment = lazy(() => import("./components/payment/Payment"));

function App() {
  const dispatch = useDispatch();

  // to check firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        // console.log("user", user);

        dispatch(currentUser(idTokenResult.token));
      }
    });
    dispatch(getCategories());
    // cleanup
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <div className="App">
      <Suspense
        fallback={
          <div className="col text-center p-5">
            __ React Redux EC
            <LoadingOutlined />
            MMERCE __
          </div>
        }
      >
        <Navbar />
        <ToastContainer />
        <SideDrawer />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/register/complete" component={RegisterComplete} />
          <Route exact path="/forgot/password" component={ForgotPassword} />
          <UserRoute exact path="/user/history" component={History} />
          <UserRoute exact path="/user/password" component={Password} />
          <UserRoute exact path="/user/wishlist" component={Wishlist} />
          <AdminRoute
            exact
            path="/admin/dashboard"
            component={AdminDashboard}
          />
          <AdminRoute exact path="/admin/category" component={CategoryCreate} />
          <AdminRoute exact path="/admin/sub" component={SubCreate} />
          <AdminRoute
            exact
            path="/admin/category/:id"
            component={CategoryUpdate}
          />
          <AdminRoute exact path="/admin/sub/:id" component={SubUpdate} />
          <AdminRoute exact path="/admin/product" component={ProductCreate} />
          <AdminRoute exact path="/admin/products" component={AllProducts} />
          <AdminRoute
            exact
            path="/admin/product/:slug"
            component={ProductUpdate}
          />
          <Route exact path="/product/:slug" component={Product} />
          <Route exact path="/category/:id" component={CategoryHome} />
          <Route exact path="/sub/:id" component={SubHome} />
          <Route exact path="/shop" component={Shop} />
          <Route exact path="/cart" component={Cart} />
          <UserRoute exact path="/checkout" component={Checkout} />
          <AdminRoute exact path="/admin/coupon" component={CreateCouponPage} />
          <UserRoute exact path="/payment" component={Payment} />
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
