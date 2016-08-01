import React,{Component} from 'react';
class CaseSingle extends Component{
	onClickBySupport(){
		console.log('onclicksupport');
		const link = "/supporter/case/"+this.props.mycase._id;
		var caseId = this.props.mycase._id;
		var status = "supporter processing";
		var receiver = Session.get('user').username;
		Meteor.call('cases.supportUpdate',caseId,receiver,status,(err,caseId)=>{
			FlowRouter.redirect(link);
		});
	}
	onClickByDeveloper(){
		console.log('onclickdevloper');
		const link = "/developer/case/"+this.props.mycase._id;
		var caseId = this.props.mycase._id;
		var status = "developer processing";
		var receiver = Session.get('user').username;
		Meteor.call('cases.supportUpdate',caseId,receiver,status,(err,caseId)=>{
			FlowRouter.redirect(link);
		});
	}
	render(){
		var processLink="";
		var showLink="";
		if (Session.get('user')){
			var role = Session.get('user').profile.role;
			if (role=="customer"){
				const link = "/case/"+this.props.mycase._id;
				showLink = <a href={link} className="btn btn-primary">Show Detail</a>
			}
			if (role=="supporter"){
				processLink = <a onClick={this.onClickBySupport.bind(this)} className="btn btn-primary">Process Case</a>;
			}
			if (role=="developer"){
				const link = "/developer/case/"+this.props.mycase._id;
				processLink = <a href={link} className="btn btn-primary">Process Case</a>;
			}
		}
		return(
			<div className="jumbotron">
				<h3>{this.props.mycase.title}</h3>
				<p>{this.props.mycase.description}</p>
				<p>@{this.props.mycase.creator}</p>
				<p>{this.props.mycase.createdAt.toString()}</p>
				<div className="container">
					{showLink}
					{processLink}
				</div>
			</div>
		)
	}
}
export default CaseSingle;