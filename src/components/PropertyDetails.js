import React,{ Component } from 'react';
class PropertyDetails extends Component {  
    constructor(props) {
        super(props)
        this.state = {
            displayDetails:false
        }
    }  
    renderTable(propertyDetails) {
        if(this.state.displayDetails) {
            const result = Object.values(propertyDetails)
            return (
                <table id="propDetails" style={{marginTop:"12px"}} className="table">
                    <tbody>
                        <tr>
                            <th scope="row">Owner's Name</th>
                            <td>{result[0]}</td>
                        </tr>
                        <tr>
                            <th scope="row">Owner's Adhaar Number</th>
                            <td>{result[1]}</td>
                        </tr>
                        <tr>
                            <th scope="row">Property Area</th>
                            <td>{result[2]}</td>
                        </tr>
                        <tr>
                            <th scope="row">Property District</th>
                            <td>{result[3]}</td>
                        </tr>
                        <tr>
                            <th scope="row">Property State</th>
                            <td>{result[4]}</td>
                        </tr>
                        <tr>
                            <th scope="row">Property Square Feet</th>
                            <td>{result[5]}</td>
                        </tr>
                </tbody>
                </table>
            ) 
        } 
    }
    render() {
        return(            
           <div id="content1">
               <h2 style={{paddingTop:"12px"}}>Property Details</h2>
               <form onSubmit={(event) => {
                   event.preventDefault()
                   const propertyID = this.propertyID.value
                   this.props.getPropertyDetails(propertyID) 
                   this.setState({displayDetails:true})                                     
               }}>
                   <div className="form-group row d-flex flex-row">
                        <div className="col-sm-4"><label className="labels" htmlFor="propertyID">Enter the Property ID:</label></div>
                        <div className="col-sm-5"><input id="propertyID" type="text" ref={(input) => {this.propertyID = input}}
                                                   className="form-control" placeholder="Property ID"
                                                   required /></div>
                    </div>
                    <button type="submit" className="btn btn-dark">Get Property Details</button>                                       
                </form>  
                {this.renderTable(this.props.propertyDetails)}
           </div>
        )}
}
export default PropertyDetails;