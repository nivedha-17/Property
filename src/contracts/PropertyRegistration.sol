//SPDX-License-Identifier: UNLICENSED
pragma solidity >0.4.16;
contract PropertyRegistration {
    address chairPerson;
    
    struct propertyDetails {
        string ownerName;
        uint64 onwerAdhaar;
        uint propertyID;
        string area;
        string district;
        string state;
        uint sqFeet;
    } 
    
    event registeredProperty(uint propertyID);
    event soldProperty(uint propertyID);
    
    mapping(uint => propertyDetails) property;
    
    constructor() public {
        chairPerson = msg.sender;
    } 
    
    modifier onlyChairperson() {
        require(msg.sender == chairPerson);
        _;
    }
    
    function registerProperty(string memory _ownerName,uint64 _ownerAdhaar,string memory _area,string memory _district,string memory _state,uint _sqFeet) public onlyChairperson {
        uint _propertyID = getPropertyDetailsHash(_ownerName,_ownerAdhaar,_area,_district,_state,_sqFeet);
        require(property[_propertyID].onwerAdhaar == 0);
        property[_propertyID].ownerName = _ownerName;
        property[_propertyID].onwerAdhaar = _ownerAdhaar;        
        property[_propertyID].area = _area;
        property[_propertyID].district = _district;
        property[_propertyID].state = _state;
        property[_propertyID].sqFeet = _sqFeet;        
        emit registeredProperty(_propertyID);
    }
    function getPropertyDetailsHash(string memory _ownerName,uint64 _ownerAdhaar,string memory _area,string memory _district,string memory _state,uint _sqFeet) internal pure returns (uint) {
        uint hash = uint(keccak256(abi.encodePacked(_ownerName,_ownerAdhaar,_area,_district,_state,_sqFeet)))%1000000000000000;
        return hash;
    }
    function sellProperty(uint _propertyID,string memory _newOwnerName,uint64 _newOwnerAdhaar,uint _sellingSqFeet) public onlyChairperson {
        require((property[_propertyID].onwerAdhaar != 0) && (property[_propertyID].sqFeet >= _sellingSqFeet));     
        (string memory ownerName,uint64 ownerAdhaar,string memory area,string memory district,string memory state,uint sqFeet) = getPropertyDetails(_propertyID);   
        if(_sellingSqFeet == property[_propertyID].sqFeet) {                
            registerProperty(_newOwnerName,_newOwnerAdhaar,area,district,state,sqFeet);
        } else {                       
            uint newSqFeet = sqFeet - _sellingSqFeet;           
            registerProperty(_newOwnerName,_newOwnerAdhaar,area,district,state,_sellingSqFeet); // new owner
            registerProperty(ownerName,ownerAdhaar,area,district,state,newSqFeet);  // original owner            
        }
        delete property[_propertyID];
        emit soldProperty(_propertyID);
    }
    function getPropertyDetails(uint _propertyID) public view returns (string memory,uint64,string memory,string memory,string memory,uint) {
        string memory ownerName = property[_propertyID].ownerName;
        uint64 ownerAdhaar = property[_propertyID].onwerAdhaar;
        string memory area = property[_propertyID].area;
        string memory district = property[_propertyID].district;
        string memory state = property[_propertyID].state;
        uint sqFeet = property[_propertyID].sqFeet;
        return (ownerName,ownerAdhaar,area,district,state,sqFeet);
    }
}