import { Meteor } from 'meteor/meteor';
import {Cases} from '../collections/cases';
import faker from 'faker';
import _ from 'lodash';
Meteor.startup(() => {
  // code to run on server at startup
  const username = Meteor.settings.private.email;
  const password = Meteor.settings.private.password;
  smtp={
    username:username,
    password:password,
    server: 'smtp.gmail.com',
    port:465
  }
  process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
  console.log(process.env.MAIL_URL);
  const numberRecords = Cases.find({}).count();
  console.log("case num:",numberRecords);
  if (!numberRecords){
      const date1 = new Date('2016-01-01');
      const date2 = new Date('2016-02-01');
      const date3 = new Date('2016-03-01');
      const date4 = new Date('2016-04-01');
      const date5 = new Date('2016-05-01');
      const date6 = new Date('2016-06-01');
      const date7 = new Date('2016-07-01');
      const date8 = new Date('2016-08-01');
      const date9 = new Date('2016-09-01');
      const date10 = new Date('2016-10-01');
      const date11 = new Date('2016-11-01');
      const date12 = new Date('2016-12-01');

      const dates = [date1,date2,date3,date4,date5,date6,date7,date8,date9,date10,date11,date12];
      _.times(100,()=>{

        const title = faker.lorem.sentence();
        const description = faker.lorem.paragraph();
        const creator = faker.name.findName();
        const creatorEmail = faker.internet.email();
        //const createdAt = Faker.Date.between('2016-01-01','2016-07-01');
        const createdAt = faker.random.arrayElement(dates);
        const updatedAt = createdAt;
        const notes = [];
        const status = "waitting for supporter processing";
        const receiver = "none";
        Cases.insert({
          title,description,creator,createdAt,updatedAt,notes,status,receiver
        })
      })
  }
  Meteor.publish('allCases',function(){
    return Cases.find({});
  })
  Meteor.publish('supporterCasesList',function(status){
    return Cases.find({status:status});
  })
  Meteor.publish('developerCasesList',function(status){
    return Cases.find({status:status});
  })
  /*Meteor.publish('filterCases',function(keyword){
    return Cases.find({title:{$regex:".*"+keyword+".*"}});
  })*/
   Meteor.publish('currentSupporter',function(receiver){
    return Cases.find({receiver:receiver,status:'support processing'});
  });
    Meteor.publish('currentDeveloper',function(receiver){
    return Cases.find({receiver:receiver,status:'developer processing'});
  });
  Meteor.methods({
    sendEmail:function(from,to,subject,text){
      //check([from,to,subject,text],[string]);
      this.unblock();
      Email.send({
        from:from,
        to:to,
        subject:subject,
        text:text
      });
    }
  });
});
