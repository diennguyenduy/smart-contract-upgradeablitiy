import React, { Component } from 'react';
import Web3 from './get-web3';
import './App.css';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from './config';
import { Button } from 'react-bootstrap';

class App extends Component {
  componentWillMount() {
    this.loadBlockchainData();
  }

  async loadBlockchainData() {
    const accounts = await Web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    console.log(accounts);
    const contract = new Web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
    console.log(contract);
    this.setState({ contract });
    //    await contract.methods.upgradeTo('0x61A6ccB271AA9a8D812aBB84C2CD85FfA06D41C7');
    //  const counter = await contract.methods.getValue().call();
    //  this.setState({ counter });
  }

  constructor(props) {
    super(props);
    this.state = {
      account: '0x0',
      counter: 0
    };
  }

  render() {
    const { contract } = this.state;
    return (
      <div className='container'>
        <h1>Hello, World!</h1>
        <p>Your account: {this.state.account}</p>
        <p>Counter: {this.state.counter}</p>
        <Button onClick={() => contract.increaseByOne().call()} color='primary'>
          Increase
        </Button>
      </div>
    );
  }
}

export default App;
