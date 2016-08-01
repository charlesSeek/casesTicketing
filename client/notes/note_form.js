import React,{ Component } from 'react';
class NotesForm extends Component{
	onNoteSubmit(event){
		event.preventDefault();
		const content = this.refs.noteContent.value;
		const caseId = this.props.case._id;
		console.log(content);
		const username = Session.get('user').username;
		const createdAt = (new Date()).toString();
		const note = {username,content,createdAt};
		Meteor.call('notes.update',caseId,note);
		this.refs.noteContent.value='';
	}
	render(){
		return(
			<form onSubmit={this.onNoteSubmit.bind(this)}>
				<div className="form-group">
					<label className="control-label">New Note</label>
					<div>
						<textarea className="form-control" rows="5" ref="noteContent" required></textarea>
					</div>
				</div>
				<button type="submit" className="btn btn-primary">Note Save</button>
			</form>
		)
	}
}
export default NotesForm;