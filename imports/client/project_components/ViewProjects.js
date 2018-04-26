import React, {Component} from 'react'
import {PageHeader} from 'React-Bootstrap'
import { createContainer } from 'meteor/react-meteor-data'
import Projects from '../../api/Projects'


class ViewProjects extends Component {
    render() {
        return (
            <div>
                <PageHeader>Projects</PageHeader>
            </div>
        )
    }
}

export default createContainer(() => {
    if(Meteor.userId()){
      let projectsSub = Meteor.subscribe('allProjects');
    }
  
    return {
      projects: Projects.find({}).fetch()
    }
}, ViewProjects);