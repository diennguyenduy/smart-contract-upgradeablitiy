const Counter1 = artifacts.require('Counter1');
const Counter2 = artifacts.require('Counter2');
const Proxy = artifacts.require('Proxy');

contract('Upgradeable', function(accounts) {
  it('should work', async function() {
    const impl_v1 = await Counter1.new();
    const impl_v2 = await Counter2.new();
    const impl_proxy = await Proxy.new();

    await impl_proxy.upgradeTo(impl_v1.address);
    //    await Counter1.at(impl_proxy.address).increaseByOne({ from: accounts[0] });
    await Counter1.increaseByOne({ from: accounts[0] });
    const value = await Counter1.at(impl_proxy.address).getValue();
    console.log(value);

    await impl_proxy.upgradeTo(impl_v2.address);
    //    await Counter2.at(impl_proxy.address).increaseByOne({ from: accounts[0] });
    await Counter2.increaseByOne({ from: accounts[0] });
    const value2 = await Counter2.at(impl_proxy.address).getValue();
    console.log(value2);
  });
});
