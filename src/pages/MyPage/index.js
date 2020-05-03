import React, {Component} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import NavigationBar from '../../components/NavigationBar';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {MORE_MENU} from '../../common/MORE_MENU';
import GlobalStyles from '../../var/GlobalStyles';
import ViewUtil from '../../utils/ViewUtil';

const THEME_COLOR = '#678';
export default class Page3 extends Component {
  getLeftButton(callback) {
    return (
      <TouchableOpacity onPress={callback} style={{paddingLeft: 16}}>
        <Ionicons name={'ios-arrow-back'} size={26} style={{color: '#fff'}} />
      </TouchableOpacity>
    );
  }

  getRightButton(callback) {
    return (
      <TouchableOpacity onPress={callback} style={{paddingRight: 16}}>
        <Feather name={'search'} size={24} style={{color: '#fff'}} />
      </TouchableOpacity>
    );
  }

  onClick = menu => {};

  getItem(menu) {
    return ViewUtil.getMunuItem(
      () => {
        this.onClick(menu);
      },
      menu,
      THEME_COLOR,
    );
  }

  render() {
    return (
      <>
        <NavigationBar title={'个人信息'} rightButton={this.getRightButton()} />
        <View style={GlobalStyles.rootContainer}>
          <ScrollView>
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                this.onClick(MORE_MENU.About);
              }}>
              <View style={styles.aboutLeft}>
                <Ionicons
                  name={MORE_MENU.About.icon}
                  size={40}
                  style={{
                    color: THEME_COLOR,
                    marginRight: 10,
                  }}
                />
                <Text>Github Popular</Text>
              </View>
              <Ionicons
                name={'ios-arrow-forward'}
                size={16}
                style={{
                  marginRight: 10,
                  alignSelf: 'center',
                  color: THEME_COLOR,
                }}
              />
            </TouchableOpacity>
            <View style={GlobalStyles.line} />
            {this.getItem(MORE_MENU.Tutorial)}
            {/*趋势管理*/}
            <Text style={styles.groupTitle}>趋势管理</Text>
            {/*自定义语言*/}
            {this.getItem(MORE_MENU.Custom_Language)}
            {/*语言排序*/}
            <View style={GlobalStyles.line} />
            {this.getItem(MORE_MENU.Sort_Language)}

            {/*最热管理*/}
            <Text style={styles.groupTitle}>最热管理</Text>
            {/*自定义标签*/}
            {this.getItem(MORE_MENU.Custom_Key)}
            {/*标签排序*/}
            <View style={GlobalStyles.line} />
            {this.getItem(MORE_MENU.Sort_Key)}
            {/*标签移除*/}
            <View style={GlobalStyles.line} />
            {this.getItem(MORE_MENU.Remove_Key)}

            {/*设置*/}
            <Text style={styles.groupTitle}>设置</Text>
            {/*自定义主题*/}
            {this.getItem(MORE_MENU.Custom_Theme)}
            <View style={GlobalStyles.line} />
            {/*关于作者*/}
            {this.getItem(MORE_MENU.About_Author)}
            <View style={GlobalStyles.line} />
            {/*反馈*/}
            {this.getItem(MORE_MENU.Feedback)}
            <View style={GlobalStyles.line} />
            {/* code-push */}
            {this.getItem(MORE_MENU.CodePush)}
          </ScrollView>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  aboutLeft: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 10,
    height: 90,
  },
  groupTitle: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 5,
    fontSize: 12,
    color: 'gray',
  },
});
