import React from "react";
import "./Loading.css";
function Loading() {
	return (
		<div className="page">
			<div className="loader">

			<div className="lds-grid">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
			<h2> Loading</h2>
			</div>
		</div>
	);
}

export default Loading;
