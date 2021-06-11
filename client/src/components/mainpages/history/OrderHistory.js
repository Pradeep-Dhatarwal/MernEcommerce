import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { GlobalState } from "../../../globalstate";

function OrderHistory() {
	const state = useContext(GlobalState);
	const [history] = state.userAPI.history;
	return (
		<div className="page">
			<h2>History</h2>
			<h4>You have {history.length} order{history.length === 1?".":"s."}</h4>
			<div className="history-page">
				<table>
					<thead>
            <tr>

						<th>Payment ID</th>
						<th>Date of Purchase</th>
						<th>View</th>
            </tr>
					</thead>
					<tbody>
						{history.map((items) => {
							return (
								<tr key={items._id}>
									<td> {items.paymentID} </td>
									<td> {new Date(items.createdAt).toLocaleDateString()} </td>
									<td>
										<Link to={`/history/${items._id}`}> View </Link>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default OrderHistory;
