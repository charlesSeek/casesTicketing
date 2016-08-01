import React,{Component} from 'react';

class NewCase extends Component {
	onCaseSubmit(event){
		event.preventDefault();
		const title = this.refs.title.value;
		const description = this.refs.description.value;
		Meteor.call('cases.insert',title,description,(error,caseId)=>{
			if (error){
				console.log(error);
			}
			FlowRouter.redirect('/');
		})
	}
	render(){
		return(
			<div className="container">
				<form onSubmit={this.onCaseSubmit.bind(this)}>
					<div className="form-group">
						<label className="control-label">Case Title</label>
						<input className="form-control" ref="title" required/>
					</div>
					<div className="form-group">
						<label className="control-label">Case Description</label>
						<textarea className="form-control" rows="5" ref="description" required></textarea>
					</div>
	      			<button className="btn btn-primary">Submit</button>
				</form>
			</div>
		)
	}
}
export default NewCase;