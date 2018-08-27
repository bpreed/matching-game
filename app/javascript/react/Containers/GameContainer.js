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
      score: null,
      errorMessage: null
    }
    this.handleSearch=this.handleSearch.bind(this)
    this.handleActorSelect=this.handleActorSelect.bind(this)
    this.handleSubmit=this.handleSubmit.bind(this)
    this.newGame=this.newGame.bind(this)
  }

  handleSearch(formPayload) {
    this.setState({
      searchInProgress: true,
      errorMessage: null,
      movie: '',
      actors: [],
      actorPhotos: [],
      choices: {},
      score: null
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
      if (body.errorMessage) {
        this.setState({ errorMessage: body.errorMessage })
      } else {
        this.setState({ searchInProgress: false, movie: body.movie, actors: body.actors, actorPhotos: body.actor_photos, socre: null })
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleActorSelect(event) {
    let choices = this.state.choices
    choices[event.currentTarget.id] = event.target.value
    this.setState({ choices: choices })
  }

  handleSubmit(event) {
    event.preventDefault()
    let score = 0
    let choices = this.state.choices
    this.state.actors.forEach((actor) => {
      if (choices[actor] == actor) {
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
    let scoreButton
    let actorPhotoDiv = null
    if (this.state.actors.length > 0) {
      scoreButton = <button type="submit" id="score-button" onClick={this.handleSubmit} value="Submit">
                      Score me!
                    </button>
      actorPhotoTiles = this.state.actorPhotos.map((photo, index) => {
        return (
          <ActorPhotoTile
            key={index}
            actor={this.state.actors[index]}
            photoUrl={photo}
            actors={this.state.actors}
            handleActorSelect={this.handleActorSelect}
          />
        )
      })
      actorPhotoDiv = <div className="actor-tiles">
                        {actorPhotoTiles}
                      </div>
    }

    let scoreDiv
    if (this.state.score != null) {
      scoreButton = <div></div>
      if (this.state.score == 1) {
        scoreDiv = <div className="score"><h2>{this.state.score} point!</h2></div>
      } else {
        scoreDiv = <div className="score"><h2>{this.state.score} points!</h2></div>
      }
    }

    let errorDiv
    if (this.state.errorMessage) {
      errorDiv = <div className="error-message">{this.state.errorMessage}</div>
    }
    return (
      <div>
        <MovieSearchTile
          handleSearch={this.handleSearch}
          newGame={this.newGame}
          actors={this.state.actors}
          searchInProgress={this.state.searchInProgress}
        />
        {errorDiv}
        {actorPhotoDiv}
          <div className="score-div">
            {scoreButton} {scoreDiv}
        </div>
        <div className="tmbd-attribution">This product uses the TMDb API but is not endorsed or certified by TMDb.</div>
      </div>
    )
  }
}

export default GameContainer
