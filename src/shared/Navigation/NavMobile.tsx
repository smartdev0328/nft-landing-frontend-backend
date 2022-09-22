import React from 'react';
import ButtonClose from 'shared/ButtonClose/ButtonClose';
import Logo from 'shared/Logo/Logo';
import { Disclosure } from '@headlessui/react';
import { NavLink } from 'react-router-dom';
import { NavItemType } from './NavigationItem';
import { NAVIGATION_ITEMS } from 'data/navigation';
import ButtonPrimary from 'shared/Button/ButtonPrimary';
import { ChevronDownIcon } from '@heroicons/react/solid';
import SwitchDarkMode from 'shared/SwitchDarkMode/SwitchDarkMode';
import Cookies from 'universal-cookie';

import { sessionStorageItems, userDataInfo } from 'contains/enum';

export interface NavMobileProps {
	data?: NavItemType[];
	onClickClose?: () => void;
}

const NavMobile: React.FC<NavMobileProps> = ({ data = NAVIGATION_ITEMS, onClickClose }) => {
	const cookies = new Cookies();
	const userInfo = cookies.get(sessionStorageItems.USER);
	const wallet = userInfo && userInfo[userDataInfo.WALLET];
	const _renderMenuChild = (item: NavItemType) => {
		return (
			<ul className="nav-mobile-sub-menu pl-6 pb-1 text-base">
				{item.children?.map((i, index) => (
					<Disclosure key={i.href + index} as="li">
						<NavLink
							exact
							strict
							to={{
								pathname: i.href || undefined,
							}}
							className="flex px-4 py-2.5 text-neutral-900 dark:text-neutral-200 text-sm font-medium rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 mt-[2px]"
							activeClassName="text-secondary"
						>
							<span className={!i.children ? 'block w-full' : ''} onClick={onClickClose}>
								{i.name}
							</span>
							{i.children && (
								<span className="block flex-grow" onClick={(e) => e.preventDefault()}>
									<Disclosure.Button as="span" className="flex justify-end flex-grow">
										<ChevronDownIcon className="ml-2 h-4 w-4 text-neutral-500" aria-hidden="true" />
									</Disclosure.Button>
								</span>
							)}
						</NavLink>
						{i.children && <Disclosure.Panel>{_renderMenuChild(i)}</Disclosure.Panel>}
					</Disclosure>
				))}
			</ul>
		);
	};

	const _renderItem = (item: NavItemType, index: number) => {
		return (
			<Disclosure key={item.id} as="li" className="text-neutral-900 dark:text-white">
				<NavLink
					exact
					strict
					className="flex w-full items-center py-2.5 px-4 font-medium uppercase tracking-wide text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg"
					to={{
						pathname: item.href || undefined,
					}}
					activeClassName="text-secondary"
				>
					<span className={!item.children ? 'block w-full' : ''} onClick={onClickClose}>
						{item.name}
					</span>
					{item.children && (
						<span className="block flex-grow" onClick={(e) => e.preventDefault()}>
							<Disclosure.Button as="span" className="flex justify-end flex-grow">
								<ChevronDownIcon className="ml-2 h-4 w-4 text-neutral-500" aria-hidden="true" />
							</Disclosure.Button>
						</span>
					)}
				</NavLink>
				{item.children && <Disclosure.Panel>{_renderMenuChild(item)}</Disclosure.Panel>}
			</Disclosure>
		);
	};

	return (
		<div className="overflow-y-auto w-full max-w-sm h-screen py-2 transition transform shadow-lg ring-1 dark:ring-neutral-700 bg-white dark:bg-neutral-900 divide-y-2 divide-neutral-100 dark:divide-neutral-800">
			<div className="py-6 px-5">
				<Logo />
				<div className="flex flex-col mt-5 text-neutral-700 dark:text-neutral-300 text-sm">
					<span>
						Reimagine a Play-to-Earn Metaverse, where the virtual and real world converge!
					</span>

					<div className="flex justify-between items-center mt-4">
						<span className="block">
							<SwitchDarkMode className="bg-neutral-100 dark:bg-neutral-800" />
						</span>
					</div>
				</div>
				<span className="absolute right-2 top-2 p-1">
					<ButtonClose onClick={onClickClose} />
				</span>
			</div>
			<ul className="flex flex-col py-6 px-2 space-y-1">{data.map(_renderItem)}</ul>
			<div className="flex items-center justify-between py-6 px-5 space-x-2">
				{(wallet && wallet.toLowerCase() !== 'none') ||
				cookies.get('auth') == 'no' ||
				cookies.get('auth') == null ? null : (
					<ButtonPrimary href={'/connect-wallet'} className="w-full" onClick={onClickClose}>
						Bind Wallet
					</ButtonPrimary>
				)}
			</div>
		</div>
	);
};

export default NavMobile;
