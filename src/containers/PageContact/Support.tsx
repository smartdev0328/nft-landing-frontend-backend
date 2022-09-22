import React, { FC } from "react";
import { Helmet } from "react-helmet";
import imagePng from "images/SupportEmail.jpg";
/* import imagePng from "images/assets/images/logo/discord.jpg"; */
import { MaterialIcon } from "shared/Icons/MaterialIcon";

export interface PageContactProps {
	className?: string;
}

const PageContact: FC<PageContactProps> = ({ className = "" }) => {
	return (
		<div className={`nc-PageContact overflow-hidden ${className}`} data-nc-id="PageContact">
			<Helmet>
				<title>Affyn.com | Support</title>
			</Helmet>
			<div className="mb-24 lg:mb-32">
				<div className="app-support-containers ml-5 mr-5">
					<div className="app-support-text">
						<h2 className="my-5 flex items-center leading-[115%] text-4xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 text-center mb-10 mt-24">
							Contact our Support
						</h2>
					</div>
					{/*<div className="app-support-image-links flex my-5">
						<div className="container max-w-4xl mx-auto">
							<a href="https://t.me/affynofficial" target="_blank" rel="noreferrer">
								<div className="telegram-container w-full items-center">
									<div className="icon-wrapper mr-2 md:text-4xl">
										<MaterialIcon iconName="Telegram"></MaterialIcon>
									</div>
									<h2 className="flex items-center leading-[115%] md:text-3xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
										Telegram
									</h2>
								</div>
							</a>
						</div>
						<div className="container max-w-4xl mx-auto">
							<a href="https://discord.io/affynofficial" target="_blank" rel="noreferrer">
								<img className="w-full items-center" src={imagePng} alt="hero" />
							</a>
						</div>
					</div>*/}
				</div>
				<div className="container max-w-4xl mx-auto">
					<div className="mb-10 items-center">
						<span>
							{/* Email us at :{" "} */}
							<a href="mailto:support@affyn.com" target="_blank">
								<img className="w-full items-center rounded-xl sm:rounded-3xl" src={imagePng} alt="hero" />
							</a>
						</span>
					</div>
				</div>
				<div className="container max-w-4xl mx-auto">
					<div className="text-base md:text-lg text-neutral-500 dark:text-neutral-400 text-center">
						<span>
							For technical support, email us at: {" "}
							<a href="mailto:support@affyn.com">
								<b>support@affyn.com</b>
							</a>
						</span>
					</div>
					<div className="text-base md:text-lg text-neutral-500 dark:text-neutral-400 text-center mt-6">
						For Buddy purchase tutorial&nbsp;
						<a href="https://affyn.docsend.com/view/4hr8c35635j7ity2" target="_blank">
							<b className="text-black dark:text-white">click here</b>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PageContact;
