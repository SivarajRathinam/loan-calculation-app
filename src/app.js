import React from 'react';
import Slider from './components/sliderContainer'
import Display from './components/display'
import './styles/home.css'
import axios from 'axios';
import Layout from './layout/layout'
import Sidebar from './components/sidebar';
export default class App extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			loanAmount:500,
			loanDuration:6,
			displayData:{}
		}
	}
	updateData(disableStoring){
		this.setState({'isLoading':true})
		if (typeof this._source != typeof undefined) {
      		this._source.cancel('Operation canceled due to new request.')
    	}
    	this._source = axios.CancelToken.source();
		axios.get(`https://ftl-frontend-test.herokuapp.com/interest?amount=${this.state.loanAmount}&numMonths=${this.state.loanDuration}`,{ cancelToken: this._source.token })
      	.then(res => {
        	const displayData = res.data;
        	if(!disableStoring){
        		let storage = localStorage.getItem('last-used')?JSON.parse(localStorage.getItem('last-used')):[]
        		storage.unshift({"loanAmount":this.state.loanAmount,"loanDuration":this.state.loanDuration})
        		storage = storage.slice(0,10)
        		localStorage.setItem('last-used',JSON.stringify(storage))
        	}
        	this.setState({ displayData,isLoading:false });
      	})
	}
	componentDidMount() {
		this.updateData(true)	
	}
	handleLoanAmount(value){
		this.setState({loanAmount:Number(value)},()=>{
			this.updateData()
		})
	}
	handleLoanDuration(value){
		this.setState({loanDuration:Number(value)},()=>{
			this.updateData()
		})
	}
	handleValues(value){
		this.setState({
			loanAmount:value.loanAmount,
			loanDuration:value.loanDuration
		},()=>{
			this.updateData(true)	
		})
	}
	render(){
		return <Layout>
					<div className="content-left">
						<Sidebar updateValues={(values)=>this.handleValues(values)}/>
					</div>
					<div className="content-right">
						<Slider value={this.state.loanAmount} name={"loan Amount"} minValue={500} maxValue={5000} step={500} updateValue={(value)=>this.handleLoanAmount(value)}/>
						<Slider value={this.state.loanDuration} name={"loan Duration"} minValue={6} maxValue={24} step={3} updateValue={(value)=>this.handleLoanDuration(value)}/>
						<Display data={this.state.displayData} isLoading={this.state.isLoading}/>
					</div>
				</Layout>
	}
}
