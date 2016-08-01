import React from 'react';
import Header from '../partials/header';
export const MainLayout = ({content})=>(
	<div className="main-layout">
		<Header/>
		<main>
			{content}
		</main>
	</div>
)