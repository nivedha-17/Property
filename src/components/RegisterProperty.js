import React,{ Component } from 'react';
import Select from 'react-select';

const options = [
    {value:'sqFeet',label:'Square Feet'},
    {value:'acre',label:'Acre'},
    {value:'cent',label:'Cent'}
]

class RegisterProperty extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedType:null
        }        
        this.handleChange = this.handleChange.bind(this)       
    }
    handleChange(event) {     
        this.setState({selectedType:event.value})              
    }
    render() {
        const {selectedType} = this.state;
        return(
           <div id="content">
               <h2 style={{paddingTop:"12px"}}>Register Property</h2>
               <form onSubmit={(event) => {
                   event.preventDefault()
                   const name = this.ownerName.value.toLowerCase()
                   const adhaar = this.ownerAdhaar.value
                   const area = this.area.value.toLowerCase()
                   const district = this.district.value.toLowerCase()
                   const state = this.stateName.value.toLowerCase()
                   const size = this.size.value
                   const propertyType = this.state.selectedType                  
                   let sqFeet;
                   if(propertyType == 'sqFeet') {sqFeet=size}
                   else if(propertyType == 'acre') {sqFeet=size*43560}
                   else {sqFeet=size*435}                    
                   this.props.registerProperty(name,adhaar,area,district,state,sqFeet)
               }}>
                    <div className="form-group row d-flex flex-row">
                        <div className="col-sm-4"><label className="labels" htmlFor="ownerName">Enter the Owner's name:</label></div>
                        <div className="col-sm-5"><input id="ownerName" type="text" ref={(input) => {this.ownerName = input}}
                                                   className="form-control" placeholder="Owner's Name"
                                                   required /></div>
                    </div>
                    <div className="form-group row d-flex flex-row">
                        <div className="col-sm-4"><label className="labels" htmlFor="ownerAdhaar">Enter the Owner's Adhaar number:</label></div>
                        <div className="col-sm-5"><input id="ownerAdhaar" type="text" ref={(input) => {this.ownerAdhaar = input}}
                                                   className="form-control" placeholder="Owner's Adhaar Number"
                                                   required /></div>
                    </div>
                    <div className="form-group row d-flex flex-row">
                        <div className="col-sm-4"><label className="labels" htmlFor="area">Enter the area where property is located:</label></div>
                        <div className="col-sm-5"><input id="area" type="text" ref={(input) => {this.area = input}}
                                                   className="form-control" placeholder="Property Location"
                                                   required /></div>
                    </div>
                    <div className="form-group row d-flex flex-row">
                        <div className="col-sm-4"><label className="labels" htmlFor="district">Enter the district where property is located:</label></div>
                        <div className="col-sm-5"><input id="district" type="text" ref={(input) => {this.district = input}}
                                                   className="form-control" placeholder="Property District"
                                                   required /></div>
                    </div>
                    <div className="form-group row d-flex flex-row">
                        <div className="col-sm-4"><label className="labels" htmlFor="state">Enter the state where property is located:</label></div>
                        <div className="col-sm-5"><input id="stateName" type="text" ref={(input) => {this.stateName = input}}
                                                   className="form-control" placeholder="Property State"
                                                   required /></div> 
                    </div> 
                    <div className="form-group row d-flex flex-row">
                        <div className="col-sm-4"><label className="labels" htmlFor="size">Enter the size of property:</label></div>
                        <div className="col-sm-2"><input id="size" type="text" ref={(input) => {this.size = input}}
                                                   className="form-control" placeholder="Property Size" required /></div>
                        <div className="col-sm-3"><Select options={options} value={options.find(option => option.value === selectedType)} onChange={this.handleChange} />
                        </div>                           
                    </div>
                    <button type="submit" className="btn btn-dark" onClick={this.handleSubmit}>Register Property</button>
               </form> 
            </div>
        )
    }
}
export default RegisterProperty;
//198939753986326 148231558140596 901527508663397