import React, {Component, createRef} from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import SafeAreaView from 'react-native-safe-area-view';
import {createAppContainer} from 'react-navigation';
import NavigationUtil from '../../utils/navigationUtil';
import {connect} from 'react-redux';
import {onLoadPopularData, onLoadMorePopular} from '../../store/actions';
import PopularItem from './components/PopularItem';
import Toast from 'react-native-easy-toast';
import NavigationBar from '../../components/NavigationBar';

const URL = `https://api.github.com/search/repositories?q=`;
const QUERY_STR = '&sort=stars';
const THEME_COLOR = 'red';
const PAGE_SIZE = 10;

class PopularTab extends Component {
  constructor(props) {
    super(props);
    const {tabBarLabel} = this.props;
    this.storeName = tabBarLabel;
    this.toastRef = createRef();
    this.canLoadMore = true;
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = loadMore => {
    const {onLoadPopularData, onLoadMorePopular} = this.props;
    const url = this.genUrl(this.storeName);
    const store = this._store();
    console.log('loadMore', loadMore);
    if (loadMore) {
      onLoadMorePopular(
        this.storeName,
        store.pageIndex + 1,
        PAGE_SIZE,
        store.items,
        () => {
          this.toastRef.show('没有更多了');
        },
      );
    } else {
      onLoadPopularData(this.storeName, url, PAGE_SIZE);
    }
  };

  _store() {
    const {popular} = this.props;
    let store = popular[this.storeName];
    if (!store) {
      store = {
        items: [],
        isLoading: false,
        projectModes: [],
        hideLoadingMore: true,
        pageIndex: 0,
      };
    }
    return store;
  }

  genUrl(key) {
    return URL + key + QUERY_STR;
  }

  renderItem(data) {
    const item = data.item;
    return <PopularItem item={item} onSelect={() => {}} />;
  }

  genIndicator() {
    return this._store().hideLoadingMore ? null : (
      <View style={styles.indicatorContainer}>
        <ActivityIndicator style={styles.indicator}></ActivityIndicator>
        <Text>正在加载更多...</Text>
      </View>
    );
  }

  render() {
    const {popular} = this.props;
    let store = this._store();
    return (
      <View style={styles.container}>
        <FlatList
          data={store.projectModes}
          renderItem={data => this.renderItem(data)}
          keyExtractor={item => '' + item.id}
          refreshControl={
            <RefreshControl
              title="Loading..."
              titleColor={THEME_COLOR}
              color={THEME_COLOR}
              refreshing={store.isLoading}
              onRefresh={this.loadData}
              tintColor={THEME_COLOR}
            />
          }
          ListFooterComponent={() => this.genIndicator()}
          onEndReached={() => {
            setTimeout(() => {
              console.log('onEndReached', this.canLoadMore);
              if (!this.canLoadMore) return;
              this.canLoadMore = false;
              console.log('---onEndReached---');
              this.loadData(true);
            }, 500);
          }}
          onMomentumScrollBegin={() => {
            this.canLoadMore = true;
            console.log('onMomentumScrollBegin', this.canLoadMore);
            console.log('---onMomentumScrollBegin--');
          }}
          // onTouchStart={() => {
          //   this.reachable = true;
          // }}
          onEndReachedThreshold={0.5}
        />
        <Toast ref={ref => (this.toastRef = ref)} position="center" />
      </View>
    );
  }
}

class PopularPage extends Component {
  static router;

  constructor(props) {
    super(props);
    this.tabs = [
      'Android',
      'IOS',
      'Java',
      'PHP',
      'Javascript',
      'Python',
      'C',
      'C++',
      'C#',
    ];
  }

  genTabBar() {
    const routesConfig = {};
    this.tabs.forEach((part, index) => {
      routesConfig[`tab${index}`] = {
        screen: props => <PopularTabPage {...props} tabBarLabel={part} />,
        navigationOptions: {
          tabBarLabel: part,
        },
      };
    });
    return createAppContainer(
      createMaterialTopTabNavigator(routesConfig, {
        tabBarOptions: {
          scrollEnabled: true,
          tabStyle: {
            minWidth: 50,
          },
          upperCaseLabel: false,
          labelStyle: {
            fontSize: 14,
            marginVertical: 6,
          },
          indicatorStyle: {
            height: 2,
            backgroundColor: '#fff',
          },
        },
      }),
    );
  }

  render() {
    const navigationBar = <NavigationBar title="最热"></NavigationBar>;
    const MatTopNav = this.genTabBar();
    return (
      // <SafeAreaView style={{flex: 1}}>
      <>
        {navigationBar}
        <MatTopNav />
      </>
      // </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorContainer: {
    alignItems: 'center',
  },
  indicator: {
    color: 'red',
    margin: 10,
  },
});

const mapStateToProps = state => ({
  popular: state.popular,
});

const mapActionsToProps = dispatch => ({
  onLoadPopularData: (storeName, url, pageSize) =>
    dispatch(onLoadPopularData(storeName, url, pageSize)),
  onLoadMorePopular: (storeName, url, pageSize, items, callback) =>
    dispatch(onLoadMorePopular(storeName, url, pageSize, items, callback)),
});

const PopularTabPage = connect(mapStateToProps, mapActionsToProps)(PopularTab);

export default PopularPage;
