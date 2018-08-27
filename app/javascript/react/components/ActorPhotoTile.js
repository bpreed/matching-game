import React, {Component} from 'react';

class ActorPhotoTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      choices: {}
    }
    this.handleChange=this.handleChange.bind(this)
  }

  componentDidMount() {
    let select = document.getElementById(this.props.actors[this.props.index]);
    let actors = this.props.actors

    actors.forEach((actor, index) => {
      let opt = document.createElement('option');
      opt.innerHTML = actor;
      opt.value = index;
      select.appendChild(opt);
    });
  }

  handleChange(event){
    this.props.handleActorSelect(event)
  }

  render() {
    return (
      <div className="actor-div large-3 medium-5 small-10">
        <div className="photo-div">
          <img src={this.props.photoUrl} className="actor-photo"/>
        </div>
        <div>
          <form action="#" className="actor-select">
            <select name={this.props.actors[this.props.index]} id={this.props.actors[this.props.index]} onChange={this.handleChange}>
              <option>Who Am I?</option>
            </select>
          </form>
        </div>
      </div>
    )
  }
}

export default ActorPhotoTile
