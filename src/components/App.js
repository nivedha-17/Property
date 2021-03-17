import React,{Component} from 'react';
import {BrowserRouter as Router,Route,Link,Switch,BrowserRouter} from 'react-router-dom';
import Web3 from 'web3';
import PropertyContract from '../build/contracts/PropertyRegistration.json';
import RegisterProperty from './RegisterProperty';
import SellProperty from './SellProperty';
import PropertyDetails from './PropertyDetails';

class App extends Component {    
    async componentWillMount() {
        await this.loadWeb3()
        await this.loadBlockchainData()
    }
    async loadWeb3() {
        if(window.ethereum) {
            window.web3 = new Web3(ethereum);
            await window.ethereum.enable();
        } else if(window.web3) {
            window.web3 = new Web3(web3.currentProvider);
        } else {
            console.log("Non-ethereum browser")
        }
    }
    async loadBlockchainData() {
        const web3 = window.web3
        const accounts = await web3.eth.getAccounts()        
        this.setState({chairperson:accounts[0]})
        const networkID = await web3.eth.net.getId()
        const networkData = PropertyContract.networks[networkID]
        if(networkData) {
            const propertyRegistrationInstance = new web3.eth.Contract(PropertyContract.abi,networkData.address)
            this.setState({propertyRegistrationInstance})           
            propertyRegistrationInstance.events.registeredProperty()
                .on("data",function(event) {
                    let registeredProperty = event.returnValues;
                    window.alert("PropertyID: "+registeredProperty[0])                                                                                                                      
                }).on("error",function(error) {
                    console.log(error)
                })            
        } else {
            window.alert('PropertyRegistration contract not deployed')
        }
    }
    constructor(props) {
        super(props)
        this.state = {
            chairperson:'',
            propertyDetails:{
                name:'',
                adhaar:0,
                area:'',
                district:'',
                stateName:'',
                sqFeet:0
            },            
        }
        this.registerProperty = this.registerProperty.bind(this)
        this.sellProperty = this.sellProperty.bind(this)
        this.getPropertyDetails = this.getPropertyDetails.bind(this)
    }
    registerProperty(name,adhaar,area,district,state,sqFeet) {
        this.setState({loading:true})
        this.state.propertyRegistrationInstance.methods.registerProperty(name,adhaar,area,district,state,sqFeet)
            .send({from:this.state.chairperson})   
            .once('receipt',(receipt) => {
                this.setState({loading:false})
            })         
    }
    sellProperty(propertyID,name,adhaar,sqFeet) {
        this.state.propertyRegistrationInstance.methods.sellProperty(propertyID,name,adhaar,sqFeet)
            .send({from:this.state.chairperson})
    }
    async getPropertyDetails(propertyID) {
        const propDetails = await this.state.propertyRegistrationInstance.methods.getPropertyDetails(propertyID).call();
        console.log(propDetails)
        this.setState({
            propertyDetails: {
                ...this.state.propertyDetails,
                name:propDetails[0],
                adhaar:propDetails[1],
                area:propDetails[2],
                district:propDetails[3],
                stateName:propDetails[4],
                sqFeet:propDetails[5]
            }
        })
    }
    
    render(){
        return(
           <div className="container">
               <h1 style={{paddingTop:"20px",paddingBottom:"20px"}} className="text-center">Property Registration</h1>
               <nav className = "navbar navbar-expand-lg navbar-dark bg-dark">
                   <div className="container-fluid">
                        <ul className="nav navbar-nav">
                            <li className="nav-item">
                                <a href="/" className="nav-link">Register Property</a>
                            </li>
                            <li className="nav-item">
                                <a href="/sellProperty" className="nav-link">Sell Property</a>
                            </li>   
                            <li className="nav-item">
                                <a href="/propertyDetails" className="nav-link">Property Details</a>
                            </li>                           
                        </ul>
                    </div>
                </nav>                    
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/">
                            <RegisterProperty registerProperty={this.registerProperty} />
                        </Route>
                        <Route path="/sellProperty">
                            <SellProperty sellProperty={this.sellProperty}/>
                        </Route>
                        <Route path="/propertyDetails">
                            <PropertyDetails propertyDetails={this.state.propertyDetails} getPropertyDetails={this.getPropertyDetails}/>                            
                        </Route>                                               
                    </Switch>
                </BrowserRouter>
           </div>
        );
    }
}
export default App;