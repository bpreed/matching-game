import React, {Component} from 'react';

class MovieSearchTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: '',
      searchInProgress: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.newGame = this.newGame.bind(this)
  }

  // Sets state based on non-multi-select field input
  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  // Invokes handleSearch function from EventsIndexContainer
  handleSubmit(event){
    event.preventDefault()
    let formPayload = {
      movie: this.state.movie
    }
    this.props.handleSearch(formPayload)
  }

  newGame(event){
    this.props.newGame(event)
    this.setState({ movie: '' })
  }

  render() {
    let inSearchIcon
    if (this.state.searchInProgress) {
      inSearchIcon = <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    } else {
      inSearchIcon = <div className="lds-space"></div>
    }

    let searchButton
    if (this.props.actors.length == 0) {
      searchButton = <button type="submit" id="search-button" onSubmit={this.handleSubmit} value="Submit">Search</button>
    } else {
      searchButton = <a id="new-game-button" className="button" onClick={this.newGame}>New Game</a>
    }

    return (
      <div className="large-12 medium-12 small-12 search-tile">
        <form id="search-form" className="search-form large-4 medium-4 small-10" onSubmit={this.handleSubmit}>
          <h3 id="search-title">
            Search Criteria
          </h3>
          <span className="row search-top-row">
            <div className="name-search large-12 medium-12 small-12">
              Movie Name:
              <input className="search-input" type='text' name='movie' value={this.state.movie} onChange={this.handleChange} />
            </div>
            {searchButton}
            {inSearchIcon}
          </span>
        </form>
      </div>
    )
  }
}
export default MovieSearchTile
