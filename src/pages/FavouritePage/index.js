import React, {Component, createRef} from 'react';
import {FlatList, View, StyleSheet, RefreshControl} from 'react-native';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import NavigationUtil from '../../utils/navigationUtil';
import {connect} from 'react-redux';
import {onLoadFavoriteData} from '../../store/actions';
import PopularItem from '../PopularPage/components/PopularItem';
import TrendingItem from '../TrendingPage/components/TrendingItem';
import Toast from 'react-native-easy-toast';
import NavigationBar from '../../components/NavigationBar';
import navigationUtil from '../../utils/navigationUtil';
import FavoriteDao from '../../dao/FavoriteDao';
import Favorite from '../../var/favorite';
import EventBus from 'react-native-event-bus';
import EventTypes from '../../var/event';

const THEME_COLOR = 'red';
const favoritePopularDao = new FavoriteDao(Favorite.popular);
const favoriteTrendingDao = new FavoriteDao(Favorite.trending);

class FavoriteTab extends Component {
  constructor(props) {
    super(props);
    const {tabBarLabel} = this.props;
    this.storeName = tabBarLabel;
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    const {onLoadFavoriteData} = this.props;
    let favoriteDao;
    switch (this.storeName) {
      case 'popular':
        favoriteDao = favoritePopularDao;
        break;
      case 'trending':
        favoriteDao = favoriteTrendingDao;
        break;
      default:
        break;
    }
    onLoadFavoriteData(this.storeName, favoriteDao);
  };

  _store() {
    const {favorite} = this.props;
    let store = favorite[this.storeName];
    if (!store) {
      store = {
        isLoading: false,
        projectModel: [],
      };
    }
    return store;
  }

  toDetailPage(params) {
    navigationUtil.navigate('DetailPage', params);
  }

  renderItem(data) {
    const item = data.item;
    switch (this.storeName) {
      case 'popular':
        return (
          <PopularItem
            projectModel={item}
            onSelect={itemRef => {
              this.toDetailPage({
                projectModel: (item && item.item) || {},
                isFavorite: item.isFavorite,
                handleSelect: (item, isFavorite) => {
                  if (isFavorite) {
                    favoritePopularDao.saveFavoriteItem(
                      String(item.id),
                      JSON.stringify(item),
                    );
                  } else {
                    favoritePopularDao.removeFavoriteItem(String(item.id));
                  }
                  // 更新当前的按钮收藏状态
                  itemRef.setFavoriteState(isFavorite);
                },
                type: Favorite.popular,
              });
            }}
            onFavorite={(item, isFavorite) => {
              if (isFavorite) {
                favoritePopularDao.saveFavoriteItem(
                  String(item.id),
                  JSON.stringify(item),
                );
              } else {
                favoritePopularDao.removeFavoriteItem(String(item.id));
              }
              EventBus.getInstance().fireEvent(
                EventTypes.favoritePopularChange,
              );
            }}
          />
        );

      case 'trending':
        return (
          <TrendingItem
            projectModel={item}
            onFavorite={(item, isFavorite) => {
              if (isFavorite) {
                favoriteTrendingDao.saveFavoriteItem(
                  item.fullName,
                  JSON.stringify(item),
                );
              } else {
                favoriteTrendingDao.removeFavoriteItem(item.fullName);
              }
              EventBus.getInstance().fireEvent(
                EventTypes.favoriteTrendingChange,
              );
            }}
            onSelect={itemRef => {
              this.toDetailPage({
                projectModel: (item && item.item) || {},
                isFavorite: item.isFavorite,
                handleSelect: (item, isFavorite) => {
                  if (isFavorite) {
                    favoriteTrendingDao.saveFavoriteItem(
                      item.fullName,
                      JSON.stringify(item),
                    );
                  } else {
                    favoriteTrendingDao.removeFavoriteItem(item.fullName);
                  }
                  itemRef.setFavoriteState(isFavorite);
                },
              });
            }}
          />
        );

      default:
        return null;
    }
  }

  componentDidMount() {
    // 当切换到收藏页面的时候就重新获取数据
    EventBus.getInstance().addListener(
      EventTypes.bottomTabChange,
      (this.listener = ({to, from, action}) => {
        if (to.index === 2) {
          this.loadData();
        }
      }),
    );
  }

  componentWillUnmount() {
    EventBus.getInstance().removeListener(this.listener);
  }

  render() {
    let store = this._store();
    return (
      <View style={styles.container}>
        <FlatList
          data={store.projectModel}
          renderItem={data => this.renderItem(data)}
          keyExtractor={(item, index) => {
            return '' + (item.item.fullName || item.item.id);
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
        />
        <Toast ref={ref => (this.toastRef = ref)} position="center" />
      </View>
    );
  }
}

class FavoritePage extends Component {
  static router;

  constructor(props) {
    super(props);
    this.tabs = ['popular', 'trending'];
    this.tabsMap = {
      popular: {
        tabBarLabel: '最热',
      },
      trending: {
        tabBarLabel: '趋势',
      },
    };
  }

  genTabBar() {
    const routesConfig = {};
    this.tabs.forEach((part, index) => {
      routesConfig[`tab${index}`] = {
        screen: props => <FavoriteTabPage {...props} tabBarLabel={part} />,
        navigationOptions: {
          tabBarLabel: this.tabsMap[part].tabBarLabel,
        },
      };
    });
    return createAppContainer(
      createMaterialTopTabNavigator(routesConfig, {
        tabBarOptions: {
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
    const navigationBar = <NavigationBar title="收藏" />;
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
  favorite: state.favorite,
});

const mapActionsToProps = dispatch => ({
  onLoadFavoriteData: (flag, favoriteDao) => {
    dispatch(onLoadFavoriteData(flag, favoriteDao));
  },
});

const FavoriteTabPage = connect(
  mapStateToProps,
  mapActionsToProps,
)(FavoriteTab);

export default FavoritePage;
