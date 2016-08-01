import React from 'react';
import {mount} from 'react-mounter';
import {MainLayout} from './layouts/main_layout';
import SignupForm from './auth/signup_form';
import SigninForm from './auth/signin_form';
import NewCase from './cases/new_case';
import CasesMain from './cases/cases_main';
import CaseDetail from './cases/case_detail';
import CaseSupporterDetail  from './cases/case_supporter_detail';
import CaseDeveloperDetail  from './cases/case_developer_detail';
import BarChart from './charts/bar_chart';

FlowRouter.route('/',{
	name:'home',
	action(){
		mount(MainLayout,{
				content:(<CasesMain/>)
			})
	}
});
FlowRouter.route('/logout',{
	name:'logout',
	action(){
		Meteor.logout(function(err){
			delete Session.keys['user'];
			FlowRouter.redirect('/');
		})
	}
});

FlowRouter.route('/signup',{
	name:'signup',
	action(){
		mount(MainLayout,{
				content:(<SignupForm/>)
			})
	}
});

FlowRouter.route('/signin',{
	name:'signin',
	action(){
		mount(MainLayout,{
				content:(<SigninForm/>)
			})
	}
});
FlowRouter.route('/statistics',{
	name:'statistics',
	action(){
		mount(MainLayout,{
				content:(<BarChart/>)
			})
	}
});

FlowRouter.route('/new-case',{
	name:'newCase',
	action(){
		mount(MainLayout,{
				content:(<NewCase/>)
			})
	}
});

FlowRouter.route('/case/:id',{
	name:'caseDetail',
	action(params){
		mount(MainLayout,{
				content:(<CaseDetail id={params.id}/>)
			})
	}
});

FlowRouter.route('/supporter/case/:id',{
	name:'caseSupporterDetail',
	action(params){
		mount(MainLayout,{
				content:(<CaseSupporterDetail id={params.id}/>)
			})
	}
});

FlowRouter.route('/developer/case/:id',{
	name:'caseDeveloperDetail',
	action(params){
		mount(MainLayout,{
				content:(<CaseDeveloperDetail id={params.id}/>)
			})
	}
});
