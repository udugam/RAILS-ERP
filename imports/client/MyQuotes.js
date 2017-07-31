import React, {Component} from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Quotes from '../api/Quotes';
import {Link} from 'react-router';

class MyQuotes extends Component {

  render() {
    return(
       /*Display Quotes Created by user*/
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
                      <td><Link to={storedQuote._id}>{storedQuote.jobName}</Link></td>
                      <td>{storedQuote.jobValue}</td>
                      <td>{storedQuote.jobStatus}</td>
                    </tr>
                  )
              })}
            </tbody>
          </table>
        </div>
    )
  }
}


export default createContainer(() => {
  if(Meteor.userId()){
    let quotesSub = Meteor.subscribe('allQuotes');
  }

  return {
    quotes: Quotes.find({jobOwner: Meteor.userId()}).fetch(),
  }
}, MyQuotes);
