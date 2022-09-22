import Nexus from 'shared/Icons/Nexus';
import { NavItemType } from 'shared/Navigation/NavigationItem';
import ncNanoId from 'utils/ncNanoId';

const otherPageChildMenus: NavItemType[] = [
  {
    id: ncNanoId(),
    href: '/home2',
    name: 'Home Demo - 2'
  },
  {
    id: ncNanoId(),
    href: '/page-collection',
    name: 'Collection page'
  },
  {
    id: ncNanoId(),
    href: '/page-search',
    name: 'Search page'
  },
  {
    id: ncNanoId(),
    href: '/page-author',
    name: 'Author Profile'
  },
  {
    id: ncNanoId(),
    href: '/account',
    name: 'Account settings'
  },
  {
    id: ncNanoId(),
    href: '/connect-wallet',
    name: 'Connect Wallet'
  },

  {
    id: ncNanoId(),
    href: '/about',
    name: 'Other Pages',
    type: 'dropdown',
    children: [
      {
        id: ncNanoId(),
        href: '/about',
        name: 'About'
      },
      {
        id: ncNanoId(),
        href: '/support',
        name: 'Contact us'
      },
      {
        id: ncNanoId(),
        href: '/login',
        name: 'Login'
      },
      {
        id: ncNanoId(),
        href: '/signup',
        name: 'Signup'
      },
      {
        id: ncNanoId(),
        href: '/subscription',
        name: 'Subscription'
      }
    ]
  }
];

export const NAVIGATION_ITEMS: NavItemType[] = [
  {
    id: ncNanoId(),
    href: '/inventory',
    name: 'Inventory',
    icon: 'Dashboard',
    requireLogin: true
  },
  {
    id: ncNanoId(),
    href: '/',
    name: 'Nexus Store',
    childrenNode: Nexus()
  },
  {
    id: ncNanoId(),
    href: '/support',
    name: 'Support',
    icon: 'HeadsetMicOutlined'
  }
];
