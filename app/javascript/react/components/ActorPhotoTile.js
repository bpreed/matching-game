import React, {Component} from 'react';
import { shuffle } from '../modules/shuffle.js'

class ActorPhotoTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionsItems: {}
    }
    this.handleChange=this.handleChange.bind(this)
  }

  handleChange(event){
    this.props.handleActorSelect(event)
  }

  componentDidMount() {
    let optionItems
    let actors = this.props.actors.slice(0)
    let shuffledActors = shuffle(actors)
    this.setState({ optionItems: shuffledActors.map((actor) =>
      <option key={actor} value={actor}>{actor}</option>
    ) });
  }

  render() {
    return (
      <div className="actor-div large-3 medium-5 small-10">
        <div className="photo-div">
          <img src={this.props.photoUrl} className="actor-photo"/>
        </div>
        <div>
          <form action="#" className="actor-select">
            <select name={this.props.actor} id={this.props.actor} onChange={this.handleChange}>
              <option>Who Am I?</option>
              {this.state.optionItems}
            </select>
          </form>
        </div>
      </div>
    )
  }
}

export default ActorPhotoTile
