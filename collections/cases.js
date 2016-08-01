export const Cases = new Meteor.Collection('cases')
Meteor.methods({
	'cases.insert':function(title,description){
		return Cases.insert({
			title:title,
			description:description,
			creator:Meteor.user().username,
			creatorEmail:Meteor.user().emails[0].address,
			createdAt:new Date(),
			updatedAt:new Date(),
			status: 'waitting for supporter processing',
			notes:[],
			receiver:'none'
		})
	},
	'cases.supportUpdate':function(caseId,receiver,status){
		console.log('caseId,receiver,status:',caseId,receiver,status);
		return Cases.update(caseId,{$set:{receiver:receiver,status:status}});
	},
	'notes.update':function(caseId,note){
		return Cases.update(caseId,{$push:{notes:note}});
	}
});


