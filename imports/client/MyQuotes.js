import React, {Component} from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Quotes from '../api/Quotes';
import {Link} from 'react-router';
import {PageHeader} from 'React-Bootstrap';

class MyQuotes extends Component {

  render() {
    return(
        <div>
          <PageHeader>My Quotes</PageHeader>
          <div className='table-responsive'>
            <table className='table'>
              <tbody>
                <tr>
                  <th>Project Name</th>
                  <th>Value</th>
                  <th>Status</th>
                </tr>
                {this.props.quotes.map((storedQuote) => {
                    return (

                        <tr key={storedQuote._id}>
                          <td><Link to={storedQuote._id}>{storedQuote.projectName}</Link></td>
                          <td>{storedQuote.projectValue}</td>
                          <td>{storedQuote.projectStatus}</td>
                        </tr>

                    )
                })}
              </tbody>
            </table>
          </div>
        </div>
    )
  }
}


export default createContainer(() => {
  if(Meteor.userId()){
    let quotesSub = Meteor.subscribe('allQuotes');
  }

  return {
    quotes: Quotes.find({projectOwner: Meteor.userId()}).fetch(),
  }
}, MyQuotes);
