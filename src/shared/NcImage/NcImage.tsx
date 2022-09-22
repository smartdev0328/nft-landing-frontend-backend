import React, { FC, ImgHTMLAttributes } from "react";
import _ from "lodash";

export interface NcImageProps extends ImgHTMLAttributes<HTMLImageElement> {
	containerClassName?: string;
	imgClassName?: string;
}

const NcImage: FC<NcImageProps> = ({
	containerClassName = "",
	alt = "nc-imgs",
	src = "",
	className = "object-cover w-full",
	imgClassName = "",
	...args
}) => {
	const [currentSrc, setCurrentSrc] = React.useState("/assets/images/placeholder.png");
	const imageToLoad = new Image();
	imageToLoad.src = src;
	imageToLoad.onload = () => {
		setCurrentSrc(src);
	};

	return (
		<div className={`nc-NcImage ${containerClassName}`} data-nc-id="NcImage">
			<img
				src={currentSrc}
				style={_.isEmpty(imgClassName) ? { width: "100%", height: "100%" } : {}}
				alt={alt}
				{...args}
				className={imgClassName}
			/>
		</div>
	);
};

export default NcImage;
