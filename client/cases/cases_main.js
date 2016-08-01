import React,{Component} from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import {Cases} from '../../collections/cases';
import CaseSingle from './case_single';
class  CasesMain extends Component{
	componentWillMount(){
		this.setState({
			keyword:""
		})
	}
	onSubmitKeyWord(event){
		event.preventDefault();
		var keyword = this.refs.keyWord.value;
		this.setState({keyword:keyword});
		console.log('keyword:',this.state.keyword);
		
	}
	render(){
		if (!Session.get('user')){
			return (
				<div className="container">
					<div className="jumbotron">
						<h3>Case Ticketing System</h3>
						<p>1.Customer creates and submits new case to system</p>
						<p>2.Supporter makes notes and resolves the case or submits it to developer</p>
						<p>3.Developer makes notes and resolves the case </p>
						<p>Please Sign in or Sign up</p>
						<a href="/signin" className="btn btn-primary">Sign In</a>
						<a href="/signup" className="btn btn-primary">Sign Up</a>
					</div>
				</div>
			)
		}else {
			cases = this.props.cases;
			if (cases.length<1){
				return (
					<div className="container">
						<form onSubmit={this.onSubmitKeyWord.bind(this)}>
							<input 
								type="text" 
								ref="keyWord"
								placeholder="Please input key word for search"/>
						</form>
					</div>
				)
			}
			return(
				<div className='container'>
					<form onSubmit={this.onSubmitKeyWord.bind(this)}>
						<input 
							type="text" 
							ref="keyWord"
							placeholder="Please input key word for search"/>
					</form>
					{this.props.cases.map((mycase)=>{
						var title = mycase.title;
						var keyword = this.state.keyword;
						var regexp = new RegExp(keyword);
						if (regexp.test(title)){
							return <CaseSingle key={mycase._id} mycase={mycase}/>
						}
					})}
				</div>
			)

		}
		
	}
} 

export default createContainer(()=>{
	if (!Meteor.user()){
		return {cases:{}}
	}
	var role = Meteor.user().profile.role;
	if (role=="customer"){
		Meteor.subscribe('allCases');
		return {cases:Cases.find({}).fetch()};
	}else{
		if (role=="supporter"){
			Meteor.subscribe('supporterCasesList',"waitting for supporter processing");
			console.log(Meteor.user().username);
			Meteor.subscribe('currentSupporter',Meteor.user().username);
			var cases = Cases.find({});
			if (cases.length<1){
				return {cases:[]}
			}else 
				return {cases:Cases.find({}).fetch()}
		}else {
			Meteor.subscribe('developerCasesList','waitting for developer processing');
			Meteor.subscribe('currentDeveloper',Meteor.user().username);
			var cases = Cases.find({});
			if (cases.length<1){
				return {cases:[]}
			}else 
				return {cases:Cases.find({}).fetch()}
		}
	}
	
},CasesMain);