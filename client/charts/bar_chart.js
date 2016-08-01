import React,{Component} from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import {Cases} from '../../collections/cases';
import {Bar} from 'react-chartjs';
class BarChart extends Component {
	render(){
		if (!this.props.cases){
			return <div>Loading...</div>
		}else {
			var Jan=Feb=Mar=Apr=May=Jun=Jul=Aug=Sep=Oct=Nov=Dec=0;
			this.props.cases.map(mycase=>{
				switch (mycase.createdAt.getMonth()){
					case 0:
						Jan+=1;
						break;
					case 1:
						Feb+=1;
						break;
					case 2:
						Mar+=1;
						break;
					case 3:
						Apr+=1;
						break;
					case 4:
						May+=1;
						break;
					case 5:
						Jun+=1;
						break;
					case 6:
						Jul+=1;
						break;
					case 7:
						Aug+=1;
						break;
					case 8:
						Sep+=1;
						break;
					case 9:
						Oct+=1;
						break;
					case 10:
						Nov+=1;
						break;
					case 11:
						Oct+=1;
						break;
				}
			})
			var chartData = {
				labels:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
				datasets:[
					{
						label:"case statistics by month",
						borderWidth:1,
						data:[Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Aug,Oct,Nov,Dec]
					}
				]
			};
			var  chartOptions = {
				scales:{
					xAxes:[{
						stacked:true
					}],
					yAxes:[{
						stacked:true
					}]
				}
			};
		}
		return(
			<div className='container' align="center">
				<Bar data={chartData} options = {chartOptions} width = '600' height = '400'/>
			</div>
		)
	}

}

export default createContainer(()=>{
	Meteor.subscribe('allCases');
	return {cases:Cases.find({}).fetch()};
},BarChart);