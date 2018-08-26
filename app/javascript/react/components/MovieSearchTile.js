import React, {Component} from 'react';

class MovieSearchTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: '',
      searchInProgress: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleMultiSelect = this.handleMultiSelect.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  // Sets state based on non-multi-select field input
  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleLocationChange(event){
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  // Sets state based on multi-select input
  handleMultiSelect(optionsList){
    this.setState(optionsList)
  }

  // Invokes handleSearch function from EventsIndexContainer
  handleSubmit(event){
    event.preventDefault()
    this.setState({
      searchInProgress: true
    })
    let formPayload = {
      movie: this.state.movie
    }
    fetch('/api/v1/search/movies', {
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify(formPayload),
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json'}
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      debugger
      this.setState({ searchInProgress: false })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let inSearchIcon
    if (this.state.searchInProgress) {
      inSearchIcon = <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    } else {
      inSearchIcon = <div className="lds-space"></div>
    }

    return (
      <div className="large-12 medium-12 small-12 search-tile">
        <form id="search-form" className="search-form" onSubmit={this.handleSubmit}>
          <h3 id="search-title">
            Search Criteria
          </h3>
          <span className="row search-top-row">
            <div className="name-search large-3 medium-3 small-12">
              Movie Name:
              <input className="search-input" type='text' name='movie' value={this.state.movie} onChange={this.handleChange} />
            </div>
            <button type="submit" id="search-button" onSubmit={this.handleSubmit} value="Submit">Search</button>
            {inSearchIcon}
          </span>
        </form>
      </div>
    )
  }
}
export default MovieSearchTile
