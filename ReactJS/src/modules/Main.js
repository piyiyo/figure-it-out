import React, {Component} from 'react';
import Frame from './Frame/Controller/Frame';

class Main extends Component {
  constructor() {
    super();
    this.state = {
      difficulty: 'beginner'
    };
  }

  setDifficulty(event) {
    this.state.difficulty = event.target.id.replace('diff_', '');
    this.setState(this.state);
  }

  render() {
    return (
        <div>
          <div className="dropdown">
          <div className="exp btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span className="glyphicon glyphicon-th" aria-hidden="true"></span></div>
            <ul className="dropdown-menu">
              <li className="red">OPTIONS</li>
          	<li className="divider"></li>
          	<li className="dropdown dropdown-submenu"><a href="#" className="dropdown-toggle green" data-toggle="dropdown">Answers</a>
          		<ul className="dropdown-menu">
          			<li><a href="#" className="grey">6</a></li>
          			<li><a href="#" className="grey">12</a></li>
          		</ul>
          	</li>
          	<li className="dropdown dropdown-submenu"><a href="#" className="dropdown-toggle green" data-toggle="dropdown">Difficulty</a>
          		<ul className="dropdown-menu">
          			<li><a href="#" className="grey" id="diff_beginner" onClick={this.setDifficulty.bind(this)}>Beginner</a></li>
          			<li><a href="#" className="grey" id="diff_skilled" onClick={this.setDifficulty.bind(this)}>Skilled</a></li>
                <li><a href="#" className="grey" id="diff_epic" onClick={this.setDifficulty.bind(this)}>Epic</a></li>
                <li><a href="#" className="grey" id="diff_legendary" onClick={this.setDifficulty.bind(this)}>Legendary</a></li>
                <li><a href="#" className="grey" id="diff_insane" onClick={this.setDifficulty.bind(this)}>Insane</a></li>
          		</ul>
          	</li>
            </ul>
          </div>
          <div className="score">Score: 0</div>
          <Frame difficulty={this.state.difficulty} />
        </div>
    );
  }
}
export default Main;
