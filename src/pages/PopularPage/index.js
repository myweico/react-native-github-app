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
import navigationUtil from '../../utils/navigationUtil';
import FavoriteDao from '../../dao/FavoriteDao';
import Favorite from '../../var/favorite';
import EventBus from 'react-native-event-bus';
import EventTypes from '../../var/event';

const URL = `https://api.github.com/search/repositories?q=`;
const QUERY_STR = '&sort=stars';
const THEME_COLOR = 'red';
const PAGE_SIZE = 10;
const favoriteDao = new FavoriteDao(Favorite.popular);

class PopularTab extends Component {
  constructor(props) {
    super(props);
    const {tabBarLabel} = this.props;
    this.storeName = tabBarLabel;
    this.toastRef = createRef();
    this.canLoadMore = true;
    this.favoriteChange = false;
  }

  componentDidMount() {
    this.loadData();
    EventBus.getInstance().addListener(
      EventTypes.favoritePopularChange,
      (this.favoriteListener = () => {
        this.favoriteChange = true;
      }),
    );
    EventBus.getInstance().addListener(
      EventTypes.bottomTabChange,
      (this.barListener = ({from, to, action}) => {
        if (to.index === 0 && this.favoriteChange === true) {
          // 当热门的收藏变化时, 并且切换到热门标签时, 重新加载数据
          this.loadData();
          this.favoriteChange = false;
        }
      }),
    );
  }

  componentWillUnmount() {
    EventBus.getInstance().removeListener(EventTypes.bottomTabChange);
    EventBus.getInstance().removeListener(EventTypes.favoritePopularChange);
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
        favoriteDao,
        () => {
          this.toastRef.show('没有更多了');
        },
      );
    } else {
      onLoadPopularData(this.storeName, url, PAGE_SIZE, favoriteDao);
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

  toDetailPage(params) {
    navigationUtil.navigate('DetailPage', params);
  }

  renderItem(data) {
    const item = data.item;
    return (
      <PopularItem
        projectModel={item}
        onSelect={itemRef => {
          this.toDetailPage({
            projectModel: (item && item.item) || {},
            isFavorite: item.isFavorite,
            handleSelect: (item, isFavorite) => {
              if (isFavorite) {
                favoriteDao.saveFavoriteItem(
                  String(item.id),
                  JSON.stringify(item),
                );
              } else {
                favoriteDao.removeFavoriteItem(String(item.id));
              }
              // 更新当前的按钮收藏状态
              itemRef.setFavoriteState(isFavorite);
            },
            type: Favorite.popular,
          });
        }}
        onFavorite={(item, isFavorite) => {
          if (isFavorite) {
            favoriteDao.saveFavoriteItem(String(item.id), JSON.stringify(item));
          } else {
            favoriteDao.removeFavoriteItem(String(item.id));
          }
        }}
      />
    );
  }

  genIndicator() {
    return this._store().hideLoadingMore ? null : (
      <View style={styles.indicatorContainer}>
        <ActivityIndicator style={styles.indicator} />
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
          keyExtractor={(item, index) => {
            return String(index);
          }}
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
    const navigationBar = <NavigationBar title="最热" />;
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
  onLoadPopularData: (storeName, url, pageSize, favoriteDao) =>
    dispatch(onLoadPopularData(storeName, url, pageSize, favoriteDao)),
  onLoadMorePopular: (storeName, url, pageSize, items, favoriteDao, callback) =>
    dispatch(
      onLoadMorePopular(storeName, url, pageSize, items, favoriteDao, callback),
    ),
});

const PopularTabPage = connect(
  mapStateToProps,
  mapActionsToProps,
)(PopularTab);

export default PopularPage;
