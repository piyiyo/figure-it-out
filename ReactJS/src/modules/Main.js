import React, {Component} from 'react';
import Frame from './Frame/Controller/Frame';

class Main extends Component {
  constructor() {
    super();
    this.state = {

    };
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
          	<li className="divider"></li>
          	<li><a href="#" id="pause" className="green">Pause (unscored)</a></li>
          	<li className="divider"></li>
          	<li><a href="#" id="resume" className="green">Resume</a></li>
          	<li className="divider"></li>
          	<li className="dropdown dropdown-submenu"><a href="#" className="dropdown-toggle green" data-toggle="dropdown">Helper</a>
          		<ul className="dropdown-menu">
          			<li><a href="#" className="grey">On</a></li>
          			<li><a href="#" className="grey">Off</a></li>
          		</ul>
          	</li>
            </ul>
          </div>
          <div className="score">Score: 0</div>
          <Frame />
        </div>
    );
  }
}
export default Main;
