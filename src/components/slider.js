import React,{useState} from 'react';
import '../styles/slider.css';

class Slider extends React.Component{
	constructor(props){
		super(props)
	}
	getLabel(labelValue,index,labelCount){
		let val=((index*(100/labelCount)))
		return <div className="range-label" style={{left:`${val}%`}} onClick={()=>this.props.updateValue(labelValue)}> {labelValue}</div>
	}
	showLablel(){
		let labelCount = (this.props.maxValue - this.props.minValue)/this.props.step;
		let labels = []
		for(let i=0;i<=Math.round(labelCount);i++){
			let label_value = i * this.props.step + this.props.minValue
			if(i==0) label_value = this.props.minValue
			labels.push(this.getLabel(label_value,i,labelCount))
		}
		return labels;
	}
	handleChange(event){
		this.props.updateValue(event.target.value)
	}
	getRangeFiller(){
		let labelCount = (this.props.maxValue - this.props.minValue)/this.props.step;
		let fillPercent = ((this.props.value - this.props.minValue)/this.props.step)*(100/labelCount)
		return {
			background:`linear-gradient(90deg, rgb(0, 97, 100) ${fillPercent}%, rgb(215, 220, 223) 0%)`
		}
	}
	render(){
		return <div className="range-wrapper">
				<input className="range-slider range-slider__range" style={this.getRangeFiller()} type="range" value={this.props.value} onChange={(event)=>this.handleChange(event)} min={this.props.minValue} max={this.props.maxValue} step={this.props.step}/>
				<div className="range-slider-label">{this.showLablel()}</div>
				</div>	
	}
}
export default Slider;