import React,{Component} from 'react';
class Header extends Component{
	render(){
		//Session.set('user',{username:"shuchengc",level:"1"});
		const  user = Session.get('user');
		const signinLink = user? "":<li><a href="/signin">Sign In</a></li>;
		const signupLink = user? "": <li><a href="/signup">Sign Up</a></li>;
		const logoutLink = user? <li><a href="/logout">Logout</a></li>:"";
		const statLink = <li><a href="/statistics">Statistics</a></li>
		let newCase;
		if (user){
			if (user.profile.role==='customer'){
				newCase =<li><a href="/new-case">New Case</a></li>;
			}else{
				newCase="";
			}
		}else {
			newCase="";
		}
		
		return(
			<nav className="navbar navbar-inverse navbar-static-top">
			  	<div className="container-fluid">
				    <div className="navbar-header">
				      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#cases-navbar-collapse-1" aria-expanded="false">
				        <span className="sr-only">Toggle navigation</span>
				        <span className="icon-bar"></span>
				        <span className="icon-bar"></span>
				        <span className="icon-bar"></span>
				      </button>
				      <a className="navbar-brand" href="/">Cases Ticketing</a>
				    </div>
				    <div className="collapse navbar-collapse pull-right" id="cases-navbar-collapse-1">
				      <ul className="nav navbar-nav">
				       	{signinLink}
				       	{signupLink}
				       	{newCase}
				       	{statLink}
				       	{logoutLink}
				      </ul>
			    	</div>
  				</div>
			</nav>
		)
	}

}

export default Header;