import React, {Component} from 'react';
import {Image, Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default class PopularItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {item} = this.props;
    if (!item || !item.owner) return null;
    return (
      <TouchableOpacity onPress={this.props.onSelect}>
        <View style={styles.cell_container}>
          <Text style={styles.title}>{item.full_name}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <View style={styles.row}>
            <View style={styles.row}>
              <Text>Author:</Text>
              <Image
                style={{height: 22, width: 22, marginLeft: 5}}
                source={{uri: item.owner.avatar_url}}></Image>
            </View>
            <View style={styles.row}>
              <Text>{item.stargazers_count}</Text>
              <AntDesign
                name="star"
                size={24}
                style={{color: '#ffcb6b'}}></AntDesign>
            </View>
            <TouchableOpacity onPress={() => {}}>
              <MaterialIcons
                name="favorite-border"
                size={24}
                style={{color: '#333'}}></MaterialIcons>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  cell_container: {
    backgroundColor: 'white',
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
    marginVertical: 3,
    borderColor: '#ddd',
    borderWidth: 0.5,
    borderRadius: 2,
    shadowColor: 'gray',
    shadowOffset: {width: 0.5, height: 0.5},
    shadowOpacity: 0.4,
    shadowRadius: 1,
    elevation: 2, // 安卓阴影
  },
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    marginBottom: 2,
    color: '#212121',
  },
  description: {
    fontSize: 14,
    marginBottom: 2,
    color: '#757575',
  },
});
