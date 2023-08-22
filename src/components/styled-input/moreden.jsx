import React, { useState, useEffect } from "react";
import "./moreden.scss";
import PropTypes from "prop-types";

export const StyledInput = (props) => {
	const {
		Name,
		Label,
		Placeholder,
		Comments,
		Disabled,
		TextAlign = "left",
	} = props;
	const [isFocused, setIsFocused] = useState(false);

	const inputFocused = () => {
		setIsFocused(!isFocused);
	};

	return (
		<div className="styled-input">
			<div className={`"default-input" ${Disabled ? "disabled" : ""}`}>
				<div className="input-wrapper">
					<label htmlFor={Name} className={Disabled ? "disabled" : ""}>
						{Label}
					</label>
					<div className="input-container">
						<input
							autoComplete="off"
							onKeyDown={(e) => {
								props.onKeyDown(e);
							}}
							onKeyUp={(e) => {
								props.onKeyUp(e);
							}}
							onFocus={(e) => {
								props.onFocus(e);
							}}
							onBlur={(e) => {
								props.onBlur(e);
							}}
							id={Name}
							placeholder={Placeholder}
							disabled={Disabled}
							className={`${props.inputClasses} ${
								TextAlign === "right" ? "text-align-right" : ""
							}`}
						></input>
					</div>
				</div>
			</div>
			{Comments && <small className="comments">{Comments}</small>}
		</div>
	);
};

StyledInput.propTypes = {
	Name: PropTypes.string,
	Label: PropTypes.string,
	Placeholder: PropTypes.string,
	Comments: PropTypes.string,
	Disabled: PropTypes.bool,
	TextAlgin: PropTypes.string,
};
