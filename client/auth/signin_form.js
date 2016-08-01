import React,{ Component } from 'react';
import { Accounts } from 'meteor/accounts-base';
class Signin extends Component{
	onUserLogin(event){
		event.preventDefault();
		email = this.refs.email.value;
		password = this.refs.password.value;
		Meteor.loginWithPassword(email,password,(err)=>{
			if (err){
				this.setState({error:'Invalid username/password'});
			}else{
				this.setState({error:''});
				Session.set('user',Meteor.user());
				FlowRouter.redirect('/');
			}
		})
	}
	componentWillMount(){
		this.state={error:''};
	}
	render(){
		return(
			<div className="container">
				<form onSubmit={this.onUserLogin.bind(this)}>
					<div className="form-group">
						<label>Email</label>
						<input ref="email" className="form-control" required/>
					</div>
					<div className="form-group">
						<label>Password</label>
						<input ref="password" type="password" className="form-control" required/>
					</div>
					<div className="form-group">
						{this.state.error}
					</div>
					<button type="submit" className="btn btn-primary">Submit</button>
				</form>
			</div>
		)
	}
		
}
export default Signin;