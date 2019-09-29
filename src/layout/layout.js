import React from 'react';
import Header from './header';

export default (props)=>{
	return <div className="container">
				<div className="header">
					<Header/>
				</div>
				<div className="content">
					{props.children}
				</div>
			</div>
}