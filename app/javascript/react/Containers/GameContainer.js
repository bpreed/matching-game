import React, {Component} from 'react';
import MovieSearchTile from '../components/MovieSearchTile'
import ActorPhotoTile from '../components/ActorPhotoTile'

class GameContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInProgress: false,
      movie: '',
      actors: [],
      actorPhotos: [],
      choices: {},
      score: null
    }
    this.handleSearch=this.handleSearch.bind(this)
    this.handleActorSelect=this.handleActorSelect.bind(this)
    this.handleSubmit=this.handleSubmit.bind(this)
    this.newGame=this.newGame.bind(this)
  }

  handleSearch(formPayload) {
    this.setState({
      searchInProgress: true
    })
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
      this.setState({ searchInProgress: false, movie: body.movie, actors: body.actors, actorPhotos: body.actor_photos, socre: null })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleActorSelect(event) {
    let selection = { [event.target.name]: event.target.value }
    let choices = this.state.choices
    choices[event.target.name] = event.target.value
    this.setState({ choices: choices, score: null })
  }

  handleSubmit(event) {
    event.preventDefault()
    let choices = this.state.choices;
    let score = 0
    this.state.actors.forEach((actor, index) => {
      if (choices[actor] == index) {
        score += 1
      }
    })
    this.setState({ score: score })
  }

  newGame(event) {
    event.preventDefault()
    this.setState({ searchInProgress: false, movie: '', actors: [], actorPhotos: [], choices: {}, score: null })
  }

  render () {
    let actorPhotoTiles
    let submitButton
    if (this.state.actors.length > 0) {
      submitButton = <button type="submit" id="score-button" onClick={this.handleSubmit} value="Submit">Score me!</button>
      actorPhotoTiles = this.state.actorPhotos.map((photo, index) => {
        return (
          <ActorPhotoTile
          key={index}
          index={index}
          photoUrl={photo}
          actors={this.state.actors}
          handleActorSelect={this.handleActorSelect}
          />
        )
      })
    }

    let scoreDiv
    if (this.state.score != null) {
      scoreDiv = <div className="score"><h2>SCORE: {this.state.score}</h2></div>
    }
    return (
      <div>
      <MovieSearchTile
        handleSearch={this.handleSearch}
        newGame={this.newGame}
        actors={this.state.actors}
      />
        <div>
        <div className="actor-tiles">
          {actorPhotoTiles}
        </div>
        {scoreDiv}
        <div className="score-div">
          {submitButton}
        </div>
        </div>
      </div>
    )
  }
}

export default GameContainer
