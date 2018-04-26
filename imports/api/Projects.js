import { Mongo } from 'meteor/mongo';

const Projects = new Mongo.Collection('projects');

if (Meteor.isServer) {
    Meteor.publish('allProjects', function() {
      return Projects.find();
    });
    Meteor.publish('singleProject', function(params) {
      return Projects.find({_id:params.id});
    });

  Meteor.methods( {
    insertNewProject(projectName,cabinets,panels,doors) {
      if(Meteor.userId()) {
        Projects.insert({
          projectName: projectName,
          cabinets: cabinets,
          panels: panels,
          doors: doors,
        });
      }
    },
  });
}

export default Projects;
