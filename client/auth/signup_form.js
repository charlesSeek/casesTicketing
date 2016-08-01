import React,{Component} from 'react';
import {Accounts} from 'meteor/accounts-base';

class SignupForm extends Component{
	componentWillMount(){
		this.state={error:''};
	}
	onUserSignUp(event){
		event.preventDefault();
		const username = this.refs.username.value;
		const email = this.refs.email.value;
		const password = this.refs.password.value;
		const confirmPassword = this.refs.confirmPassword.value;
		const address = this.refs.address.value;
		const phone = this.refs.phone.value;
		const role = this.refs.role.value;
		const profile = {address,phone,role};
		//console.log({username,email,password,confirmPassword,address,phone,role});
		if (password!=confirmPassword){
			this.setState({error:"Password is mismatch"})
		} else{
			Accounts.createUser({
				username:username,
				email:email,
				password:password,
				profile:profile
			},(err)=>{
				if (err){
					this.setState({error:err.message});
				}else{
					Meteor.loginWithPassword(email,password,(err)=>{
						if(err){
							this.setState({error:err.message});
						}else{
							Session.set('user',Meteor.user());
							FlowRouter.redirect('/');
						}
					})
				}
			})
		}
	}
	errorMessage(){
		if (this.state.error){
			return (
				<div className="alert alert-warning" role="alert">{this.state.error}</div>
			)
		}else 
		return null;
	}
	render(){
		return(
			<div className="container">
				<form className="myForm" onSubmit={this.onUserSignUp.bind(this)}>
					<div className="form-group">
						<label>User Name *</label>
						<input ref="username" className="form-control" required/>
					</div>
					<div className="form-group">
						<label>Email address *</label>
						<input type="email" ref="email" className="form-control" required/>
					</div>
					<div className="form-group">
						<label>Password *</label>
						<input type="password" ref="password" className="form-control" required/>
					</div>
					<div className="form-group">
						<label>Confirm Password *</label>
						<input type="password" ref="confirmPassword" className="form-control" required/>
					</div>
					<div className="form-group">
						<label>Address (optional)</label>
						<input  ref="address" className="form-control"/>
					</div>
					<div className="form-group">
						<label>Mobile Phone (optional)</label>
						<input  ref="phone" className="form-control"/>
					</div>
					<div className="form-group">
						<label>User Role *</label>
						<select ref="role" className="form-control">
							<option value="customer">customer</option>
							<option value="supporter">supporter</option>
							<option value="developer">developer</option>
						</select>
					</div>
					{this.errorMessage()}
					<button type="submit" className="btn btn-primary">Sign Up</button>
				</form>
			</div>
		)
	}
}
export default SignupForm;