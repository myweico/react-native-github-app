/*
 * @Description:
 * @Author: myweico
 * @LastEditors: myweico
 * @Date: 2020-03-29 16:51:15
 * @LastEditTime: 2020-03-29 17:50:19
 */

import React, {Component} from 'react';
import {PropsTypes} from 'prop-types';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default class BaseItem extends Component {
  static propTypes = {
    peojectModel: PropsTypes.object,
    onSelect: PropTypes.func,
    onFavorite: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      isFavorite: this.props.projectModel.isFavorite,
    };
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
          name="favorite-border"
          size={24}
          style={{color: '#333'}}></MaterialIcons>
      </TouchableOpacity>
    );
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const isFavorite = nextProps.peojectModel.isFavorite;
    if (prevState.isFavorite !== isFavorite) {
      return {
        ...prevState,
        isFavorite,
      };
    }
    return null;
  }
}
