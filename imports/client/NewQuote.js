if (Meteor.userId()) {
  import React, {Component} from 'react';
  import { createContainer } from 'meteor/react-meteor-data';
  import {PageHeader, Tabs, Tab, Table, Panel, Button} from 'React-Bootstrap';

  import Quotes from '../api/Quotes';
  import Materials from '../api/Materials';
  import DoorStyles from '../api/DoorStyles';
  import Colors from '../api/Colors';
  import Drawers from '../api/Drawers';
  import Hardware from '../api/Hardware';
  import CrownMoldings from '../api/CrownMoldings';
  import Operations from '../api/Operations';
  import Accessories from '../api/Accessories';
  import MillworkItems from '../api/MillworkItems';

  class NewQuote extends Component {

    constructor(props) {
      super(props);
      this.state = {
        roomNum: props.roomNum,
        description: '',
        linFootage: 0,
        height: 0,
        constructionMaterial: '',
        quote: 0,
        doorSpecies: '',
        doorStyle: '',
        color: '',
        drawerQty: 4,
        drawerModel: '',
        hardware: '',
        hardwareQty: 0,
        crownMolding: '',
        quoteAccessories: [],
        pendingAccessoryID:'',
        pendingAccessoryQty:0,
        quoteMillworkItems: [],
        pendingMillworkItemID:'',
        pendingMillworkItemQty:0,
        cost:0,
      };
      this.handleInputChange = this.handleInputChange.bind(this);
      this.addAccessory = this.addAccessory.bind(this);
      this.removeAccessory = this.removeAccessory.bind(this);
      this.addedAccessoriesCostEstimate = this.addedAccessoriesCostEstimate.bind(this);
      this.addMillworkItem = this.addMillworkItem.bind(this);
      this.removeMillworkItem = this.removeMillworkItem.bind(this);
      this.addedMillworkItemsCostEstimate = this.addedMillworkItemsCostEstimate.bind(this);
    }

    handleInputChange(event) {
     const target = event.target;
     const value = target.value;
     const name = target.name;

     this.setState({
       [name]: value,
     }, () => this.setCostEstimate(),this.props.callbackFromProject(this.state));
     /*The above function sends the updated information back to the Project component, after setState is done*/
    }

    setCostEstimate() {
      const material = Number(this.materialCostEstimate())
      const doors = Number(this.doorCostEstimate())
      const paint = Number(this.paintCostEstimate())
      const drawers = Number(this.drawerCostEstimate())
      const hardware = Number(this.hardwareCostEstimate())
      const crown = Number(this.crownCostEstimate())
      const production = Number(this.productionCostEstimate())
      const accessories = Number(this.pendingAccessoryCostEstimate())+Number(this.addedAccessoriesCostEstimate())
      const millworkItems = Number(this.pendingMillworkItemCostEstimate())+Number(this.addedMillworkItemsCostEstimate())
      const cost = (material+doors+paint+drawers+hardware+crown+production+accessories+millworkItems).toFixed(2)
      this.setState({
        cost: cost,
      }, () => this.props.callbackFromProject(this.state));
    }

    addAccessory(event) {
      const pendingAccessory = Accessories.findOne({_id: this.refs.pendingAccessoryID.value.trim()});
      const currentOperations = Operations.findOne({activeOperation: 'true'});
      const quoteAccessories = this.state.quoteAccessories;
      quoteAccessories[quoteAccessories.length] = {name:pendingAccessory.name,_id:pendingAccessory._id, qty:this.state.pendingAccessoryQty, accessoryCost:(Number(pendingAccessory.cost)+Number(pendingAccessory.installationTime*currentOperations.avgLaborRate))};

      this.setState({
        quoteAccessories: quoteAccessories,
        pendingAccessoryID: undefined,
      }, () => this.props.callbackFromProject(this.state));
    }

    removeAccessory(event) {
      const target = event.target;
      const id = target.value;
      const quoteAccessories = this.state.quoteAccessories;

      this.state.quoteAccessories.map((quoteAccessory) => {
        if (quoteAccessory._id === id) {
          const index = quoteAccessories.indexOf(quoteAccessory);
          quoteAccessories.splice(index,1);
          this.setState({
            quoteAccessories: quoteAccessories,
          }, () => this.props.callbackFromProject(this.state));
        };
      });
    }

    addMillworkItem(event) {
      const pendingMillworkItem = MillworkItems.findOne({_id: this.refs.pendingMillworkItemID.value.trim()});
      const quoteMillworkItems = this.state.quoteMillworkItems;
      quoteMillworkItems[quoteMillworkItems.length] = {name:pendingMillworkItem.name,_id:pendingMillworkItem._id, qty:this.state.pendingMillworkItemQty, cost:pendingMillworkItem.cost};

      this.setState({
        quoteMillworkItems: quoteMillworkItems,
        pendingMillworkItemID: undefined,
      }, () => this.props.callbackFromProject(this.state));
    }

    removeMillworkItem(event) {
      const target = event.target;
      const id = target.value;
      const quoteMillworkItems = this.state.quoteMillworkItems;

      this.state.quoteMillworkItems.map((quoteMillworkItem) => {
        if (quoteMillworkItem._id === id) {
          const index = quoteMillworkItems.indexOf(quoteMillworkItem);
          quoteMillworkItems.splice(index,1);
          this.setState({
              quoteMillworkItems: quoteMillworkItems,
            }, () => this.props.callbackFromProject(this.state));
        };
      });
    }

    totalCostEstimateDisplay() {
      const material = Number(this.materialCostEstimate())
      const doors = Number(this.doorCostEstimate())
      const paint = Number(this.paintCostEstimate())
      const drawers = Number(this.drawerCostEstimate())
      const hardware = Number(this.hardwareCostEstimate())
      const crown = Number(this.crownCostEstimate())
      const production = Number(this.productionCostEstimate())
      const accessories = Number(this.pendingAccessoryCostEstimate())+Number(this.addedAccessoriesCostEstimate())
      const millworkItems = Number(this.pendingMillworkItemCostEstimate())+Number(this.addedMillworkItemsCostEstimate())
      return (material+doors+paint+drawers+hardware+crown+production+accessories+millworkItems).toFixed(2)
    }

    materialCostEstimate() {
      if (this.state.constructionMaterial === '') {
        return 0;
      } else {
        const storedMaterial = Materials.findOne({name: this.state.constructionMaterial})
          return  (( storedMaterial.sheetCost/(storedMaterial.sheetW*storedMaterial.sheetL) )
                  *( (38*(this.state.height) + 656 + (156)*Math.trunc((this.state.height-56)/15))/144 )
                  *( this.state.linFootage )).toFixed(2)
      }
    }


    doorCostEstimate() {
      if (this.state.doorStyle === '') {
        return 0;
      } else {
        const storedDoorStyle = DoorStyles.findOne({name: this.state.doorStyle});
        if (this.state.doorSpecies === "Oak") {
          return ((((this.state.height-26)/12)*this.state.linFootage*storedDoorStyle.sqftOak) + (storedDoorStyle.itemCost*this.state.linFootage)).toFixed(2)
        } else if (this.state.doorSpecies === "Maple") {
          return ((((this.state.height-26)/12)*this.state.linFootage*storedDoorStyle.sqftMaple) + (storedDoorStyle.itemCost*this.state.linFootage)).toFixed(2)
        } else if (this.state.doorSpecies === "Cherry") {
          return ((((this.state.height-26)/12)*this.state.linFootage*storedDoorStyle.sqftCherry) + (storedDoorStyle.itemCost*this.state.linFootage)).toFixed(2)
        } else  if (this.state.doorSpecies === "MDF") {
          return ((((this.state.height-26)/12)*this.state.linFootage*storedDoorStyle.sqftMDF) + (storedDoorStyle.itemCost*this.state.linFootage)).toFixed(2)
        }
      }
    }

    paintCostEstimate() {
      if (this.state.color === '') {
        return 0;
      } else {
        const storedColor = Colors.findOne({name: this.state.color});
        if (storedColor.finishType === 'Paint') {
          /*Front Face sqft + sides sqft + back sqft*/
          return ( (((this.state.height-26)/12)*this.state.linFootage)*12 + (((((2*this.state.height)-4)*0.75)/144)*this.state.linFootage)*12 + ((((this.state.height-26)/12)*this.state.linFootage)*7) ).toFixed(2);
        }
      }
    }

    drawerCostEstimate() {
      if (this.state.drawerModel === '') {
        return 0;
      } else {
        const storedDrawer = Drawers.findOne({model: this.state.drawerModel});
        return (storedDrawer.cost*this.state.drawerQty).toFixed(2);
      }
    }

    hardwareCostEstimate() {
      if (this.state.hardware === '') {
        return 0;
      } else {
        const storedHardware = Hardware.findOne({name: this.state.hardware});
        this.state.hardwareQty = Math.trunc((this.state.linFootage)*2);
        return (storedHardware.cost*this.state.hardwareQty).toFixed(2);
      }
    }

    crownCostEstimate() {
      if (this.state.crownMolding === '') {
        return 0;
      } else {
        const storedCrownMolding = CrownMoldings.findOne({name: this.state.crownMolding})
        if (this.state.doorSpecies === 'MDF') {
          return (
            (this.state.linFootage*storedCrownMolding.ftPoplar).toFixed(2)
          );
        } else if (this.state.doorSpecies === 'Oak') {
          return (
            (this.state.linFootage*storedCrownMolding.ftOak).toFixed(2)
          );
        } else if (this.state.doorSpecies === 'Maple') {
          return (
            (this.state.linFootage*storedCrownMolding.ftMaple).toFixed(2)
          );
        }
      }
    }

    pendingAccessoryCostEstimate() {
      if (this.state.pendingAccessoryID != undefined) {
        const pendingAccessory = Accessories.findOne({_id: this.state.pendingAccessoryID});
        const currentOperations = Operations.findOne({activeOperation: 'true'});
        if (pendingAccessory != undefined) {
          return this.state.pendingAccessoryQty*(Number(pendingAccessory.cost)+Number(pendingAccessory.installationTime*currentOperations.avgLaborRate));
        } else {
          return 0;
        }
      } else {
        return 0;
      }
    }

    addedAccessoriesCostEstimate() {
      let totalAccessoriesCost = 0;
      this.state.quoteAccessories.map((listedAccessory) => {
        totalAccessoriesCost += listedAccessory.accessoryCost*listedAccessory.qty;
      })
      return totalAccessoriesCost;
    }

    pendingMillworkItemCostEstimate() {
      if (this.state.pendingMillworkItemID != undefined) {
        const pendingMillworkItem = MillworkItems.findOne({_id:this.state.pendingMillworkItemID});
        const currentOperations = Operations.findOne({activeOperation: 'true'});
        if (pendingMillworkItem != undefined) {
          return this.state.pendingMillworkItemQty*pendingMillworkItem.cost;
        } else {
          return 0;
        }
      } else {
        return 0;
      }
    }

    addedMillworkItemsCostEstimate() {
      let totalMillworkItemsCost = 0;
      this.state.quoteMillworkItems.map((listedMillworkItem) => {
        totalMillworkItemsCost += listedMillworkItem.cost*listedMillworkItem.qty;
      })
      return totalMillworkItemsCost;
    }

    productionCostEstimate() {
      if (this.state.linFootage === 0) {
        return 0;
      } else {
        const currentOperations = Operations.findOne({activeOperation: 'true'});
        const projectManufacturingHours = this.state.linFootage*(currentOperations.cutTimeFt + currentOperations.edgeTimeFt + currentOperations.assembleTimeFt + currentOperations.deliverTimeFt + currentOperations.installTimeFt);
        const projectDesignHours = this.state.linFootage*currentOperations.designTimeFt;
        const projectManufacturingCost = currentOperations.avgLaborRate*projectManufacturingHours;
        const projectDesignCost = currentOperations.avgDesignRate*projectDesignHours;
        const projectOverheadCost = (projectManufacturingHours/currentOperations.manufacturingCapacity)*(currentOperations.manuSpaceFactor/(currentOperations.manuSpaceFactor+1))*currentOperations.monthlyLiabilities + (projectDesignHours/currentOperations.designCapacity)*(1-(currentOperations.manuSpaceFactor/(currentOperations.manuSpaceFactor+1)))*currentOperations.monthlyLiabilities;
        return (projectManufacturingCost+projectOverheadCost+projectDesignCost).toFixed(2);
      }
    }


    render() {

      return (
        <div>
          <Panel collapsible defaultExpanded header={this.state.description+'- $'+this.totalCostEstimateDisplay()}>
            { /*Form Begins*
            <form className='form-horizontal' /*onSubmit={this.saveQuote.bind(this)}*/}
                <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                  <Tab eventKey={1} title="Construction Information">
                    { /*Input Room Name */ }
                    <div className='form-group'>
                      <label className='col-sm-2 control-label'>Description</label>
                      <div className='col-sm-4'>
                        <input type='text' className='form-control' name='description' ref='description' onChange={this.handleInputChange}/>
                      </div>
                    </div>

                    { /*Input Linear Footage */ }
                    <div className='form-group'>
                      <label className='col-sm-2 control-label'>Linear Footage</label>
                      <div className='col-sm-4'>
                        <input type='number' className='form-control' name='linFootage' ref='linFootage' onChange={this.handleInputChange}/>
                      </div>
                    </div>

                    { /*Input Cabinetry Height (ft) */ }
                    <div className='form-group'>
                      <label className='col-sm-2 control-label'>Cabinetry Height</label>
                      <div className='col-sm-4'>
                        <input type='number' className='form-control' name='height' ref='height' onChange={this.handleInputChange}/>
                      </div>
                    </div>

                    { /*Select Cabinet Construction Material*/ }
                    <div className='form-group'>
                      <label className='col-sm-2 control-label'>Cabinet Construction Material</label>
                      <div className='col-sm-4'>
                        <select className='form-control' name='constructionMaterial' ref='constructionMaterial' onChange={this.handleInputChange}>
                          <option> ... </option>
                          {this.props.materials.map((storedMaterial) => {
                            return (
                              <option value={storedMaterial.name} key={storedMaterial._id}>
                                {storedMaterial.name}
                              </option>
                            )
                          })}
                        </select>
                      </div>
                    </div>

                  </Tab>
                  <Tab eventKey={2} title="Doors & Colors">
                    { /*Select Species of Door*/ }
                    <div className='form-group'>
                      <label className='col-sm-2 control-label'>Door Species</label>
                      <div className='col-sm-4'>
                        <select className='form-control' name='doorSpecies' ref='doorSpecies' onChange={this.handleInputChange}>
                          <option> ... </option>
                          <option value='Oak'> Oak </option>
                          <option value='Maple'> Maple </option>
                          <option value='Cherry'> Cherry </option>
                          <option value='MDF'> MDF </option>
                        </select>
                      </div>
                    </div>

                    { /*Select Door Style*/ }
                    <div className='form-group'>
                      <label className='col-sm-2 control-label'>Door Style</label>
                      <div className='col-sm-4'>
                        <select className='form-control' name='doorStyle' ref='doorStyle' onChange={this.handleInputChange}>
                          <option> ... </option>
                          {this.props.doorStyles.map((storedDoorStyle) => {
                            return (
                              <option value={storedDoorStyle.name} key={storedDoorStyle._id}>
                                {storedDoorStyle.name}
                              </option>
                            )
                          })}
                        </select>
                      </div>
                    </div>

                    { /*Select Color*/ }
                    <div className='form-group'>
                      <label className='col-sm-2 control-label'>Color</label>
                      <div className='col-sm-4'>
                        <select className='form-control' name='color' ref='color' onChange={this.handleInputChange}>
                          <option> ... </option>
                          {this.props.colors.map((storedColor) => {
                            if (this.state.doorSpecies === 'MDF') {
                              if (storedColor.finishType === 'Paint') {
                                return (
                                  <option value={storedColor.name} key={storedColor._id}>
                                    {storedColor.name}
                                  </option>
                                )
                              }
                            } else {
                              return (
                                <option value={storedColor.name} key={storedColor._id}>
                                  {storedColor.name}
                                </option>
                              )
                            }
                          })}
                        </select>
                      </div>
                    </div>
                  </Tab>
                  <Tab eventKey={3} title="Hardware">
                    { /*Select Drawer Type*/ }
                    <div className='form-group'>
                      <div className='row'>
                        <div className='col-sm-6'>
                          <label className='col-sm-2 control-label'>Drawer Type</label>
                          <div className='col-sm-4'>
                            <select className='form-control' name='drawerModel' ref='drawerModel' onChange={this.handleInputChange}>
                              <option> ... </option>
                              {this.props.drawers.map((storedDrawer) => {
                                return (
                                  <option value={storedDrawer.model} key={storedDrawer._id}>
                                    {storedDrawer.manufacturer} - {storedDrawer.model}
                                  </option>
                                )
                              })}
                            </select>
                          </div>
                        </div>
                        <div className='col-sm-6'>
                          <label className='col-sm-2 control-label'>Quantity</label>
                          <div className='col-sm-4'>
                            <input type='number' className='form-control' placeholder='4' name='drawerQty' ref='drawerQty' onChange={this.handleInputChange}/>
                          </div>
                        </div>
                      </div>
                    </div>

                    { /*Select Hardware*/ }
                    <div className='form-group'>
                      <div className='row'>
                        <div className='col-sm-6'>
                          <label className='col-sm-2 control-label'>Hardware</label>
                          <div className='col-sm-4'>
                            <select className='form-control' name='hardware' ref='hardware' onChange={this.handleInputChange}>
                              <option> ... </option>
                              {this.props.hardware.map((storedHardware) => {
                                return (
                                  <option value={storedHardware.name} key={storedHardware._id}>
                                    {storedHardware.name}
                                  </option>
                                )
                              })}
                            </select>
                          </div>
                        </div>
                        <div className='col-sm-6'>
                          <label className='col-sm-2 control-label'>Quantity</label>
                          <div className='col-sm-4'>
                            <input type='text' className='form-control' placeholder={Math.trunc((this.state.linFootage)*2)} ref='hardwareQty' onChange={this.handleInputChange}/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Tab>
                  <Tab eventKey={4} title="Moldings">
                    { /*Select Crown Molding*/ }
                    <div className='form-group'>
                      <label className='col-sm-2 control-label'>Crown Molding</label>
                      <div className='col-sm-4'>
                        <select className='form-control' name='crownMolding' ref='crownMolding' onChange={this.handleInputChange}>
                          <option> ... </option>
                          {this.props.crownMoldings.map((storedCrownMolding) => {
                            return (
                              <option value={storedCrownMolding.name} key={storedCrownMolding._id}>
                                {storedCrownMolding.name}
                              </option>
                            )
                          })}
                        </select>
                      </div>
                    </div>

                    { /*Select Molding for Crown*/ }
                    <div className='form-group'>
                      <label className='col-sm-2 control-label'>Deco-Rail</label>
                      <div className='col-sm-4'>
                        <select className='form-control' ref='molding'>
                          <option> ... </option>
                          <option value='Brenlo211'> Brenlo - 211 </option>
                          <option value='Brenlo212'> Brenlo - 212 </option>
                          <option value='Brenlo164'> Brenlo - 164 </option>
                        </select>
                      </div>
                    </div>

                    { /*Select Light Valance*/ }
                    <div className='form-group'>
                      <label className='col-sm-2 control-label'>Light Valance</label>
                      <div className='col-sm-4'>
                        <input type='checkbox' ref='lightValance' value='true' />
                      </div>
                    </div>
                  </Tab>
                  <Tab eventKey={5} title="Accessories">
                    { /*Add Accessories to Quote*/ }
                    <div className='form-group'>


                    </div>

                    <table className="table table-sm">
                      <thead>
                        <tr>
                          <th>Accessory Name</th>
                          <th>Accessory Qty</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.quoteAccessories.map((quoteAccessory) => {
                          return (
                            <tr key={quoteAccessory._id}>
                              <td>{quoteAccessory.name} </td>
                              <td>{quoteAccessory.qty} </td>
                              <td><button className='btn btn-outline-primary' value={quoteAccessory._id} onClick={this.removeAccessory}>Remove</button></td>
                            </tr>
                          )
                        })}
                      </tbody>
                      <td>
                        <select className='form-control' name='pendingAccessoryID' ref='pendingAccessoryID' onChange={this.handleInputChange}>
                          <option> ... </option>
                          {this.props.accessories.map((storedAccessory) => {
                            return (
                              <option value={storedAccessory._id} key={storedAccessory._id}>
                                {storedAccessory.minIntWidth}-{storedAccessory.name}-{storedAccessory.supplier}
                              </option>
                            )
                          })}
                        </select>
                      </td>
                      <td>
                        <input type='number' className='form-control' name='pendingAccessoryQty' ref='pendingAccessoryQty' onChange={this.handleInputChange}/>
                      </td>
                      <td>
                        <Button bsSize='small' onClick={this.addAccessory}> Add Accessory </Button>
                      </td>
                    </table>
                  </Tab>
                  <Tab eventKey={6} title="Custom Millwork">
                    { /*Add Custom Woodworking Items to Quote*/ }
                    <Table responsive>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Qty</th>
                          <th>Material</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.quoteMillworkItems.map((quoteMillworkItem) => {
                          return (
                            <tr key={quoteMillworkItem._id}>
                              <td>{quoteMillworkItem.name} </td>
                              <td>{quoteMillworkItem.qty} </td>
                              <td>{quoteMillworkItem.material} </td>
                              <td><button className='btn btn-outline-primary' value={quoteMillworkItem._id} onClick={this.removeMillworkItem}>Remove</button></td>
                            </tr>
                          )
                        })}
                        <td>
                          <select className='form-control' name='pendingMillworkItemID' ref='pendingMillworkItemID' onChange={this.handleInputChange}>
                            <option> ... </option>
                            {this.props.millworkItems.map((storedMillworkItem) => {
                              return (
                                <option value={storedMillworkItem._id} key={storedMillworkItem._id}>
                                  {storedMillworkItem.name}-{storedMillworkItem.width}-{storedMillworkItem.material}
                                </option>
                              )
                            })}
                          </select>
                        </td>
                        <td>
                          <input type='number' className='form-control' name='pendingMillworkItemQty' ref='pendingMillworkItemQty' onChange={this.handleInputChange}/>
                        </td>
                        <td>Insert Material Selection</td>
                        <td>
                          <Button bsSize='small' onClick={this.addMillworkItem}> Add Millwork Item </Button>
                        </td>
                      </tbody>
                    </Table>
                  </Tab>
                </Tabs>

              </Panel>
            {/*</form>*/}

    </div>
      );
    }
  }

  export default createContainer(() => {
    if(Meteor.userId()){
      let materialsSub = Meteor.subscribe('allMaterials');
      let doorStylesSub = Meteor.subscribe('allDoorStyles');
      let colorsSub = Meteor.subscribe('allColors');
      let drawersSub = Meteor.subscribe('allDrawers');
      let hardwareSub = Meteor.subscribe('allHardware');
      let crownMoldingsSub = Meteor.subscribe('allCrownMoldings');
      let operationsSub = Meteor.subscribe('allOperations');
      let quotesSub = Meteor.subscribe('allQuotes');
      let usersSub = Meteor.subscribe('currentUser');
      let accessoriesSub = Meteor.subscribe('allAccessories');
      let millworkItemsSub = Meteor.subscribe('allMillworkItems');
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
    }
  }, NewQuote);

}
