import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Page } from "./types";
import ScrollToTop from "./ScrollToTop";
import Footer from "shared/Footer/Footer";
import PageHome from "containers/PageHome/PageHome2";
import Page404 from "containers/Page404/Page404";
import AccountPage from "containers/AccountPage/AccountPage";
import Support from "containers/PageContact/Support";
import PageSignUp from "containers/PageSignUp/PageSignUp";
import ResendOTP from "containers/PageSignUp/ResendOTP";
import PageLogin from "containers/PageLogin/PageLogin";
import PageSubcription from "containers/PageSubcription/PageSubcription";
import SiteHeader from "containers/SiteHeader";
import NftDetailPage from "containers/NftDetailPageOverall/NftDetailPage";

import PageConnectWallet from "containers/PageConnectWallet";
import PageHome2 from "containers/PageHome/PageHome2";
import Verify from "containers/PageSignUp/Verify";
import ForgotPass from "containers/PageLogin/ForgotPass";
import ResetPass from "containers/PageLogin/ResetPass";
import ResetSuccess from "containers/PageLogin/ResetSuccess";
import PrivateRoute from "./PrivateRoute";
import Inventory from "containers/AuthorPage/Inventory";

import { nftCategory } from "contains/addresses";

export const pages: Page[] = [
  // { path: '/', exact: true, component: PageHome2 },
  { path: "/#", exact: true, component: PageHome2 },
  { path: "/home2", exact: true, component: PageHome },
  //
  { path: "/home-header-2", exact: true, component: PageHome },
  // { path: '/nft-detailt', component: NftDetailPage4 },
  // { path: '/nft-detail1', component: NftDetailPage },
  // { path: '/nft-detail2', component: NftDetailPage1 },
  // { path: '/nft-detail3', component: NftDetailPage2 },
  // { path: '/nft-detail4', component: NftDetailPage3 },
  { path: "/dashboard", component: Inventory },
  { path: "/account", component: AccountPage },
  { path: "/connect-wallet", component: PageConnectWallet },
  { path: "/forgot-pass", component: ForgotPass },
  { path: "/reset-pass/:token", component: ResetPass },
  { path: "/reset-success", component: ResetSuccess },
  { path: "/resend-otp", component: ResendOTP },
  // { path: '/support', component: Support },
  // { path: '/signup', component: PageSignUp },
  // { path: '/login', component: PageLogin },
  { path: "/subscription", component: PageSubcription },
  // { path: '/verify/:token', component: Verify },
  // { path: '/login', component: PageLogin },
  { path: "/inventory", component: Inventory },
  { path: "/subscription", component: PageSubcription },
];

const Routes = () => {
  return (
    <BrowserRouter basename="/">
      <ScrollToTop />
      <SiteHeader />
      <Switch>
        <Route path="/" exact component={PageHome2}></Route>
        <Route path="/login" component={PageLogin}></Route>
        <Route path="/signup" component={PageSignUp}></Route>
        <Route path="/support" component={Support}></Route>
        <Route path="/forgot-pass" component={ForgotPass}></Route>
        <Route path="/reset-pass/:token" component={ResetPass}></Route>
        <Route path="/reset-success" component={ResetSuccess}></Route>
        {/*<Route path="/resend-otp" component={ResendOTP}></Route>*/}
        <Route exact path="/verify/:token" component={Verify}></Route>
        {pages.map(({ component, path, exact }) => {
          return (
            <PrivateRoute
              key={path}
              component={component}
              exact={!!exact}
              path={path}
            />
          );
        })}

        <PrivateRoute
          exact={false}
          path={"/Floomph"}
          render={() => (
            <NftDetailPage category={nftCategory.Floomph} nftName={"Floomph"} />
          )}
        />

        <PrivateRoute
          exact={false}
          path={"/Nessie"}
          render={() => (
            <NftDetailPage category={nftCategory.Nessie} nftName={"Nessie"} />
          )}
        />

        <PrivateRoute
          exact={false}
          path={"/Gagamaru"}
          render={() => (
            <NftDetailPage
              category={nftCategory.Gagamaru}
              nftName={"Gagamaru"}
            />
          )}
        />

        <PrivateRoute
          exact={false}
          path={"/Pigasus"}
          render={() => (
            <NftDetailPage category={nftCategory.Pigasus} nftName={"Pigasus"} />
          )}
        />

        <Route component={Page404} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default Routes;
