import React,{ Component } from 'react';
import Select from 'react-select';

const options = [
    {value:'sqFeet',label:'Square Feet'},
    {value:'acre',label:'Acre'},
    {value:'cent',label:'Cent'}
]
class SellProperty extends Component {
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
               <h2 style={{paddingTop:"12px"}}>Sell Property</h2>
               <form onSubmit={(event) => {
                   event.preventDefault()
                   const propertyID = this.propertyID.value
                   const name = this.newOwnerName.value.toLowerCase()
                   const adhaar = this.newOwnerAdhaar.value                   
                   const size = this.size.value
                   const propertyType = this.state.selectedType                  
                   let sqFeet;
                   if(propertyType == 'sqFeet') {sqFeet=size}
                   else if(propertyType == 'acre') {sqFeet=size*43560}
                   else {sqFeet=size*435}                 
                   this.props.sellProperty(propertyID,name,adhaar,sqFeet)
               }}>
                   <div className="form-group row d-flex flex-row">
                        <div className="col-sm-4"><label className="labels" htmlFor="propertyID">Enter the Property ID:</label></div>
                        <div className="col-sm-5"><input id="propertyID" type="text" ref={(input) => {this.propertyID = input}}
                                                   className="form-control" placeholder="Property ID"
                                                   required /></div>
                    </div>
                   <div className="form-group row d-flex flex-row">
                        <div className="col-sm-4"><label className="labels" htmlFor="newOwnerName">Enter the New Owner's name:</label></div>
                        <div className="col-sm-5"><input id="newOwnerName" type="text" ref={(input) => {this.newOwnerName = input}}
                                                   className="form-control" placeholder="New Owner's Name"
                                                   required /></div>
                    </div>
                    <div className="form-group row d-flex flex-row">
                        <div className="col-sm-4"><label className="labels" htmlFor="newOwnerAdhaar">Enter the New Owner's Adhaar number:</label></div>
                        <div className="col-sm-5"><input id="newOwnerAdhaar" type="text" ref={(input) => {this.newOwnerAdhaar = input}}
                                                   className="form-control" placeholder="New Owner's Adhaar Number"
                                                   required /></div>
                    </div>                    
                    <div className="form-group row d-flex flex-row">
                        <div className="col-sm-4"><label className="labels" htmlFor="size">Enter the size of property:</label></div>
                        <div className="col-sm-2"><input id="size" type="text" ref={(input) => {this.size = input}}
                                                   className="form-control" placeholder="Property Size" required /></div>
                        <div className="col-sm-3"><Select options={options} value={options.find(option => option.value === selectedType)} onChange={this.handleChange} />
                    </div>                          
                    </div>
                    <button type="submit" className="btn btn-dark">Sell Property</button>
               </form>               
            </div>
        )
    }
}
export default SellProperty;