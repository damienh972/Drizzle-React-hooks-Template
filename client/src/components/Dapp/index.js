import React from 'react';
import demo from '../../assets/citation_NH_mindPower.jpg';
import "./dapp.scss";

const Dapp = ({ drizzle, drizzleState, account }) => {

	// console.log(drizzle);
	// console.log(drizzleState);
	// console.log(account);

	return(
		<div className='demo'>
			<img alt='citation' src={demo}/>
		</div>
	)
}	 


export default Dapp;