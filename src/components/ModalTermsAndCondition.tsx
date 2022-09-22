import { Checkbox, Dialog } from "@material-ui/core";
import { FC, useState } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";

export interface ModalTermsAndConditionProps {
	show: boolean;
	onClose: () => void;
	onAgreeConfirm: () => void;
}

const ModalTermsAndCondition: FC<ModalTermsAndConditionProps> = ({
	show,
	onClose,
	onAgreeConfirm,
}) => {
	const [isChecked, setChecked] = useState(false);
	const handleCheckboxOnChange = (isCheckboxChecked: boolean) => {
		setChecked(isCheckboxChecked);
	};
	return (
		<Dialog open={show} onClose={onClose}>
			<div className="dialog-content-container items-center flex-column">
				<h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-800">
					Terms and Conditions
				</h3>
				<br />
				<span className="text-sm terms-and-condition-wrapper">
					<span>
					<p><strong><u>IMPORTANT</u></strong></p>
<p>&nbsp;</p>
<p><strong>THIS NON-FUNGIBLE TOKEN SALE AGREEMENT (THIS &ldquo;AGREEMENT&rdquo;) IS ENTERED BETWEEN YOU (THE &ldquo;PURCHASER&rdquo;) AND AFFYN PTE. LTD. (THE &ldquo;SELLER&rdquo;). THE PURCHASER AND THE SELLER ARE HEREIN REFERRED TO EACH AS A &ldquo;PARTY&rdquo; AND COLLECTIVELY AS THE &ldquo;PARTIES&rdquo;. PLEASE READ ALL THE TERMS UNDER THIS AGREEMENT CAREFULLY BEFORE CLICKING THE &ldquo;I AGREE&rdquo; BUTTON. BY CLICKING THE &ldquo;I AGREE&rdquo; BUTTON, YOU ACKNOWLEDGE YOU HAVE READ AND UNDERSTOOD ALL THE TERMS AND CONDITIONS IN THIS AGREEMENT AND AGREE TO ALL THE TERMS AND CONDITIONS SET FORTH IN THIS AGREEMENT. IF YOU DO NOT AGREE TO ALL THE TERMS OF THIS AGREEMENT, DO NOT CLICK &ldquo;I AGREE.&rdquo;</strong></p>
<p>&nbsp;</p>
<p><strong>WHEREAS:</strong></p>
<p>&nbsp;</p>
<p>(A) The Seller intends to issue non-fungible tokens which are known as Buddy NFTs.</p>
<p>&nbsp;</p>
<p>(B) The Seller is developing a utopian metaverse named as &ldquo;NEXUS&rdquo; (the &ldquo;<strong>NEXUS Platform</strong>&rdquo;). The Buddy NFTs are designed to be digital assets that can be used on the NEXUS Platform.</p>
<p>&nbsp;</p>
<p>(C) By purchasing Buddy NFTs and indicating the acceptance of the terms and conditions on this Website, the Purchaser will be bound by the terms and conditions of this Agreement and the Website.</p>
<p>&nbsp;</p>
<p><strong>THE PARTIES AGREE as follows:</strong></p>
<p>&nbsp;</p>
<p><strong>1. DEFINITIONS AND INTERPRETATION</strong></p>
<p>&nbsp;</p>
<p>1.1 In this Agreement, unless the context requires otherwise, each defined term in the preamble and the recitals has the meaning assigned to it in the preamble and recitals respectively and each other defined term has the meaning assigned to it in this Clause 1:</p>
<p>&nbsp;</p>
<p>&ldquo;<strong>Account</strong>&rdquo; has the meaning ascribed to it in Clause 2.6 of this Agreement.&nbsp;</p>
<p>&ldquo;<strong>Agreement</strong>&rdquo; means this Non-Fungible Token Sale Agreement and includes any and all recitals and schedules that are annexed hereto or which may be annexed to this Agreement at a later date, and any amendments made to this Agreement by all the Parties, in writing.</p>
<p>&ldquo;<strong>Buddy NFTs</strong>&rdquo; means the non-fungible tokens issued by the Seller with no rights attached thereto other than the rights of ownership and their being collectibles that are usable on the NEXUS Platform.&nbsp;</p>
<p>&ldquo;<strong>Business Day</strong>&rdquo; means a day (other than a Saturday, Sunday, or gazetted public holiday) on which banks are open for general business in Singapore.</p>
<p>&ldquo;<strong>Delivery Date</strong>&rdquo; has the meaning ascribed to it in Clause 2.5 of this Agreement.</p>
<p>&ldquo;<strong>Digital Currency</strong>&rdquo; means cryptocurrency, including but not limited to Stablecoins, Bitcoin and Ethereum.</p>
<p>&ldquo;<strong>Encumbrances</strong>&rdquo; in relation to the Buddy NFTs or Purchase Currency denominated in a Digital Currency, means any lien, charge, mortgage, pledge, option, rights of pre-emption over such Buddy NFTs or amount of Digital Currency, or an agreement or arrangement capable of having a similar effect.</p>
<p>&ldquo;<strong>Group Entity</strong>&rdquo; means any of the Seller and its affiliates and related companies.</p>
<p>&ldquo;<strong>Intellectual Property</strong>&rdquo; means all ideas, concepts, discoveries, processes, code, compositions, formulae, methods, techniques, information, data, patents, utility models, rights to inventions, copyright and neighbouring and related rights, moral rights, trade marks, business names and domain names, goodwill, rights in designs, rights in computer software, database rights, rights to use, and protect the confidentiality of, confidential information (including know-how and trade secrets), and all other intellectual property rights, in each case whether patentable, copyrightable or protectable in trademark, registered or unregistered, and including all applications and rights to apply for and be granted, renewals or extensions of, and rights to claim priority from, such rights and all similar or equivalent rights or forms of protection which subsist or will subsist now or in the future in any part of the world.</p>
<p>&ldquo;<strong>Launch-Date</strong>&rdquo; has the meaning ascribed to it in Clause 2.1 of this Agreement.</p>
<p>&ldquo;<strong>NEXUS Platform</strong>&rdquo; has the meaning ascribed to it in recital (B) of this Agreement.</p>
<p>&ldquo;<strong>NFT</strong><strong> Sale</strong>&rdquo; has the meaning ascribed to it in Clause 2.1 of this Agreement.</p>
<p>&ldquo;<strong>Order</strong>&rdquo; has the meaning ascribed to it in Clause 2.3 of this Agreement.</p>
<p>&ldquo;<strong>Order Form</strong>&rdquo; means the online form that is available on the Website for the Purchaser to place an order for a Buddy NFT.</p>
<p>&ldquo;<strong>Pre-sale Date</strong>&rdquo; has the meaning ascribed to it in Clause 2.1 of this Agreement.</p>
<p>&ldquo;<strong>Purchase Consideration</strong>&rdquo; has the meaning ascribed to it in the Order Form.</p>
<p>&ldquo;<strong>Sale NFT</strong>&rdquo; has the meaning ascribed to it in Clause 2.3 of this Agreement.</p>
<p>&ldquo;<strong>Settlement Date</strong>&rdquo; has the meaning ascribed to it in Clause 2.4 of this Agreement.&nbsp;</p>
<p>&ldquo;<strong>SIAC</strong>&rdquo; means the Singapore International Arbitration Centre.</p>
<p>&ldquo;<strong>SMC</strong>&rdquo; means the Singapore Mediation Centre.</p>
<p>&ldquo;<strong>Wallet</strong>&rdquo; means the digital wallet which can be used to store Buddy NFTs.</p>
<p>&ldquo;<strong>Wallet Address</strong>&rdquo; means the unique identifier of the Wallet which is used to send and receive Buddy NFTs.</p>
<p>&ldquo;<strong>Website</strong>&rdquo; means the website of the Seller (<a href="https://www.affyn.com/"><em>https://www.affyn.com</em></a>) or such other website that is its replacement.</p>
<p>&ldquo;<strong>White Paper</strong>&rdquo; means the electronic whitepaper written by the Seller which describes the NEXUS Platform and found on the Website, as may be amended from time to time.</p>
<p>&nbsp;</p>
<p>1.2 In the event of any conflict between the Order Form, the White Paper, the Website and this Agreement, this Agreement shall prevail.</p>
<p>&nbsp;</p>
<p><strong>2. SALE OF BUDDY NFTS</strong></p>
<p>&nbsp;</p>
<p>2.1 The Seller will conduct a public sale of Buddy NFTs, which will be implemented as follows on the following dates:</p>
<p>&nbsp;</p>
<p>(a) 5 July 2022 (the <strong>&ldquo;Pre-sale Date</strong>&rdquo;);</p>
<p>&nbsp;</p>
<p>(b) 6 July 2022 (the &ldquo;<strong>Launch Date</strong>&rdquo;),</p>
<p>&nbsp;</p>
<p>and the public sale will end on such date that the Seller determines in writing (the &ldquo;<strong>End Date</strong>&rdquo;) (the &ldquo;<strong>NFT Sale</strong>&rdquo;) which is expected to be the date on which orders for all available Buddy NFTs are received.</p>
<p>&nbsp;</p>
<p>2.2 In order to be eligible to participate in the NFT Sale, the Purchaser is required to login to the NFT Sale portal via this Website to make a purchase. The Purchaser shall provide his credentials and Wallet details in order to make a purchase.</p>
<p>&nbsp;</p>
<p>2.3 The Purchaser may purchase the Buddy NFTs by selecting the Buddy NFTs that the Purchaser intends to purchase in the Order Form (the &ldquo;<strong>Sale NFTs</strong>&rdquo;) at a purchase price of 2,995 FYN Tokens per Buddy NFT (the &ldquo;<strong>Purchase Consideration</strong>&rdquo;). The Purchaser may place an order for Buddy NFTs (the &ldquo;<strong>Order</strong>&rdquo;) before the End Date. Each Purchaser may not purchase more than one Buddy NFT unless the Seller allows it to do so and the Seller has the absolute discretion to determine whether it will allow any one or more persons to purchase more than one Buddy NFT. Any Order Form submitted after the End Date will be rejected and not valid unless the Seller decides otherwise.</p>
<p>&nbsp;</p>
<p>2.4 Once an order has been made, the Purchaser shall pay for the Buddy NFTs in FYN Tokens within 24 hours from the time the Purchaser receives the payment instructions from the Seller (the &ldquo;<strong>Settlement Date</strong>&rdquo;). The Purchaser shall make the payment into a crypto wallet provided by the Seller. The Buddy NFTs will not be transferred to the Purchaser if the Seller does not receive the full Purchase Consideration on or before the Settlement Date.</p>
<p>&nbsp;</p>
<p>2.5 In consideration of the Purchase Consideration paid during the NFT Sale, the Seller shall sell and issue to the Purchaser the relevant number of Buddy NFTs into the Wallet Address (the &ldquo;<strong>Delivery Date</strong>&rdquo;). The Purchaser acknowledges that the Seller may extend the Delivery Date for up to two additional Business Days due to any occurrence of technical difficulties during the process of issuance of the Buddy NFTs.</p>
<p>&nbsp;</p>
<p>2.6 Before placing any Order, the Purchaser shall:</p>
<p>&nbsp;</p>
<p>(a) register an account on the Website (the &ldquo;<strong>Account</strong>&rdquo;); and</p>
<p>&nbsp;</p>
<p>(b) provide the Wallet Address.</p>
<p>&nbsp;</p>
<p>The Purchaser may change the details of his Wallet Address before any order has been placed. However, the Purchaser shall not make any request to the Seller to change or modify any details of the Wallet Address once an order has been placed.&nbsp;</p>
<p>&nbsp;</p>
<p>2.7 The Purchaser acknowledges that the Seller has no control over the Wallet Address and Wallet that the Purchaser may use to store Buddy NFTs.</p>
<p>&nbsp;</p>
<p>2.8 The Seller shall not be responsible for any issue (including any direct or indirect losses) arising as a result of the Purchaser&rsquo;s failure to provide accurate details of his Wallet Address or the loss of the requisite private keys associated with the Wallet.</p>
<p>&nbsp;</p>
<p>2.9 The Purchaser acknowledges that the Seller has no obligation to issue Buddy NFTs to any other wallet address other than the Wallet Address provided by the Purchaser.</p>
<p>&nbsp;</p>
<p><strong>3. CONDITIONS PRECEDENT</strong></p>
<p>&nbsp;</p>
<p>3.1 The obligations of the Seller to sell and issue the Buddy NFTs are conditional upon the fulfilment or waiver by the Seller of the following conditions precedent:</p>
<p>&nbsp;</p>
<p>(a) receipt by the Seller of the Purchase Consideration in accordance with this Agreement on or before the Settlement Date;</p>
<p>&nbsp;</p>
<p>(b) the completion of the know-your-client checks of the Purchaser on or before an Order is placed by the Purchaser;</p>
<p>&nbsp;</p>
<p>(c) the Seller being satisfied with the results of the know-your-client checks of the Purchaser; and</p>
<p>&nbsp;</p>
<p>(d) the Seller receiving and accepting valid orders at least 400 Buddy NFTs.</p>
<p>&nbsp;</p>
<p>3.2 The Purchaser shall complete an online know-your-client check and provide the documents or information required for the purpose of verification before an Order is placed. In the event that the Purchaser fails to provide the documents or information requested for the verification, the Seller shall not proceed with the know-your-client check and the Order will be cancelled by the Seller.</p>
<p>&nbsp;</p>
<p>3.3 If any of the conditions precedent in Clause 3.1 is not fulfilled or waived by the Seller by its respective deadline or such other date that the Parties agree in writing, the Seller will have no obligation to issue the Buddy NFTs to the Purchaser. The Seller has no obligation to waive any condition precedent.</p>
<p>&nbsp;</p>
<p><strong>4.&nbsp;REFUND</strong></p>
<p>&nbsp;</p>
<p>4.1 In the event that the conditions precedent in Clause 3 are not fulfilled or waived, the following shall apply:</p>
<p>&nbsp;</p>
<p>(a) the Seller shall refund the Purchaser 100% of the Purchase Consideration that it received from the Purchaser under this Agreement within five Business Days of written demand from the Purchaser;</p>
<p>&nbsp;</p>
<p>(b) in making such refund under Clause 4.1(a), the Seller shall refund to the Purchaser the same amount and type of asset it received from the Purchaser as payment for the Purchase Consideration; and</p>
<p>&nbsp;</p>
<p>(c) no Party shall have any claim against any other Party save for any antecedent breach of this Agreement.</p>
<p>&nbsp;</p>
<p>4.2 If the Seller makes any refund in Digital Currency in lieu of cash that has been paid by the Purchaser, the value of the Digital Currency that is paid to the Purchaser will be calculated based on the higher of the (i) value of the Digital Currency at the time of purchase of such Digital Currency by the Seller or the (ii) time of receipt of the Digital Currency by the Purchaser, whichever is higher. The value of such Digital Currency will be the sole or average value obtained from one or more reputable exchanges for such Digital Currency as determined by the Seller, acting in good faith.</p>
<p>&nbsp;</p>
<p>4.3<strong>&nbsp;</strong>If the Seller makes any refund in Digital Currency for payments received in Digital Currency, its obligation to refund the Digital Currency received will be satisfied fully by the refund of the same number of the same type of Digital Currency regardless of any change in the value of such Digital Currency.</p>
<p>&nbsp;</p>
<p><strong>5.</strong>&nbsp;<strong>ACKNOWLEDGEMENT AND ASSUMPTION OF RISKS</strong></p>
<p>&nbsp;</p>
<p>5.1 The Purchaser acknowledges and agrees that there are numerous risks associated with purchasing Buddy NFTs, holding Buddy NFTs, and using Buddy NFTs on or in relation to the NEXUS Platform or for any other purpose.</p>
<p>&nbsp;</p>
<p>5.2 The Purchaser agrees and understands that blockchain and virtual currencies / tokens, including without limitation ethereum, bitcoin, are new and unverified technologies that are beyond control of any Group E By purchasing (whether through an intermediary or otherwise), holding and/or using Buddy NFTs, the Purchaser expressly acknowledges and assumes the following risks to the extent that each Group Entity is not negligent, fraudulent, or in default or breach of any law, agreement, or obligation:</p>
<p>&nbsp;</p>
<p>(a)&nbsp;<strong>Technology</strong>: The launching of the Buddy NFTs and all the matters set out in the White Paper are new and untested. The Buddy NFTs and the NEXUS Platform might not be capable of completion, implementation or adoption. Even if the Buddy NFTs and the NEXUS Platform are completed, implemented and adopted, they might not function as intended. Technology is changing rapidly, so the Buddy NFTs and the NEXUS Platform may become outdated.</p>
<p>&nbsp;</p>
<p>(b)&nbsp;<strong>Security</strong>: The Purchaser is responsible for implementing reasonable measures for securing the digital wallet, vault or other storage mechanism the Purchaser uses to receive the Buddy NFTs which the Purchaser has purchased, including any requisite passwords, tokens, private key(s) or other credentials necessary to access such storage mechanism(s). If the Purchaser's passwords, tokens, private key(s) or other access credentials are lost, the Purchaser may lose access to the Purchaser's Buddy NFTs. The Seller is technologically unable to recover, any such losses.</p>
<p>&nbsp;</p>
<p>(c)&nbsp;<strong>Reliance on Third Parties</strong>: The Seller may rely on third parties to adopt and implement the Buddy NFTs and NEXUS Platform and to continue to develop, supply and support such system. There is no assurance or guarantee that those third parties will complete their work or properly carry out their obligations.</p>
<p>&nbsp;</p>
<p>(d)&nbsp;<strong>Risks associated with the </strong><strong>b</strong><strong>lockchain </strong><strong>p</strong><strong>rotocol</strong>: Given that Buddy NFTs and the NEXUS Platform are based on blockchain protocol and architecture, any malfunction, breakdown or abandonment of the relevant blockchain protocol or architecture may have a material adverse effect on Buddy NFTs or the NEXUS Moreover, advances in cryptography, or technical advances (including without limitation development of quantum computing), could present unknown risks to Buddy NFTs or the NEXUS Platform by rendering ineffective the cryptographic consensus mechanism that underpins that blockchain protocol.</p>
<p>&nbsp;</p>
<p>(e)&nbsp;<strong>Insufficient Information</strong>: The NEXUS Platform is at the stage of development as of the date of this Agreement and its algorithm, code, consensus mechanism and various other technical specifications and parameters could be updated and changed frequently and constantly. While the marketing materials and White Paper released relating to the development of the NEXUS Platform has been prepared with the then up-to-date key information of the NEXUS Platform, it is not absolutely complete and is subject to adjustments and updates from time to time for optimal development and growth of the NEXUS Platform and ecosystem on the NEXUS The Seller is unable, nor obliged, to keep the Purchaser closely posted on every detail of the development of the NEXUS Platform (including its progress and expected milestones no matter whether rescheduled or not) and therefore will not necessarily provide the Purchaser with timely and full access to all the information relating to the NEXUS Platform that may emerge from time to time. Due to the nature of the project to develop the NEXUS Platform, the Purchaser accepts that such insufficiency of information disclosure is inevitable and reasonable.</p>
<p>&nbsp;</p>
<p>(f)&nbsp;<strong>Hacking</strong>: Hackers or other malicious groups or organisations may attempt to interfere with Buddy NFTs or the NEXUS Platform in a variety of ways, including, but not limited to, malware attacks, denial of service attacks, consensus-based attacks, Sybil attacks, smurfing and spoofing. Furthermore, there is a risk that a third party or a member of any Group Entity may intentionally or unintentionally introduce weaknesses into the core infrastructure of Buddy NFTs or the NEXUS Platform, which could negatively affect Buddy NFTs or the NEXUS</p>
<p>&nbsp;</p>
<p>(g)&nbsp;<strong>Risks associated with markets for Buddy NFTs</strong>:</p>
<p>(i) There is no prior market for Buddy NFTs and the Buddy NFTs sale may not result in an active or liquid market for Buddy NFTs. Buddy NFTs are intended to be used solely within the network for the NEXUS Platform, hence there may be illiquidity risk with respect to any Buddy NFTs the Purchaser holds.</p>
<p>(ii) The Buddy NFT is not a currency issued by any central bank or national, supra-national or quasi-national organisation, nor is it backed by any hard assets or other credit, nor is it a "commodity" in the usual and traditional sense of that word. Trading of Buddy NFTs will merely depend on the consensus on its value between the relevant market participants. No one is obliged to purchase any Buddy NFTs from any holder of Buddy NFTs, including the Purchaser, nor does anyone guarantee the liquidity or market price of Buddy NFTs to any extent at any time. Furthermore, Buddy NFTs may not be resold to a purchaser who is a citizen, national, resident (tax or otherwise), domiciliary or green card holder of a Restricted Country (including OFAC Sanctioned Countries) or to purchasers where the purchase of Buddy NFTs may be in violation of applicable laws. Accordingly, the Seller cannot ensure that there will be any demand or market for Buddy NFTs, or that the price the Purchaser has paid for Buddy NFTs are indicative of any market valuation or market price for Buddy NFTs.</p>
<p>(iii) Any secondary market or exchange for trading Buddy NFTs would be run and operated wholly independently of the Group Entities, the sale of Buddy NFTs and the NEXUS No Group Entity will create such secondary markets nor will it act as an exchange for Buddy NFTs. Even if secondary trading of Buddy NFTs are facilitated by third party exchanges, such exchanges may be relatively new and subject to little or no regulatory oversight, making them more susceptible to fraud or manipulation. Furthermore, to the extent that third parties do ascribe an external exchange value to Buddy NFTs (e.g., as denominated in a virtual or fiat currency), such value may be extremely volatile, decline below the price which the Purchaser has paid for Buddy NFTs, and diminish to zero.</p>
<p>&nbsp;</p>
<p>(h)&nbsp;<strong>Risk of Uninsured Losses</strong>: Buddy NFTs are uninsured unless the Purchaser specifically obtains private insurance to insure them. In the event of loss or loss of utility value, there is no public insurer or private insurance arranged by the Seller to offer recourse to the Purchaser.</p>
<p>&nbsp;</p>
<p>(i)&nbsp;<strong>Risk of loss of the Purchaser&rsquo;s credentials</strong>: The Purchaser understands and accepts that if his Wallet credentials are lost or stolen, Buddy NFTs which have been issued to the Purchaser will not be recoverable and will be permanently lost. A private key, or a combination of private keys, is necessary to control and dispose of Buddy NFTs stored in the Wallet. Accordingly, loss of requisite private keys associated with the Wallet will result in loss of Buddy NFTs that have been issued to the Purchaser.</p>
<p>The Purchaser acknowledges that if the Purchaser&rsquo;s credentials are lost when using the Website to make any transaction, the Seller has no obligation to recover such credentials for the Purchaser and the Seller will not be liable for any losses arising from such incident.</p>
<p>In addition, any third party that gains access to such private keys, including by gaining an access to login credentials of a hosted Wallet service that the Purchaser is using, may be able to misappropriate the Purchaser&rsquo;s Buddy NFTs. Any errors or malfunctions caused by, or otherwise related to, the Wallet that the Purchaser chooses to receive and store Buddy NFTs, including the Purchaser&rsquo;s failure to properly maintain or use such Wallet, may also result in the loss of Buddy NFTs. The Purchaser&rsquo;s failure to precisely follow the instructions and procedures for purchasing and receiving Buddy NFTs (i.e. an incorrect Wallet address was provided), may result in the loss of the Purchaser&rsquo;s Buddy NFTs.</p>
<p>&nbsp;</p>
<p>(j)<strong> Uncertain Laws, Regulations and Enforcement Actions</strong>: The regulatory status of Buddy NFTs and distributed ledger technology is unclear or unsettled in many jurisdictions. It is impossible to predict how, when or whether regulatory agencies may apply existing regulations or create new regulations with respect to such technology and its applications, including Buddy NFTs or the NEXUS Platform. Regulatory actions could negatively impact Buddy NFTs or the NEXUS Platform in various ways. The Seller or any Group Entity may cease operations in a jurisdiction in the event that regulatory actions, or changes to law or regulation, make it illegal to operate in such jurisdiction, or commercially undesirable to obtain the necessary regulatory approval(s) to operate in such jurisdiction.</p>
<p>&nbsp;</p>
<p>(k)&nbsp;<strong>Taxation risks</strong>: The tax characterisation of Buddy NFTs are uncertain. The Purchaser must seek the Purchaser's own tax advice in connection with the purchase, holding and usage of Buddy NFTs, which may result in adverse tax consequences to the Purchaser, including withholding taxes, income taxes and tax reporting requirements.</p>
<p>&nbsp;</p>
<p>(l)&nbsp;<strong>Competitors</strong>: It is possible that alternative networks could be established that utilise the same or similar code and protocol underlying Buddy NFTs or the NEXUS Platform and attempt to re-create similar facilities. The NEXUS Platform may be required to compete with these alternative networks, which could negatively impact Buddy NFTs or the NEXUS Platform.</p>
<p>&nbsp;</p>
<p>(m)&nbsp;<strong>Insufficient Interest</strong>: It is possible that the NEXUS Platform will not be used by a large number of individuals, companies and other entities or that there will be limited public interest in the creation and development of distributed ecosystems (such as the NEXUS Platform). Such a lack of use or interest could negatively impact the development of the NEXUS Platform and therefore the potential utility of Buddy NFTs.</p>
<p>&nbsp;</p>
<p>(n)&nbsp;<strong>Risks Arising from Lack of Governance Rights</strong>: Because Buddy NFTs confers no governance rights of any kind with respect to the NEXUS Platform or any Group Entity, all decisions involving the NEXUS Platform or any Group Entity will be made by the relevant Group Entity at its sole and absolute discretion, including, but not limited to, decisions to discontinue the services and ecosystem on the NEXUS Platform, to create and sell more Buddy NFTs for use in the ecosystem on the NEXUS Platform, or to sell or liquidate any Group Entity. These decisions could adversely affect the NEXUS Platform and Buddy NFTs the Purchaser holds.</p>
<p>&nbsp;</p>
<p>(o)&nbsp;<strong>Loss of Talent</strong>: The development of the NEXUS Platform depends on the continued co-operation of the existing technical team and expert consultants, who are highly knowledgeable and experienced in their respective sectors. The loss of any member may adversely affect the NEXUS Platform or its future development.</p>
<p>&nbsp;</p>
<p>(p)&nbsp;<strong>Failure to develop</strong>: There is the risk that the development of the NEXUS Platform will not be executed or implemented as planned, for a variety of reasons, including without limitation the event of a decline in the prices of any digital asset, virtual currency or Buddy NFTs, unforeseen technical difficulties, and shortage of development funds for activities.</p>
<p>&nbsp;</p>
<p>(q)&nbsp;<strong>Non-ownership in the underlying art or intellectual property</strong>: The Buddy NFTs may contain artwork or representations of artwork or have intellectual property in themselves. However, they do not give the holder any ownership in the underlying intellectual property or artwork. As an illustration, owning a Buddy NFT which is a digital representation of &ldquo;Mona Lisa&rdquo; does not give the holder of such Buddy NFT any rights in the intellectual property in Mona Lisa or any ownership rights over Mona Lisa at all.</p>
<p>&nbsp;</p>
<p>(r)&nbsp;<strong>Other risks</strong>: In addition to the aforementioned risks, there are other risks associated with the Purchaser's purchase, holding and usage of Buddy NFTs, including those that the Seller cannot anticipate. Such risks may further materialise as unanticipated variations or combinations of the aforementioned risks.</p>
<p>&nbsp;</p>
<p>For the avoidance of doubt, the Purchaser acknowledges and assumes the abovementioned risks and will not have any claim and shall not make any claim against the Seller in relation to the abovementioned risks.</p>
<p>&nbsp;</p>
<p><strong>6.&nbsp;REPRESENTATIONS AND WARRANTIES</strong></p>
<p>&nbsp;</p>
<p><strong><u>PURCHASER</u></strong></p>
<p>&nbsp;</p>
<p>6.1 The Purchaser represents and warrants to the Seller as follows:</p>
<p>&nbsp;</p>
<p>(a) The Purchaser is not located in a jurisdiction where the NFT Sale is prohibited, restricted or unauthorised in any form or manner whether in full or in part under the laws, regulatory requirements or rules in such jurisdiction.</p>
<p>&nbsp;</p>
<p>(b) The Purchaser is either an individual or an entity duly incorporated or formed validly existing, and in good standing under its country of incorporation, and has full right, power and authority to enter into the transactions contemplated by this Agreement and to carry out its obligations hereunder. If the Purchaser is an individual, the Purchaser is of sufficient legal age and has capacity to purchase the Buddy NFTs.</p>
<p>&nbsp;</p>
<p>(c) The Purchaser has full capacity and power to enter into this Agreement and to perform his obligations or execute any document under this Agreement.</p>
<p>&nbsp;</p>
<p>(d) If the Purchaser is an individual, he is not an undischarged bankrupt, nor is he aware of any bankruptcy applications or proceedings taken out against him. He is not aware of any or any potential court proceedings which have been or are likely to be commenced against him.</p>
<p>&nbsp;</p>
<p>(e) If the Purchaser is a company, it is not insolvent, aware of any applications for winding-up or judicial management proceedings taken out against it, entering or contemplating entering into a scheme of arrangement with its creditors, entering or contemplating going into liquidation, or had a receiver appointed over any or all of its assets or property. It is not aware of any or any potential court proceedings which have been or are likely to be commenced against it.</p>
<p>&nbsp;</p>
<p>(f) The Purchaser has received a copy of the current White Paper prepared in relation to the NEXUS Platform and has carefully read it in its entirety. The Purchaser acknowledges that the Seller may change the White Paper at any time. The Purchaser shall promptly read new versions of the White Paper, which will be made available to the Purchaser via the Website.</p>
<p>&nbsp;</p>
<p>(g) The funds, including any fiat, digital currency, virtual currency or cryptocurrency, used to purchase Buddy NFTs are obtained through "mining" activities or other lawful means, and are not derived from or related to any unlawful activities, including but not limited to money laundering or terrorist financing, and the Purchaser shall not use Buddy NFTs to finance, engage in, or otherwise support any unlawful activities. To the extent required by applicable laws and regulations, the Purchaser shall fully comply with all anti-money laundering and counter-terrorism financing requirements in the jurisdiction.</p>
<p>&nbsp;</p>
<p>(h) The Purchaser has a good and sufficient understanding in business and financial matters, including a good and sufficient understanding of the functionality, usage, storage, transmission mechanisms and other material characteristics of blockchain technology and blockchain-based software systems, cryptographic tokens, and token storage mechanisms (such as digital token wallets) to understand this Agreement and to appreciate the risks and implications of purchasing, holding and usage of Buddy NFTs .</p>
<p>&nbsp;</p>
<p>(i) The Purchaser acknowledges that the funds paid to the Seller for the purchase of Buddy NFTs will be held by the Seller (or the Seller's affiliate) after the NFT Sale, and the Purchaser will have no economic or legal right over or beneficial interest in these contributions or the assets of that entity after the NFT Sale.</p>
<p>&nbsp;</p>
<p><strong><u>SELLER</u></strong></p>
<p>&nbsp;</p>
<p>6.2 The Seller represents and warrants to the Purchaser as follows:</p>
<p>&nbsp;</p>
<p>(a) The Seller and each Group Entity are validly incorporated under the laws of the country of their incorporation or registration, are in good standing.</p>
<p>&nbsp;</p>
<p>(b) The Seller has capacity to enter into and perform its obligations under this Agreement.</p>
<p>&nbsp;</p>
<p>(c) The Seller has obtained all requisite approvals for its entry into this Agreement and the performance of its obligations under this Agreement and all such approvals remain in full force and effect.</p>
<p>&nbsp;</p>
<p>(d) This Agreement constitutes valid, legal, and binding obligations on the Seller.</p>
<p>&nbsp;</p>
<p>(e) No petition or resolution has been or is likely to be proposed or presented to wind up the Seller or any Group Entity.</p>
<p>&nbsp;</p>
<p>(f) No proceedings have been commenced against the Seller or any Group Entity that would affect its ability to perform its obligations under this Agreement or to develop the NEXUS Platform or issue the Buddy NFTs.</p>
<p>&nbsp;</p>
<p>(g) In all material aspect, all information provided is true, complete, and accurate in all respects and not misleading in any material way.</p>
<p>&nbsp;</p>
<p>(h) To the best of the Seller&rsquo;s knowledge, the development of the NEXUS Platform does not contravene any law and the NEXUS Platform and Buddy NFTs are not being used for any illegal purpose.</p>
<p>&nbsp;</p>
<p>(i) Each Party undertakes that each of the foregoing representations and warranties will remain true, accurate and complete in all respects and not be misleading in any respect until the date this Agreement is terminated either by performance or by agreement.</p>
<p>&nbsp;</p>
<p><strong>7.</strong>&nbsp;<strong>TERMINATION</strong></p>
<p>&nbsp;</p>
<p>7.1 This Agreement will terminate upon the completion of the issuance of the Buddy NFTs in accordance with this Agreement save that such termination will not prejudice any right or liability that has accrued before such termination or will accrue from any matter or event that existed or occurred before such termination . Either Party may terminate this Agreement if the other Party breaches this Agreement and fails to remedy such breach within 30 days of being informed in writing by the innocent Party to do so.</p>
<p>&nbsp;</p>
<p><strong>8.</strong>&nbsp;<strong>INTELLECTUAL PROPERTY</strong></p>
<p>&nbsp;</p>
<p>8.1 The Seller shall retain all right, title and interest in all of the Intellectual Property. The Seller shall exclusively own all the Intellectual Property in any change or improvement in relation to the Buddy NFTs or the technology made or created in the course of the performance of this Agreement. The Purchaser&rsquo;s purchase of any Buddy NFTs shall not entitle the Purchaser to any right, claim or warranty in respect of any content generated by or on behalf of the Seller, or access to any information held by the Seller. The Purchaser shall not use any of the Intellectual Property for any reason without the prior written consent of the Seller.</p>
<p>&nbsp;</p>
<p><strong>9.</strong>&nbsp;<strong>LIMITATION OF LIABILITY</strong></p>
<p>&nbsp;</p>
<p>9.1 To the fullest extent permitted by applicable law, the Company will not be liable for any losses resulting directly or indirectly from the NFT Sale and the use of the Website (including but not limited to the loss of business, loss of data or loss of profit) as a result of (a) errors, mistakes or inaccuracies on any information on the Website, (b) any unauthorised access to or use of the Website secure servers, (c) any interruption or cessation of transmission to or from the Website in relation to the Buddy NFTs, and (d) any harmful viruses or codes that may be transmitted through the Website.</p>
<p>&nbsp;</p>
<p>9.2 Notwithstanding anything in this clause, the Parties&rsquo; liabilities will not be limited in the case of fraud or for death or personal injury caused by that Party&rsquo;s negligence.</p>
<p>&nbsp;</p>
<p><strong>10. INDEMNITY</strong></p>
<p>&nbsp;</p>
<p>10.1 To the fullest extent permitted by applicable law, the Purchaser will indemnify, defend and hold harmless the Seller from and against all claims, demands, actions, damages, losses, costs and expenses (including legal fees on an indemnity basis) that the Seller suffers or incurs as a result of the Purchaser&rsquo;s breach of this agreement that is not remedied.</p>
<p>&nbsp;</p>
<p><strong>11.</strong>&nbsp;<strong>CONFIDENTIALITY</strong></p>
<p>&nbsp;</p>
<p>11.1 Each Party agrees to keep as confidential information the terms of this Agreement and the contents of all negotiations leading to its preparation, and will not disclose or discuss any of that information without the prior written approval of the other Party, except as follows:</p>
<p>(a) as specifically contemplated by this Agreement;</p>
<p>(b) to the extent required by law; or</p>
<p>(c) to the extent required to instruct the Party&rsquo;s professional advisers in relation to the preparation and completion or enforcement of this Agreement.</p>
<p>&nbsp;</p>
<p><strong>12.</strong>&nbsp;<strong>COST AND EXPENSES</strong></p>
<p>&nbsp;</p>
<p>12.1 Each Party shall bear its own costs and expenses incurred in connection with the negotiation, preparation and execution of this Agreement.</p>
<p>&nbsp;</p>
<p><strong>13.&nbsp;GENERAL</strong></p>
<p>&nbsp;</p>
<p>13.1&nbsp;<u>Entire Agreement.</u> This Agreement, including but not limited to the White Paper and the Order Form, constitute the entire agreement between the Purchaser and the Seller and supersede all prior or contemporaneous agreements and understandings , both written and oral, between the Purchaser and the Seller with respect to the subject matters. The Seller may make changes to this Agreement from time to time as reasonably required to comply with applicable law or regulation but shall not amend this Agreement to alter the rights of the Purchaser without the written approval of the Purchaser.</p>
<p>&nbsp;</p>
<p>13.2&nbsp;<u>Rights of </u><u>T</u><u>hird </u><u>P</u><u>arties</u>. Except as otherwise provided in herein, this Agreement is intended solely for the benefit of the Purchaser and the Seller and is not intended to confer third-party beneficiary rights upon any other person or entity. A person who is not a party under these Terms has no right under the Contracts (Rights of Third Parties) Act, Chapter 53B of Singapore to enforce or to enjoy the benefit of any term of these Terms. Notwithstanding the foregoing, any Group Entity will be entitled to enforce or to enjoy the benefit of any term of this Agreement.</p>
<p>&nbsp;</p>
<p>13.3&nbsp;<u>Severability.</u>&nbsp;If any provision of this Agreement is held to be illegal or unenforceable, the enforceability of the remainder of this Agreement will not be affected.</p>
<p>&nbsp;</p>
<p>13.4 <u>Execution of Documents.</u> Each Party undertakes with the other Party that it will do all such acts and things and execute all such deeds and documents as may be necessary or desirable to carry into effect or to give legal effect to the provisions of this Agreement and the matters hereby contemplated.</p>
<p>&nbsp;</p>
<p>13.5 <u>Amendments.</u> Any amendments or variation of this Agreement will be effective only if it is signed in writing by all the Parties.</p>
<p>&nbsp;</p>
<p>13.6 <u>Assignment or Transfer.</u> None of the rights and obligations of a Party contained in this Agreement may be assigned or transferred without the prior written consent of each of the Parties. This Agreement shall be binding on and shall ensure for the benefit of each Party's successors and permitted assigns and any reference in this Agreement to a Party shall be construed accordingly.</p>
<p>&nbsp;</p>
<p>13.7 <u>Non-partnership.</u> Nothing in this Agreement will be deemed to constitute a partnership between the Parties nor constitute any Party the agent of any other Party or otherwise entitle any Party to have authority to bind any other Party for any purpose.</p>
<p>&nbsp;</p>
<p>13.8 <u>Continuance of Obligations.</u> Notwithstanding the existence of any dispute between the Parties which is referred to mediation or, as the case may be, arbitration, the Parties shall, during the pendency of the mediation or, as the case may be, arbitration, continue to act on matters under this Agreement which are not the subject matter of the Dispute as if no such Dispute had arisen, to the end and intent that the business and operations of the Company are not affected during the pendency of such mediation or arbitration.</p>
<p>&nbsp;</p>
<p>13.9 <u>Governing Law.</u> This Agreement will be governed by and be construed in accordance with the laws of Singapore and subject to Clause 13.10, the Parties irrevocably submit to the non-exclusive jurisdiction of the courts of the Republic of Singapore including the Singapore International Commercial Court.</p>
<p>&nbsp;</p>
<p>13.10 <u>Dispute Resolution.</u> Any dispute or differences that cannot be resolved by the Parties within 30 days of its arising will be referred to mediation before a mutually agreed upon mediator and failing such agreement, be submitted to the SMC in accordance with such mediation procedure for the time being in force at the SMC. The Parties agree to participate in any mediation in good faith and undertake to abide by the terms of any settlement reached with all costs relating to such mediation to be borne by the Parties equally.</p>
<p>&nbsp;</p>
<p>Any issue or claim not resolved by mediation is to be referred to and finally resolved by arbitration in accordance with the rules of the SIAC for the time being in force which rules are deemed to be incorporated by reference into this Clause. In the event of arbitration, the arbitration tribunal will consist of one arbitrator to be appointed by the Chairman of the SIAC and the language of arbitration will be in English. The governing law of the arbitration will be Singapore law and the disputing parties may conduct the arbitration through Zoom or any video-conferencing or telephone conferencing facility, subject to the arbitrator&rsquo;s approval. The arbitrator's decision will be final and binding.</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
					</span>
					<br />
				</span>
				<div className="terms-and-condition-agreement-container mt-3">
					<Checkbox
						required
						checked={isChecked}
						onChange={(event) => {
							handleCheckboxOnChange(event.target.checked);
						}}
					/>
					<span>I have read and accept the terms of this agreement</span>
				</div>

				<div className="mt-4 space-x-3">
					<ButtonPrimary disabled={!isChecked} onClick={onAgreeConfirm} type="submit">
						Confirm
					</ButtonPrimary>
					<ButtonSecondary type="button" onClick={onClose}>
						Cancel
					</ButtonSecondary>
				</div>
			</div>
		</Dialog>
	);
};

export default ModalTermsAndCondition;
