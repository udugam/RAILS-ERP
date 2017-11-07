if (Meteor.userId()){
  import React, {Component} from 'react';
  import { createContainer } from 'meteor/react-meteor-data';
  import {Grid,Row,Image,Col,Panel,Button,ButtonGroup} from 'React-Bootstrap';

  import Quotes from '../api/Quotes';
  import Materials from '../api/Materials';
  import DoorStyles from '../api/DoorStyles';
  import Colors from '../api/Colors';
  import Drawers from '../api/Drawers';
  import Hardware from '../api/Hardware';
  import CrownMoldings from '../api/CrownMoldings';
  import Operations from '../api/Operations';
  import Accessories from '../api/Operations';
  import MillworkItems from '../api/MillworkItems';

  import EditRoom from './EditRoom';



  class QuotePage extends Component {

    constructor(props) {
      super(props);
      this.state = {
        editShow: false,
        activeModal: null
      };
      this.clickHandler = this.clickHandler.bind(this);
      this.hideModal = this.hideModal.bind(this);
    }

    clickHandler(event,roomNum) {
      this.setState({activeModal:roomNum})
    }

    hideModal(event){
      this.setState({activeModal:null})
    }

    displayDate() {
      const date = new Date();
      return date.toDateString();
    }

    render() {
      let editClose = () => this.setState({editShow: false});

      return (
          <Grid>
              <Row>
                  <Col lg={6} md={6} sm={6} xs={6}>
                     <Image src='/PK-logo.png' responsive/>
                  </Col>
                   <Col lg={6} md={6} sm={6} xs={6}>

                        <strong>Pure Kitchens Inc.</strong>
                       <br />
                           115B Saramia Crescent
                       <br />
                           Vaughan, ON
                       <br />
                           L4K 4P7
                       <br />
                           info@purekitchensinc.com
                       <br />
                           416-679-0192
                  </Col>
              </Row>
              {this.props.quotes.map((storedQuote) => {
                  return (
                    <div key={storedQuote._id}>
                      <Row>
                          <Col lg={6} md={6} sm={6} xs={6}>
                          <h2>  <strong>{storedQuote.projectName}</strong></h2>
                              <br />
                                <b>Address :</b> {storedQuote.projectAddress}
                              <br />
                                <b>Phone Number :</b>
                              <br />
                              <b>E-mail :</b>
                            <hr/>
                          </Col>
                          <Col lg={6} md={6} sm={6} xs={6}>
                            <h1>${storedQuote.projectValue}</h1>
                          </Col>
                      </Row>
                      {storedQuote.projectRooms.map((storedRoom) => {
                        return (
                          <div key={storedRoom.roomNum}>
                            <Panel
                              header={<div>
                                        <Row>
                                          {storedRoom.description+' - $'+storedRoom.cost}
                                          {<ButtonGroup>
                                            <Button bsSize='small' bsStyle='primary' onClick={event => this.clickHandler(event,storedRoom.roomNum)}>Edit</Button>
                                            <Button bsSize='small' bsStyle='danger'>Delete</Button>
                                          </ButtonGroup>}
                                        </Row>
                                     </div>}
                            >
                              <Grid>
                                <Row>
                                  <Col lg={7} md={7} sm={7} xs={7}>
                                    <Row> <b>Cabinet Construction:</b> {storedRoom.constructionMaterial}</Row>
                                    <Row> <b>Doors:</b> {storedRoom.doorStyle} - {storedRoom.doorSpecies}</Row>
                                    <Row> <b>Finsh:</b> {storedRoom.color}</Row>
                                  </Col>
                                  <Col lg={4} md={4} sm={4} xs={4}>
                                    <Row> <h3>{storedRoom.linFootage} feet @ {storedRoom.height} inches </h3></Row>
                                  </Col>
                                </Row>
                              </Grid>
                              <EditRoom
                                show={this.state.activeModal === storedRoom.roomNum}
                                onHide={this.hideModal}
                                materials={this.props.materials}
                                doorStyles={this.props.doorStyles}
                                colors={this.props.colors}
                                drawers={this.props.drawers}
                                hardware={this.props.hardware}
                                crownMoldings={this.props.crownMoldings}
                                accessories={this.props.accessories}
                                operations={this.props.operations}
                                millworkItems={this.props.millworkItems}
                                room={storedRoom}
                                quote={storedQuote}
                                roomId={storedRoom.roomNum}
                              />
                            </Panel>
                          </div>
                        )
                      })}
                    </div>
                  )
              })}
          </Grid>
      )
    }
  }

  export default createContainer(({params}) => {
    if(Meteor.userId()){
      let materialsSub = Meteor.subscribe('allMaterials');
      let doorStylesSub = Meteor.subscribe('allDoorStyles');
      let colorsSub = Meteor.subscribe('allColors');
      let drawersSub = Meteor.subscribe('allDrawers');
      let hardwareSub = Meteor.subscribe('allHardware');
      let crownMoldingsSub = Meteor.subscribe('allCrownMoldings');
      let operationsSub = Meteor.subscribe('allOperations');
      let accessoriesSub = Meteor.subscribe('allAccessories');
      let millworkItemsSub = Meteor.subscribe('allMillworkItems');
      let quotesSub = Meteor.subscribe('singleQuote', params);
    }

    return {
      materials: Materials.find({}).fetch(),
      doorStyles: DoorStyles.find({}).fetch(),
      colors: Colors.find({}).fetch(),
      drawers: Drawers.find({}).fetch(),
      hardware: Hardware.find({}).fetch(),
      crownMoldings: CrownMoldings.find({}).fetch(),
      operations: Operations.find({}).fetch(),
      accessories: Accessories.find({}).fetch(),
      millworkItems: MillworkItems.find({}).fetch(),
      quotes: Quotes.find({}).fetch(),
    }
  }, QuotePage);

}
