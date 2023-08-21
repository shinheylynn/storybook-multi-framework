import React, { useState, useEffect } from "react";
import "./moreden.scss";
import PropTypes from "prop-types";

export const StyledRadio = ({
	Name,
	Val,
	Disabled = false,
	Width = 26,
	Height = 26,
	value,
	modelValue,
}) => {
	const [checkedValue, setCheckedValue] = useState(value || modelValue);
	const isDark = false;

	console.log("Disabled:", Disabled); // to-do: 항상 false 반환

	useEffect(() => {
		setCheckedValue(value || modelValue);
	}, [value, modelValue]);

	const handleRadioChange = (newVal) => {
		setCheckedValue(newVal);
	};

	const handleSvgClick = () => {
		if (checkedValue !== Val) {
			handleRadioChange(Val);
		}
	};

	const renderRadioSvg = () => {
		if (checkedValue === Val) {
			return (
				<svg
					width={Width}
					height={Height}
					viewBox="0 0 26 26"
					fill={isDark ? "#000" : "#fff"} // to-do: isDark는 항상 false 아닌지?
					xmlns="http://www.w3.org/2000/svg"
					className="selected-icon"
					key="checked"
				>
					<g clipPath="url(#clip0_860_13850)">
						<circle
							className="out-circle"
							cx="13"
							cy="13"
							r="12.25"
							stroke={isDark ? "var(--blue-grey-700)" : "var(--blue-grey-300)"}
							strokeWidth="1.5"
						/>
						<circle
							cx="13"
							cy="13"
							r="7"
							fill={isDark ? "var(--blue-400)" : "var(--blue-600)"}
						/>
					</g>
				</svg>
			);
		} else {
			return (
				<svg
					width={Width}
					height={Height}
					viewBox="0 0 26 26"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className="selected-icon"
					key="unchecked"
				>
					<circle
						className="out-circle"
						cx="13"
						cy="13"
						r="12.25"
						stroke={isDark ? "var(--blue-grey-700)" : "var(--blue-grey-300)"}
						strokeWidth="1.5"
					/>
					<circle cx="13" cy="13" r="7" fill="none" />
				</svg>
			);
		}
	};

	return (
		<label>
			<span
				className={`styled-radio ${isDark ? "dark" : ""} ${
					checkedValue === Val ? "selected" : "un-selected"
				} ${Disabled ? "disabled" : ""}`}
				style={{
					height: Height + "px",
					lineHeight: Height + "px",
				}}
				onClick={handleSvgClick}
			>
				<input
					type="radio"
					value={Val}
					name={Name}
					disabled={Disabled}
					checked={checkedValue === Val}
					onChange={(e) => handleRadioChange(e.target.value)}
				/>
				<div className="transition-wrapper">{renderRadioSvg()}</div>
			</span>{" "}
			선택해주세요
		</label>
	);
};

StyledRadio.propTypes = {
	Name: PropTypes.string,
	Val: PropTypes.string,
	Disabled: PropTypes.bool,
	Width: PropTypes.number,
	Height: PropTypes.number,
	isDark: PropTypes.bool,
	value: PropTypes.string,
	modelValue: PropTypes.string,
	onChange: PropTypes.func,
};
