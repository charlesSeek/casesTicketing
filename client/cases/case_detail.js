import React,{Component} from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import {Cases} from '../../collections/cases';
class CaseDetail extends Component {
	renderNotes(){
		if (this.props.case.notes.length<1){
			return <div>No Notes</div>
		}else{
			var notes = this.props.case.notes;
			return notes.map(note=>{
				return(
					<div className="container" key={note.createdAt.toString()}>
						<div className="jumbotron">
							<h3>{note.content}</h3>
							<p>@{note.username}</p>
							<p>{note.createdAt.toString()}</p>
						</div>
					</div>
				)
			})
		}
	}
	render(){
		if (!this.props.case){
			return <div>Loading</div>
		}
		return(
			<div className="container">
				<div className="jumbotron">
					<h3>{this.props.case.title}</h3>
					<p>{this.props.case.description}</p>
					<p>Creator:@{this.props.case.creator}</p>
					<p>Created At:{this.props.case.createdAt.toString()}</p>
					<p>Case Status:{this.props.case.status}</p>
				</div>
				<h3>Notes:</h3>
				{this.renderNotes()}
			</div>
		)
	}
}
export default createContainer((props)=>{
	id = props.id;
	Meteor.subscribe('allCases');
	return {case:Cases.findOne(id)};
},CaseDetail);