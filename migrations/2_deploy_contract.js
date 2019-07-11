const Proxy = artifacts.require('Proxy');
const Counter1 = artifacts.require('Counter1');
const Counter2 = artifacts.require('Counter2');

module.exports = function(deployer) {
  deployer.deploy(Proxy);
  deployer.deploy(Counter1);
  deployer.deploy(Counter2);
};
