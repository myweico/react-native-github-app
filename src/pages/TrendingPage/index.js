import React, {Component} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {onThemeChange} from '../../store/actions';
class TrendingPage extends Component {
  render() {
    const {navigation} = this.props;
    const {setParams} = navigation;
    return (
      <View style={styles.container}>
        <Text>趋势页</Text>
        <Button
          title="改变主题"
          onPress={() => {
            this.props.onThemeChange('yellow');
          }}></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapActionsToProps = dispatch => ({
  onThemeChange: theme => dispatch(onThemeChange(theme)),
});

export default connect(null, mapActionsToProps)(TrendingPage);
