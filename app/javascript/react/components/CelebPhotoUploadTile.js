import React, {Component} from 'react';
const Clarifai = require('clarifai');
const app = new Clarifai.App({apiKey: '6544f3fd0064457dbffd9531f9f026d1'});

class CelebPhotoUploadTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photoUrl: '',
      lookalike: null,
      errorMessage: false
    }
    this.handleChange=this.handleChange.bind(this)
    this.handleSubmit=this.handleSubmit.bind(this)
    this.changeState=this.changeState.bind(this)
    this.resetSearch=this.resetSearch.bind(this)
  }

  handleChange(event){
    this.setState({
      photoUrl: event.target.value,
      errorMessage: false
    })
  }

  resetSearch(event){
    this.setState({
      photoUrl: '',
      lookalike: null,
      errorMessage: false
    })
  }

  changeState(update){
    this.setState( update )
  }

  handleSubmit(event){
    event.preventDefault()
    let formPayload = this.state.photoUrl
    let stateSet
    app.models.predict("e466caa0619f444ab97497640cefc4dc", `${formPayload}`)
    .then(response => {
      if (response["outputs"][0]["data"]["regions"] != undefined ) {
        stateSet = { lookalike: response["outputs"][0]["data"]["regions"][0]["data"]["face"]["identity"]["concepts"][0]["name"] }
        this.changeState( stateSet )
      } else {
        stateSet = { errorMessage: true }
        this.changeState( stateSet )
      }
    });
  }

  render() {
    let lookalikeResult
    let searchDiv
    if (this.state.lookalike) {
      lookalikeResult = <div className="lookalike-result large-4 medium-4 small-10">
                          <img src={this.state.photoUrl} id="uploaded-photo"/>
                          <h3>Your celebrity lookalike is:</h3>
                          <h3 className="capitalize celebrity">{this.state.lookalike}!</h3>
                          <a className="button" id="search-again" onClick={this.resetSearch}>Search again</a>
                        </div>
    } else if (this.state.errorMessage) {
      lookalikeResult = <div className="lookalike-result large-4 medium-4 small-10">
                          <h4>There was an error in your search. Please check your image and try again.</h4>
                          <a className="button" id="search-again" onClick={this.resetSearch}>Search again</a>
                        </div>
    } else {
      searchDiv = <form id="celeb-search-form" className="celeb-search-form large-4 medium-4 small-10" onSubmit={this.handleSubmit}>
                  <span className="row search-top-row">
                    <div className="photo-search large-12 medium-12 small-12">
                    <div id="lookalike-header">
                      <h2>Which celebrity do you look like?</h2>
                    </div>
                      Paste an image URL here to find out:
                      <input className="search-input" type='text' name='photo' value={this.state.photUrl} onChange={this.handleChange} />
                    </div>
                    <button type="submit" id="search-button" onSubmit={this.handleSubmit} value="Submit">Search</button>
                  </span>
                </form>
    }
    return (
      <div className="lookalike-div large-12 medium-12 small-12">
        {lookalikeResult}
        {searchDiv}
      </div>
    )
  }
}

export default CelebPhotoUploadTile
