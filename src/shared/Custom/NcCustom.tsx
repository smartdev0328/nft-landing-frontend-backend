import React, { FC, useState, Fragment } from "react";
import { Combobox, Transition } from "@headlessui/react";
/* import { Link } from "react-router-dom"; */
import NcImage from "shared/NcImage/NcImage";
import droparrowIco from "images/droparrow.png";
import { Dialog } from "@mui/material";

export interface CustomProps {
	className?: string;
	updateNationality: React.Dispatch<React.SetStateAction<string>>;
}

const NcCustom: FC<CustomProps> = ({ updateNationality, className = "" }) => {
	const [isOpen, setIsOpen] = useState(true);

	const nationality = [
		{ id: 1, name: "Algerian" },
		{ id: 2, name: "American" },
		{ id: 3, name: "Andorran" },
		{ id: 4, name: "Angolan" },
		{ id: 5, name: "Argentinian" },
		{ id: 6, name: "Armenian" },
		{ id: 7, name: "Australian" },
		{ id: 8, name: "Austrian" },
		{ id: 9, name: "Azerbaijani" },
		{ id: 10, name: "Bahamian" },
		{ id: 11, name: "Bahraini" },
		{ id: 12, name: "Bangladeshi" },
		{ id: 13, name: "Barbadian" },
		{ id: 14, name: "Belgian" },
		{ id: 15, name: "Belizean" },
		{ id: 16, name: "Beninese" },
		{ id: 17, name: "Bermudian" },
		{ id: 18, name: "Bhutanese" },
		{ id: 19, name: "Bolivian" },
		{ id: 20, name: "Botswana" },
		{ id: 21, name: "Brazilian" },
		{ id: 22, name: "British" },
		{ id: 23, name: "Bulgarian" },
		{ id: 24, name: "Burkinese" },
		{ id: 25, name: "Cambodian" },
		{ id: 26, name: "Cameroonian" },
		{ id: 27, name: "Canadian" },
		{ id: 28, name: "Cape Verdean" },
		{ id: 29, name: "Chadian" },
		{ id: 30, name: "Chilean" },
		{ id: 31, name: "Colombian" },
		{ id: 32, name: "Costa Rican" },
		{ id: 33, name: "Croatian" },
		{ id: 34, name: "Cypriot" },
		{ id: 35, name: "Czech" },
		{ id: 36, name: "Danish" },
		{ id: 37, name: "Djiboutian" },
		{ id: 38, name: "Dominican" },
		{ id: 39, name: "Dominican" },
		{ id: 40, name: "Dutch" },
		{ id: 41, name: "Ecuadorean" },
		{ id: 42, name: "Egyptian" },
		{ id: 43, name: "Emirati" },
		{ id: 44, name: "English" },
		{ id: 45, name: "Estonian" },
		{ id: 46, name: "Fijian" },
		{ id: 47, name: "Finnish" },
		{ id: 48, name: "French" },
		{ id: 49, name: "Gabonese" },
		{ id: 50, name: "Gambian" },
		{ id: 51, name: "Georgian" },
		{ id: 52, name: "German" },
		{ id: 53, name: "Ghanaian" },
		{ id: 54, name: "Greek" },
		{ id: 55, name: "Grenadian" },
		{ id: 56, name: "Guatemalan" },
		{ id: 57, name: "Guyanese" },
		{ id: 58, name: "Honduran" },
		{ id: 59, name: "Hongkonger" },
		{ id: 60, name: "Hungarian" },
		{ id: 61, name: "Icelandic" },
		{ id: 62, name: "Indian" },
		{ id: 63, name: "Indonesian" },
		{ id: 64, name: "Irish" },
		{ id: 65, name: "Israeli" },
		{ id: 66, name: "Italian" },
		{ id: 67, name: "Jamaican" },
		{ id: 68, name: "Japanese" },
		{ id: 69, name: "Jordanian" },
		{ id: 70, name: "Kazakh" },
		{ id: 71, name: "Kenyan" },
		{ id: 72, name: "Kuwaiti" },
		{ id: 73, name: "Lao" },
		{ id: 74, name: "Latvian" },
		{ id: 75, name: "Lithuanian" },
		{ id: 76, name: "Luxembourg" },
		{ id: 77, name: "Malagasy" },
		{ id: 78, name: "Malawian" },
		{ id: 79, name: "Malaysian" },
		{ id: 80, name: "Maldivian" },
		{ id: 81, name: "Malian" },
		{ id: 82, name: "Maltese" },
		{ id: 83, name: "Mauritanian" },
		{ id: 84, name: "Mauritian" },
		{ id: 85, name: "Mexican" },
		{ id: 86, name: "Monacan" },
		{ id: 87, name: "Mongolian" },
		{ id: 88, name: "Montenegrin" },
		{ id: 89, name: "Moroccan" },
		{ id: 90, name: "Mozambican" },
		{ id: 91, name: "Namibian" },
		{ id: 92, name: "Nepalese" },
		{ id: 93, name: "New Zealand" },
		{ id: 94, name: "Nicaraguan" },
		{ id: 95, name: "Nigerian" },
		{ id: 96, name: "Nigerien" },
		{ id: 97, name: "Norwegian" },
		{ id: 98, name: "Omani" },
		{ id: 99, name: "Pakistani" },
		{ id: 100, name: "Panamanian" },
		{ id: 101, name: "Paraguayan" },
		{ id: 102, name: "Peruvian" },
		{ id: 103, name: "Philippine" },
		{ id: 104, name: "Polish" },
		{ id: 105, name: "Polynesian" },
		{ id: 106, name: "Portuguese" },
		{ id: 107, name: "Qatari" },
		{ id: 108, name: "Romanian" },
		{ id: 109, name: "Salvadorian" },
		{ id: 110, name: "Samoan" },
		{ id: 111, name: "Saudi Arabian" },
		{ id: 112, name: "Scottish" },
		{ id: 113, name: "Senegalese" },
		{ id: 114, name: "Serbian" },
		{ id: 115, name: "Sierra Leonian" },
		{ id: 116, name: "Singaporean" },
		{ id: 117, name: "Slomoni" },
		{ id: 118, name: "Slovak" },
		{ id: 119, name: "Slovenian" },
		{ id: 120, name: "South African" },
		{ id: 121, name: "South Korean" },
		{ id: 122, name: "Spanish" },
		{ id: 123, name: "Surinamese" },
		{ id: 124, name: "Swazi" },
		{ id: 125, name: "Swedish" },
		{ id: 126, name: "Swiss" },
		{ id: 127, name: "Taiwanese" },
		{ id: 128, name: "Tajikistani" },
		{ id: 129, name: "Thai" },
		{ id: 130, name: "Togolese" },
		{ id: 131, name: "Tongan" },
		{ id: 132, name: "Turkish" },
		{ id: 133, name: "Turkoman" },
		{ id: 134, name: "Tuvaluan" },
		{ id: 135, name: "Ukrainian" },
		{ id: 136, name: "Uruguayan" },
		{ id: 137, name: "Uzbek" },
		{ id: 138, name: "Vanuatuan" },
		{ id: 139, name: "Vietnamese" },
		{ id: 140, name: "Welsh" },
		{ id: 141, name: "Zambian" },
	];

	const [query, setQuery] = useState("");
	const [selected, setSelected] = useState("");

	const filteredCountry =
		query === ""
			? nationality
			: nationality.filter((nationality) =>
					nationality.name.toUpperCase().includes(query.toUpperCase())
			  );

	return (
		<Combobox
			value={selected}
			onChange={(event) => {
				setSelected(event);
				updateNationality(event);
			}}
			as="div"
			className="rounded-xl max-h-60 overflow-y-auto divide-y divide-gray-200 "
		>
			<Combobox.Input
				onChange={(event) => setQuery(event.target.value)}
				className="item-center w-full border-0 focus:ring-0 bg-gray-200 dark:!bg-neutral-50 text-gray-800 "
				placeholder="- Select Nationality -"
			></Combobox.Input>
			<Combobox.Button className="absolute inset-y-0 right-0 flex pr-4 pt-1 !border-0">
				<NcImage
					src={droparrowIco}
					className="w-8 h-8"
					imgClassName="input-dropdown object-cover w-full h-full"
				/>
			</Combobox.Button>
			<Combobox.Options>
				{filteredCountry.map((nationality) => (
					<Combobox.Option key={nationality.id} value={nationality.name.toUpperCase()}>
						{({ active }) => (
							<div
								className={`space-x-1 px-4 py-4  ${
									active ? "bg-indigo-600" : "bg-gray-100 dark:bg-gray-200"
								}`}
							>
								<span className={`${active ? "text-white" : "text-gray-500"}`}>
									{nationality.name.toUpperCase()}
								</span>
							</div>
						)}
					</Combobox.Option>
				))}
			</Combobox.Options>
			{query && filteredCountry.length === 0 && (
				<p className="p-4 bg-white text-gray-500 bg-gray-100 dark:bg-gray-200'">No results found</p>
			)}
		</Combobox>
	);
};

export default NcCustom;
