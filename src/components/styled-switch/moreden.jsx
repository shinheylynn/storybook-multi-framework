import React, { useEffect, useState } from "react";
import "../../colors/medistream.variables.scss";
import "./moreden.scss";
import PropTypes from "prop-types";

export const StyledSwitch = ({ flag }) => {
	const [isChecked, setIsChecked] = useState(flag);

	useEffect(() => {
		setIsChecked(flag);
	}, [flag]);

	const toggleSwitch = () => {
		setIsChecked((prevChecked) => !prevChecked);
	};

	console.log(isChecked);

	// to-do: tailwindcss를 활용한 동적 스타일링 필요. -> tailwindcss 작동 안함..?
	return (
		<label className="toggle-switch">
			<input type="checkbox" onClick={toggleSwitch} checked={isChecked} />
			<span className="slider"></span>
		</label>
	);
};

StyledSwitch.propTypes = {
	flag: PropTypes.bool,
};
