import React from 'react';
import Slider from './slider'
export default (props)=>{
	return <div className="flex-container">
				<div> Loan Amount </div>
				<Slider value={props.value} minValue={props.minValue} maxValue={props.maxValue} step={props.step} updateValue={(value)=>props.updateValue(value)}/>
			</div>
}