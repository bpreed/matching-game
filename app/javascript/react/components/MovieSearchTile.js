import React, {Component} from 'react';

class MovieSearchTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.newGame = this.newGame.bind(this)
  }

  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event){
    event.preventDefault()
    let formPayload = { movie: this.state.movie }
    this.props.handleSearch(formPayload)
  }

  newGame(event){
    this.props.newGame(event)
    this.setState({ movie: '' })
  }

  render() {
    let inSearchIcon
    if (this.props.searchInProgress) {
      inSearchIcon = <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    } else {
      inSearchIcon = <div className="lds-space"></div>
    }

    let searchButton
    if (this.props.actors.length == 0) {
      searchButton = <button type="submit" id="search-button" onSubmit={this.handleSubmit} value="Submit">
                      Search
                    </button>
    } else {
      searchButton = <a id="new-game-button" className="button" onClick={this.newGame}>
                      New Game
                    </a>
    }

    return (
      <div className="large-12 medium-12 small-12 search-tile">
        <form id="search-form" className="search-form large-4 medium-4 small-10" onSubmit={this.handleSubmit}>
          <h2 id="search-title">
            Actor Name Game
          </h2>
          <p>Enter a movie and match the actors to their pictures</p>
          <span className="row search-top-row">
            <div className="name-search large-12 medium-12 small-12">
              Movie Name:
              <input className="search-input" type='text' name='movie' value={this.state.movie} onChange={this.handleChange} />
            </div>
            <span className="search-button-area row">
              {searchButton}
              {inSearchIcon}
            </span>
          </span>
        </form>
      </div>
    )
  }
}
export default MovieSearchTile
