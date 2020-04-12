/*
 * @Description:
 * @Author: myweico
 * @LastEditors: myweico
 * @Date: 2020-03-29 16:51:15
 * @LastEditTime: 2020-04-12 09:35:48
 */

import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default class BaseItem extends Component {
  static propTypes = {
    peojectModel: PropTypes.object,
    onSelect: PropTypes.func,
    onFavorite: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      isFavorite: this.props.projectModel.isFavorite,
    };
  }

  setFavoriteState(isFavorite) {
    this.props.projectModel.isFavorite = isFavorite;
    this.setState({
      isFavorite: isFavorite,
    });
  }

  onPressFavorite() {
    this.setFavoriteState(!this.state.isFavorite);
    this.props.onFavorite(this.props.projectModel.item, !this.state.isFavorite);
  }

  getFavoriteIcon() {
    return (
      <TouchableOpacity
        style={{padding: 6}}
        underlayColor="transparent"
        onPress={() => this.onPressFavorite()}>
        <MaterialIcons
          name={this.state.isFavorite ? 'favorite' : 'favorite-border'}
          size={24}
          style={{color: '#f66'}}
        />
      </TouchableOpacity>
    );
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const isFavorite = nextProps.projectModel.isFavorite;
    if (prevState.isFavorite !== isFavorite) {
      return {
        ...prevState,
        isFavorite,
      };
    }
    return null;
  }
}
