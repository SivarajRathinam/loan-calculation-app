import React from 'react';
import Loader from './loader'

export default (props)=>{
	if (props.data && Object.keys(props.data).length && !props.isLoading){
		return <div className="diaplay-container">
					<div className="loan-display">
						<div className="loan-data">Interest rate</div>
						<div className="loan-data">{props.data.interestRate}</div>
					</div>
					<div className="loan-display">
						<div className="loan-data">Monthly Payment</div>
						<div className="loan-data">{`${props.data.monthlyPayment.amount} ${props.data.monthlyPayment.currency}`}</div>
					</div>
					<div className="loan-display">
						<div className="loan-data">Principal</div>
						<div className="loan-data">{`${props.data.principal.amount} ${props.data.principal.currency}`}</div>
					</div>
				</div>
	}
	return <Loader/>
}