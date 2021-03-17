const truffleAssert = require('truffle-assertions');
const _deploy_constracts = require("../migrations/2_deploy_contracts")
const propertyRegistration = artifacts.require("PropertyRegistration");
const utils = require("./helper/utils");

contract("propertyRegistration", (accounts) => {
    let [U,V,W] = (accounts);
    let propertyRegistrationInstance;
    beforeEach(async() => {
        propertyRegistrationInstance = await propertyRegistration.new();
    });
    it("should be able to register a new property by chairperson", async() => {
        const result = await propertyRegistrationInstance.registerProperty(     
            "Nikhil",
            870045348900,
            "Dharavi",
            "Bombay",
            "Maharastra",
            2500,            
            {from:U}
        );
        assert.equal(result.receipt.status,true);        
    })
    it("should not be able to register a new property other than chairperson", async() => {        
        await utils.shouldThrow(propertyRegistrationInstance.registerProperty(
            "Nikhil",
            870045348900,
            "Dharavi",
            "Bombay",
            "Maharastra",
            2500,
            {from:V}
        ));
    })
    it("should not be able to register the same property by chairperson", async() => {        
        const result = await propertyRegistrationInstance.registerProperty(     
            "Nikhil",
            870045348900,
            "Dharavi",
            "Bombay",
            "Maharastra",
            2500,            
            {from:U}
        );
        await utils.shouldThrow(propertyRegistrationInstance.registerProperty(
            "Nikhil",
            870045348900,
            "Dharavi",
            "Bombay",
            "Maharastra",
            2500,
            {from:U}
        ));
    })
    it("should be able to sell the property by chairperson", async() => {
        const result1 = await propertyRegistrationInstance.registerProperty(     
            "Nikhil",
            870045348900,
            "Dharavi",
            "Bombay",
            "Maharastra",
            2500,            
            {from:U}
        );
        hash = result1.logs[0].args.propertyID.toNumber();
        const result2 = await propertyRegistrationInstance.sellProperty(
            hash,
            "Sumanth",
            234562345700,
            500,
            {from:U}
        );
        assert.equal(result2.receipt.status,true); 
    })
    it("should not be able to sell unregistered property by chairperson", async() => {
        const result1 = await propertyRegistrationInstance.registerProperty(     
            "Nikhil",
            870045348900,
            "Dharavi",
            "Bombay",
            "Maharastra",
            2500,            
            {from:U}
        );
        hash = result1.logs[0].args.propertyID.toNumber();
        await utils.shouldThrow(propertyRegistrationInstance.sellProperty(
            hash+2,
            "Sumanth",
            234562345700,
            2500,
            {from:U}
        ));
    })
    it("should not be able to sell new property more than the actual square feet by chairperson", async() => {        
        const result1 = await propertyRegistrationInstance.registerProperty(     
            "Nikhil",
            870045348900,
            "Dharavi",
            "Bombay",
            "Maharastra",
            2500,            
            {from:U}
        );
        hash = result1.logs[0].args.propertyID.toNumber();
        await utils.shouldThrow(propertyRegistrationInstance.sellProperty(
            hash,
            "Sumanth",
            234562345700,
            2501,
            {from:U}
        ));
    })
    it("should not be able to sell the property other than chairperson", async() => {
        const result1 = await propertyRegistrationInstance.registerProperty(     
            "Nikhil",
            870045348900,
            "Dharavi",
            "Bombay",
            "Maharastra",
            2500,            
            {from:U}
        );
        hash = result1.logs[0].args.propertyID.toNumber();
        await utils.shouldThrow(propertyRegistrationInstance.sellProperty(
            hash,
            "Sumanth",
            234562345700,
            2500,
            {from:V}
        ));         
    })
    it("should be able to return owner of a property", async() => {
        const result1 = await propertyRegistrationInstance.registerProperty(     
            "Nikhil",
            870045348900,
            "Dharavi",
            "Bombay",
            "Maharastra",
            2500,            
            {from:U}
        );
        hash1 = result1.logs[0].args.propertyID.toNumber();
        const result2 = await propertyRegistrationInstance.findOwner(
            hash1,
            {from:V}
        );
        assert.equal(result2,"Nikhil");
        const result3 = await propertyRegistrationInstance.sellProperty(
            hash1,
            "Sumanth",
            234562345700,
            500,
            {from:U}
        );
        hash2 = result3.logs[1].args.propertyID.toNumber();
        const result4 = await propertyRegistrationInstance.findOwner(
            hash2,
            {from:V}
        );
        assert.equal(result4,"Sumanth");
    })
})
