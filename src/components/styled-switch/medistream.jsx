import React, { useEffect, useState } from "react";
import "../../colors/medistream.variables.scss";
import "./medistream.scss";
import PropTypes from "prop-types";

export const StyledSwitch = ({ flag }) => {
	// to-do: isChecked는 계속해서 true만 반환.
	console.log("flag:", flag);

	// to-do: tailwindcss를 활용한 동적 스타일링 필요.
	return (
		<label className="toggle-switch">
			<input type="checkbox" checked={flag} />
			<span className="slider"></span>
		</label>
	);
};

StyledSwitch.propTypes = {
	flag: PropTypes.bool,
};
