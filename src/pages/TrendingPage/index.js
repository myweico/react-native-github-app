import React, {Component, createRef} from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
  DeviceInfo
} from 'react-native';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import SafeAreaView from 'react-native-safe-area-view';
import {createAppContainer} from 'react-navigation';
import {connect} from 'react-redux';
import TrendingItem from './components/TrendingItem';
import Toast from 'react-native-easy-toast';
import {
  onLoadTrendingData,
  onLoadMoreTrending,
} from '../../store/actions/trending';

const URL = `https://github.com/trending/`;
const QUERY_STR = '?since=daily';
const THEME_COLOR = 'red';
const PAGE_SIZE = 10;

class TrendingTab extends Component {
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

  loadData = ifLoadMore => {
    const {loadTrendingData, loadMoreTrending} = this.props;
    const url = this.genUrl(this.storeName);
    const store = this._store();
    if (ifLoadMore) {
      loadMoreTrending(
        this.storeName,
        store.pageIndex + 1,
        PAGE_SIZE,
        store.items,
        () => {
          this.toastRef.show('没有更多了');
        },
      );
    } else {
      loadTrendingData(this.storeName, url, PAGE_SIZE);
    }
  };

  _store() {
    const {trending} = this.props;
    let store = trending[this.storeName];
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
    return <TrendingItem item={item} onSelect={() => {}} />;
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
    const {trending} = this.props;
    let store = this._store();
    return (
      <View style={styles.container}>
        <FlatList
          data={store.projectModes}
          renderItem={data => this.renderItem(data)}
          keyExtractor={item => item.fullName}
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

class TrendingPage extends Component {
  static router;

  constructor(props) {
    super(props);
    this.tabs = ['C', 'C#', 'PHP', 'JavaScript'];
  }

  genTabBar() {
    const routesConfig = {};
    this.tabs.forEach((part, index) => {
      routesConfig[`tab${index}`] = {
        screen: props => <TrendingTabPage {...props} tabBarLabel={part} />,
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
            marginTop: 30
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
    const MatTopNav = this.genTabBar();
    return <MatTopNav />;
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
  trending: state.trending,
});

const mapActionsToProps = dispatch => ({
  loadTrendingData: (storeName, url, pageSize) =>
    dispatch(onLoadTrendingData(storeName, url, pageSize)),
  loadMoreTrending: (storeName, url, pageSize, items, callback) =>
    dispatch(onLoadMoreTrending(storeName, url, pageSize, items, callback)),
});

const TrendingTabPage = connect(
  mapStateToProps,
  mapActionsToProps,
)(TrendingTab);

export default TrendingPage;
