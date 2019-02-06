import React, {Component} from 'react';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      target: props.vars.target,
      data: props.vars.data,
      text: props.vars.text,
    };
  }

  handleNewGame() {
    this.props.handleStartAgain();
  }

  render() {
    return(
      <div className="modal fade" id={this.state.target} tabIndex="-1" role="dialog" data-keyboard="false" data-backdrop="static" aria-labelledby="modalLabel" aria-hidden="true">
        <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="modal-title" id="lineModalLabel">Figure it out!</h3>
          </div>
          <div className="modal-body">
            {this.state.text}
          </div>
          <div className="modal-footer">
            <a href="#" id="play" className="play" data-dismiss="modal" data-text={this.state.data} onClick={this.handleNewGame.bind(this)}>
              <span>I</span> <span>a</span><span>m</span> <span>r</span><span>e</span><span>a</span><span>d</span><span>y</span>
            </a>
          </div>
        </div>
        </div>
      </div>
    );
  }
}
export default Modal;
