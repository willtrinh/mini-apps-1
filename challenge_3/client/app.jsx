class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      next: 0,
      name: String,
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
}


ReactDOM.render(<App />, document.getElementById('app'));