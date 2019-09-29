import React from 'react';

export default (props)=>{
	let localstorage = localStorage && localStorage.getItem('last-used')?JSON.parse(localStorage.getItem('last-used')):[]
	let data = []
	for(let val of localstorage){
		data.push(
			<div className="last-used-container" onClick={()=>props.updateValues(val)}>
				<span> LA:</span><span>{val['loanAmount']}</span>
				<span> LD:</span><span>{val['loanDuration']}</span>
			</div>
		)
	}
	return <>
				<div className="last-used-outer-container">
					<div className="last-used-container-header">Last used</div>
					{data}
				</div>
			</>
}