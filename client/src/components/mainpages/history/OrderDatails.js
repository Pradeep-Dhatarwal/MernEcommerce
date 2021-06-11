import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GlobalState } from "../../../globalstate";

function OrderDetails() {
	const state = useContext(GlobalState);
	const [history] = state.userAPI.history;
	const [orderDetails, setOrderDetails] = useState([]);
	const params = useParams();
	useEffect(() => {
		if (params.id) {
			history.forEach((item) => {
				if (item._id === params.id) {
					setOrderDetails(item);
				}
			});
		}
	}, [params.id, history]);
	console.log(orderDetails);
	if (orderDetails.length === 0) return null;

	return (
		<div className="page">
			<div className="history-page">
				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>Address</th>
							<th>Postal Code</th>
							<th>Country Code</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td> {orderDetails.name} </td>
							<td>
								{orderDetails.address.address_line_1 +
									"-" +
									orderDetails.address.admin_area_1}
							</td>
							<td> {orderDetails.address.postal_code} </td>
							<td> {orderDetails.address.country_code} </td>
						</tr>
					</tbody>
				</table>
				<table style={{ marginTop: "30px" }}>
					<thead>
						<tr>
							<th>S.No.</th>
							<th></th>
							<th>Products </th>
							<th>Quantity</th>
							<th>Price</th>
						</tr>
					</thead>
					<tbody>
						{orderDetails.cart.map((item, idx) => {
							return (
								<tr>
									<td> {idx + 1} </td>
									<td> <img src={item.images.url} alt="" /> </td>
									<td>{item.title}</td>
									<td> {item.quantity} </td>
									<td> ${item.price} </td>
								</tr>
							);
						})}
					</tbody>
					<tfoot>
						<tr>
							<td></td>
							<td></td>
							<td>
								<strong>Total:</strong>
							</td>
							<td>
								{" "}
								{orderDetails.cart.reduce((acc, curr) => {
									return acc + curr.quantity;
								}, 0)}
							</td>
							<td>
								${orderDetails.cart.reduce((acc, curr) => {
									return acc + curr.price;
								}, 0)}
							</td>
						</tr>
					</tfoot>
				</table>
			</div>
		</div>
	);
}

export default OrderDetails;
