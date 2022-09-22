import { Dialog } from "@material-ui/core";
import { FC } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";

export interface ModalConfirmProps {
	show: boolean;
	onCloseModalConfirm: () => void;
	onAgreeConfirm: () => void;
}

const ModalConfirm: FC<ModalConfirmProps> = ({ show, onCloseModalConfirm, onAgreeConfirm }) => {
	return (
		<Dialog open={show} onClose={onCloseModalConfirm}>
			<div className="dialog-content-container items-center flex-column">
				<h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-800">Important!</h3>
				<br />
				<span className="text-sm">
					<span>
						<p>
							One Affyn account can only be bound to one wallet address and vice versa. Once your
							wallet address is bound, it cannot be changed.
						</p>
						<br />
						<p>
							<b>
								Please check that you are logged in to the correct wallet address before you
								continue.
							</b>
						</p>
						<br />
						<p>
							By clicking Confirm, you hereby agree that the above information given is accurate and
							true.{" "}
						</p>
						<br />
					</span>
					<br />
				</span>
				<div className="mt-4 space-x-3">
					<ButtonPrimary onClick={onAgreeConfirm} type="submit">
						Confirm
					</ButtonPrimary>
					<ButtonSecondary type="button" onClick={onCloseModalConfirm}>
						Cancel
					</ButtonSecondary>
				</div>
			</div>
		</Dialog>
	);
};

export default ModalConfirm;
