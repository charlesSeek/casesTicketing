import React,{Component} from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import {Cases} from '../../collections/cases';
import NoteForm from '../notes/note_form';
class CaseDeveloperDetail extends Component {
	renderNotes(){
		if (this.props.case.notes.length<1){
			return <div>No Notes </div>
		}else{
			return this.props.case.notes.map(note=>{
				return(
					<div key={note.createdAt} className="container">
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
	onClickRelese(){
		var caseId = this.props.case._id;
		var receiver = "none";
		var status = "waitting for developer processing";
		Meteor.call('cases.supportUpdate',caseId,receiver,status,(error,caseId)=>{	
			FlowRouter.redirect('/');
		})
	}
	onClickResolve(){
		var caseId = this.props.case._id;
		var receiver = Session.get('user').username;
		var status = "case is resolved";
		Meteor.call('cases.supportUpdate',caseId,receiver,status,(error,caseId)=>{	
			const from = "shuchengcapp@gmail.com";
			const to =this.props.case.creatorEmail;
			const subject = "case resolved notification";
			const text = "case is resolved,please see detail in system";
			console.log('from,to,subject,text',from,to,subject,text);
			Meteor.call('sendEmail',from,to,subject,text);
			FlowRouter.redirect('/');
		})
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
					<p>Creator:{this.props.case.creator}</p>
					<p>Created At:{this.props.case.createdAt.toString()}</p>
					<p>Case Status:{this.props.case.status}</p>
					<button className="btn btn-primary" onClick={this.onClickRelese.bind(this)}>Case Release</button>
					<button className="btn btn-primary" onClick={this.onClickResolve.bind(this)}>Case Resolve</button>
				</div>
				<NoteForm case={this.props.case}/>
				<h3>Notes:</h3>
				{this.renderNotes()}
			</div>
		)
	}
}
export default createContainer((props)=>{
	id = props.id;
	console.log(id);
	Meteor.subscribe('allCases');
	return {case:Cases.findOne(id)};
},CaseDeveloperDetail);