// not work yet because version (maybe)
const Counter1 = artifacts.require('Counter1');
const Counter2 = artifacts.require('Counter2');
const Proxy = artifacts.require('Proxy');

contract('Upgradeable', function(accounts) {
  describe('Test contract', async function() {
    it('should work', async function() {
      const impl_v1 = await Counter1.new();
      const impl_v2 = await Counter2.new();

      await impl_v1.increaseByOne({ from: accounts[0] });
      let value1 = await impl_v1.getValue({ from: accounts[0] });
      assert.equal(2, value1);

      await impl_v2.increaseByOne({ from: accounts[0] });
      let value2 = await impl_v2.getValue({ from: accounts[0] });
      assert.equal(1, value2);
    });
    it('should be upgradeable', async function() {
      const impl_v1 = await Counter1.new();
      const impl_v2 = await Counter2.new();
      const impl_proxy = await Proxy.new();

      console.log(Counter1);
      await impl_proxy.upgradeTo(impl_v1.address, { from: accounts[1] });
      // await Counter1.at(impl_proxy.address)
      //   .increaseByOne()
      //   .call();
    });
  });
});
