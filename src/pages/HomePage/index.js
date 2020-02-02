import React, {Component} from 'react';
import DynamicTabNav from '../../navigator/DynamicTavNavigator';

export default class extends Component {

  render() {
    return <DynamicTabNav navigation={this.props.navigation}></DynamicTabNav>;
  }
}
