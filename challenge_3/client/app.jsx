class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      next: 0,
      name: '',
      email: '',
      password: '',
      line1: '',
      line2: '',
      city: '',
      state: '',
      zipcode: '',
      phone: '',
      ccNumber: '',
      expMonth: '',
      expYear: '',
      cvv: ''
    }
    this.handleCheckout = this.handleCheckout.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handleConfirmation = this.handleConfirmation.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
  }

  handleCheckout(e) {
    e.preventDefault();
    this.setState({
      next: 1
    })
  }
  handleNextClick(e) {
    e.preventDefault();
    this.setState({
      next: this.state.next += 1;
    })
  }
  handleConfirmation(e) {
    e.preventDefault();
    this.setState({
      next: 0
    })
    axios.post('/', this.state)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })
  }
  handleFormChange(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  render() {
    return (
      <div>
        <button onclick={this.handleCheckout}>Checkout</button>
        <button onclick={this.handleNextClick}>Next</button>
        {this.state.next === 1 && <F1 handleFormChange = {this.handleFormChange}/>}
        {this.state.next === 2 && <F2 handleFormChange = {this.handleFormChange}/>}
        {this.state.next === 3 && <F3 handleFormChange = {this.handleFormChange}/>}
        {this.state.next === 4 && <Confirmation handleConfirmation = {this.handleConfirmation}/>}
      </div>
    )
  }
}

class F1 extends React.Component {
  render() {
    return(
      <div>
        <form>
          <input type="text" name="name" placeholder="enter your name" onChange={this.props.handleFormChange}/>
          <input type="email" name="email" placeholder="enter your email" onChange={this.props.handleFormChange}/>
          <input type="password" name="password" placeholder="enter your password" onChange={this.props.handleFormChange}/>
        </form>
      </div>
    )
  }
}

class F2 extends React.Component {
  render() {
    return(
      <div>
        <form>
          <input type="text" name="line1" placeholder="enter your address 1" onChange={this.props.handleFormChange}/>
          <input type="text" name="line2" placeholder="enter your address 2" onChange={this.props.handleFormChange}/>
          <input type="text" name="city" placeholder="enter your city" onChange={this.props.handleFormChange}/>
          <input type="text" name="state" placeholder="enter your state" onChange={this.props.handleFormChange}/>
          <input type="text" name="zipcode" placeholder="enter your zip code" onChange={this.props.handleFormChange}/>
          <input type="text" name="phone" placeholder="enter your phone number" onChange={this.props.handleFormChange}/>
        </form>
      </div>
    )
  }
}

class F3 extends React.Component {
  render() {
    return(
      <div>
        <form>
          <input type="text" name="ccNumber" placeholder="enter your Credit Card Number" onChange={this.props.handleFormChange}/>
          <input type="text" name="expMonth" placeholder="Credit Card Expire Month" onChange={this.props.handleFormChange}/>
          <input type="text" name="expYear" placeholder="Credit Card Expire Year" onChange={this.props.handleFormChange}/>
          <input type="text" name="cvv" placeholder="Credit Card CVV" onChange={this.props.handleFormChange}/>
        </form>
      </div>
    )
  }
}

class Confirmation extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div>
        <button onClick={this.props.handleConfirmation}>Purchase</button>
      </div>
    )
  }
}


ReactDOM.render(<App />, document.getElementById('app'));