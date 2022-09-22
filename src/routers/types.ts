import { ComponentType } from 'react';

export interface LocationStates {
  '/'?: {};
  '/#'?: {};
  '/home2'?: {};
  '/nexus_store'?: {};
  '/home/inventory'?: {};
  '/inventory'?: {};
  //
  '/nft-detailt'?: {};
  '/nft-detail1'?: {};
  '/nft-detail2'?: {};
  '/nft-detail3'?: {};
  '/nft-detail4'?: {};
  '/page-collection'?: {};
  '/page-search'?: {};
  '/page-author'?: {};
  '/home-header-2'?: {};
  '/connect-wallet'?: {};
  '/dashboard'?: {};
  '/resend-otp'?: {};
  //
  '/account'?: {};
  '/about'?: {};
  '/support'?: {};
  '/login'?: {};
  '/signup'?: {};
  '/forgot-pass'?: {};
  '/reset-pass/:token'?: {};
  '/reset-success'?: {};
  '/page404'?: {};
  '/subscription'?: {};
  '/verify/:token'?: {};
}

export type PathName = keyof LocationStates;

export interface Page {
  path: PathName;
  exact?: boolean;
  component: ComponentType<Object>;
}
