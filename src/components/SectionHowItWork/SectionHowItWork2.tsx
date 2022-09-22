import React, { FC } from "react";
import NcImage from "shared/NcImage/NcImage";
import HIW1img from "images/Nex-icon.png";
import HIW2img from "images/HIW2-egg.png";
import HIW3img from "images/BuddiesGroup.png";
import arrowimg from "images/Arrow-right.png";
import Badge from "shared/Badge/Badge";

export interface SectionHowItWorkProps {
	className?: string;
	data?: typeof DEMO_DATA[0][];
}

const DEMO_DATA = [
	{
		id: 1,
		img: HIW1img,
		imgDark: HIW1img,
		title: "Purchase your Gen Zero Buddy from NEXUS Store",
		desc: "Each account can only purchase up to 1 Buddy",
	},
	{
		id: 2,
		img: HIW2img,
		imgDark: HIW2img,
		title: "All Gen Zero Buddies are of Mythical rarity",
		desc: "Upon purchase the egg will be hatched within a few days",
	},
	{
		id: 3,
		img: HIW3img,
		imgDark: HIW3img,
		title: "4 types of Mythical Buddies to get your hands on",
		desc: "Pegasus, Gagamaru, Nessie and Floomph",
	},
];

const SectionHowItWork: FC<SectionHowItWorkProps> = ({ className = "", data = DEMO_DATA }) => {
	return (
		<div className={`nc-SectionHowItWork  ${className}`} data-nc-id="SectionHowItWork">
			<div className="text-base md:text-2xl text-neutral-500 dark:text-neutral-400 text-center mb-10">
				For Buddy purchase tutorial&nbsp;
				<a href="https://affyn.docsend.com/view/4hr8c35635j7ity2" target="_blank">
					<b className="text-black dark:text-white">click here</b>
				</a>
			</div>
			<div className="relative grid grid-row-3 md:grid-cols-1 xl:grid-cols-8 gap-5 sm:gap-16 xl:gap-10 ">
				{/* Step 1 */}
				<div className="col-span-2 relative flex flex-col items-center max-w-xs mx-auto rounded-3xl p-10 pt-0 bg-neutral-100 dark:bg-black/20">
					<NcImage
						containerClassName="mb-5 max-h-[200px] mx-auto"
						src={HIW1img}
						imgClassName="scale-75"
					/>
					<div className="text-center mt-auto space-y-5">
						<Badge
							name={`Step 1`}
							/*  color={!index ? 'blue' : index === 1 ? 'pink' : index === 2 ? 'yellow' : 'green'} */
							color={"blue"}
						/>
						<h3 className="text-lg font-semibold">Purchase your Gen Zero Buddy from NEXUS Store</h3>
						<span className="block text-neutral-500 dark:text-neutral-400">
							Each account can only purchase up to 1 Buddy
						</span>
					</div>
				</div>
				{/* arrow */}
				<div>
					<NcImage
						containerClassName="invisible xl:visible h-0 xl:h-min my-auto xl:mt-52 "
						src={arrowimg}
					/>
				</div>
				{/* Step 2 */}
				<div className="col-span-2 relative flex flex-col items-center max-w-xs mx-auto rounded-3xl p-10 pt-0 bg-neutral-100 dark:bg-black/20">
					<NcImage containerClassName=" max-h-[200px] mx-auto" src={HIW2img} imgClassName="mt-6" />
					<div className="text-center mt-auto space-y-5">
						<Badge
							name={`Step 2`}
							/*  color={!index ? 'blue' : index === 1 ? 'pink' : index === 2 ? 'yellow' : 'green'} */
							color={"pink"}
						/>
						<h3 className="text-lg font-semibold">All Gen Zero Buddies are of Mythical rarity</h3>
						<span className="block text-neutral-500 dark:text-neutral-400">
							Upon purchase the egg will be hatched within a few days
						</span>
					</div>
				</div>
				{/* arrow */}
				<div>
					<NcImage
						containerClassName="invisible xl:visible h-0 xl:h-min my-auto xl:mt-52 "
						src={arrowimg}
					/>
				</div>
				{/* Step 3 */}
				<div className="col-span-2 relative flex flex-col items-center max-w-xs mx-auto rounded-3xl p-10 bg-neutral-100 dark:bg-black/20">
					<NcImage containerClassName="mb-5 max-h-[200px] mx-auto" src={HIW3img} />
					<div className="text-center mt-auto space-y-5">
						<Badge
							name={`Step 3`}
							/*  color={!index ? 'blue' : index === 1 ? 'pink' : index === 2 ? 'yellow' : 'green'} */
							color={"green"}
						/>
						<h3 className="text-lg font-semibold">
							4 types of Mythical Buddies to get your hands on
						</h3>
						<span className="block text-neutral-500 dark:text-neutral-400">
							Pegasus, Gagamaru, Nessie and Floomph
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SectionHowItWork;
