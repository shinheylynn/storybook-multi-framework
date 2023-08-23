import React, { useState, useEffect } from "react";
import "./moreden.scss";
import "../../colors/medistream.variables.scss";
import PropTypes from "prop-types";

export const StyledInput = (props) => {
	const { Name, Label, Placeholder, Comments, Disabled } = props;

	return (
		<div className="styled-input">
			<div className={`default-input ${Disabled ? "disabled" : ""}`}>
				<div className="input-wrapper">
					{Label && (
						<label htmlFor={Name} className={Disabled ? "disabled" : ""}>
							{Label}
							{/* <em> *</em> */}
						</label>
					)}
					<div className="input-container">
						<input
							className={Label ? "with-label" : "without-label"}
							autoComplete="off"
							id={Name}
							placeholder={Placeholder}
							disabled={Disabled}
						></input>
					</div>
				</div>
				<span className="input-extention">
					{!Disabled && (
						<span className={`state-icon ${Label ? "with-label" : ""}`}></span>
					)}
					{!Disabled && (
						<span className={`state-icon ${Label ? "with-label" : ""}`}></span>
					)}
					<span className="with-label">
						<button
							style={{
								backgroundColor: "black",
								color: "white",
								width: 38 + "px",
								height: 24 + "px",
								border: "none",
								fontSize: 12 + "px",
								marginLeft: 5 + "px",
								borderRadius: 3 + "px",
							}}
						>
							버튼
						</button>
					</span>
				</span>
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
};
