import React, { Component } from 'react'
import GameContainer from '../Containers/GameContainer.js'

class App extends Component {

  render() {
    $(function(){
    var flashDurationInSeconds = 5;
    var flashContainerId = 'flash-messages';

    function removeFlashMessages() {
      if ($('#' + flashContainerId)[0].innerText != "") {
        $('#' + flashContainerId).remove();
      }
    }

    setTimeout(removeFlashMessages, flashDurationInSeconds * 1000);
    })

    return (
      <div>
        <GameContainer/>
      </div>
    )
  }
}

export default App
