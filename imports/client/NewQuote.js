if (Meteor.userId()) {
  import React, {Component} from 'react';
  import { createContainer } from 'meteor/react-meteor-data';

  import Quotes from '../api/Quotes';
  import Materials from '../api/Materials';
  import DoorStyles from '../api/DoorStyles';
  import Colors from '../api/Colors';
  import Drawers from '../api/Drawers';
  import Hardware from '../api/Hardware';
  import CrownMoldings from '../api/CrownMoldings';
  import Operations from '../api/Operations';

  class NewQuote extends Component {

    constructor(props) {
      super(props);
      this.state = {
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
        price:0,
      };

      this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
     const target = event.target;
     const value = target.value;
     const name = target.name;

     this.setState({
       [name]: value,
     });
    }

    totalCostEstimate() {
      const material = Number(this.materialCostEstimate())
      const doors = Number(this.doorCostEstimate())
      const paint = Number(this.paintCostEstimate())
      const drawers = Number(this.drawerCostEstimate())
      const hardware = Number(this.hardwareCostEstimate())
      const crown = Number(this.crownCostEstimate())
      const production = Number(this.productionCostEstimate())
      return (material+doors+paint+drawers+hardware+crown+production).toFixed(2)
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
          return ((((this.state.height-26)/12)*this.state.linFootage)*10 + ((((2*this.state.height-4)*0.75)/144)*this.state.linFootage)*10 + (((this.state.height-26)/12)*this.state.linFootage)*6).toFixed(2);
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

    saveQuote(event) {
      event.preventDefault();
      const jobStatus = this.refs.jobStatus.value.trim();
      const jobName = this.refs.jobName.value.trim();
      const jobAddress = this.refs.jobAddress.value.trim();
      const linFootage = this.refs.linFootage.value.trim();
      const height = this.refs.height.value.trim();
      const constructionMaterial = this.refs.constructionMaterial.value.trim();
      const doorSpecies = this.refs.doorSpecies.value.trim();
      const doorStyle = this.refs.doorStyle.value.trim();
      const color = this.refs.color.value.trim();
      const drawerModel = this.refs.drawerModel.value.trim();
      const drawerQty = this.refs.drawerQty.value.trim();
      const hardware = this.refs.hardware.value.trim();
      const hardwareQty = this.refs.hardwareQty.value.trim();
      const crownMolding = this.refs.crownMolding.value.trim();
      const lightValance = this.refs.lightValance.value.trim();
      const molding = this.refs.molding.value.trim();
      const jobValue = this.totalCostEstimate();

      if (jobName != '' && jobAddress != '') {
        Meteor.call('insertNewQuote',jobStatus,jobName,jobAddress,linFootage,height,constructionMaterial,doorSpecies,doorStyle,color,drawerModel,drawerQty,hardware,hardwareQty,crownMolding,lightValance,molding,jobValue);
        this.refs.jobName.value = '';
        this.refs.jobAddress.value = '';
      }
    }

    render() {

      return (
        <div>
          <h2>New Quote</h2>
          <div>
            { /*Form Begins*/ }
            <form className='form-horizontal' onSubmit={this.saveQuote.bind(this)}>

              { /*Select Job Status */ }
              <div className='form-group'>
                <label className='col-sm-2 control-label'>Status</label>
                <div className='col-sm-4'>
                  <select className='form-control' name='jobStatus' ref='jobStatus' onChange={this.handleInputChange}>
                    <option value='Quoting'> Quoting </option>
                    <option value='Won'> Won </option>
                    <option value='Lost'> Lost </option>
                  </select>
                </div>
              </div>

              { /*Input Job Name */ }
              <div className='form-group'>
                <label className='col-sm-2 control-label'>Job name</label>
                <div className='col-sm-4'>
                  <input type='text' className='form-control' ref='jobName'/>
                </div>
              </div>

              { /*Input Job Address */ }
              <div className='form-group'>
                <label className='col-sm-2 control-label'>Job Address</label>
                <div className='col-sm-4'>
                  <input type='text' className='form-control' ref='jobAddress'/>
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

              { /*Select Species of Door*/ }
              <div className='form-group'>
                <label className='col-sm-2 control-label'>Door Species</label>
                <div className='col-sm-4'>
                  <select className='form-control' name='doorSpecies' ref='doorSpecies' onChange={this.handleInputChange}>
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
                    {this.props.colors.map((storedColor) => {
                      return (
                        <option value={storedColor.name} key={storedColor._id}>
                          {storedColor.name}
                        </option>
                      )
                    })}
                  </select>
                </div>
              </div>

              { /*Select Drawer Type*/ }
              <div className='form-group'>
                <div className='row'>
                  <div className='col-sm-6'>
                    <label className='col-sm-2 control-label'>Drawer Type</label>
                    <div className='col-sm-4'>
                      <select className='form-control' name='drawerModel' ref='drawerModel' onChange={this.handleInputChange}>
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

              { /*Select Crown Molding*/ }
              <div className='form-group'>
                <label className='col-sm-2 control-label'>Crown Molding</label>
                <div className='col-sm-4'>
                  <select className='form-control' name='crownMolding' ref='crownMolding' onChange={this.handleInputChange}>
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



              <button className='btn btn-primary' type='submit'>Save Quote </button>
            </form>
          <div>
        </div>
      </div>


      {/*This is a fixed div in the right hand corner of the page that actively calculates the quote before it is submitted to the database */}
      <div className='fixed'>
        <div>
          <h1>TOTAL Cost: ${this.totalCostEstimate()} </h1>
          <h3>Estimated Material Cost: ${this.materialCostEstimate()}</h3>
          <h3>Estimated Door Cost: ${this.doorCostEstimate()}</h3>
          <h3>Estimated Finishing Cost: ${this.paintCostEstimate()}</h3>
          <h3>Estimated Drawer Cost: ${this.drawerCostEstimate()}</h3>
          <h3>Estimated Hardware Cost: ${this.hardwareCostEstimate()}</h3>
          <h3>Estimated Crown Cost: ${this.crownCostEstimate()}</h3>
          <h3>Estimated Production Cost: ${this.productionCostEstimate()}</h3>
        </div>
      </div>

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
    }

    return {
      materials: Materials.find({}).fetch(),
      doorStyles: DoorStyles.find({}).fetch(),
      colors: Colors.find({}).fetch(),
      drawers: Drawers.find({}).fetch(),
      hardware: Hardware.find({}).fetch(),
      crownMoldings: CrownMoldings.find({}).fetch(),
      operations: Operations.find({}).fetch(),
    }
  }, NewQuote);

}
