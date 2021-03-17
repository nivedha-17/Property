var propertyRegistration = artifacts.require("PropertyRegistration");
module.exports = function(deployer) {
    deployer.deploy(propertyRegistration);
}