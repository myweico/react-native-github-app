import React, {Component, createRef} from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import {connect} from 'react-redux';
import TrendingItem from './components/TrendingItem';
import Toast from 'react-native-easy-toast';
import {
  onLoadTrendingData,
  onLoadMoreTrending,
} from '../../store/actions/trending';
import NavigationBar from '../../components/NavigationBar';
import TrendingDialog, {TimeSpans} from './components/Dialog';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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
    // console.log(URL + key + '?' + this.props.timeSpan.searchText);
    return URL + key + '?' + this.props.timeSpan.searchText;
  }

  toDetailPage(params) {
    this.props.navigation.navigate('DetailPage', params);
  }

  renderItem(data) {
    const item = data.item;
    return (
      <TrendingItem
        item={item}
        onSelect={() => {
          this.toDetailPage();
        }}
      />
    );
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
  constructor(props) {
    super(props);
    this.tabs = ['C', 'C#', 'PHP', 'JavaScript'];
    this.state = {
      timeSpan: TimeSpans[0],
    };
  }

  getTitleView() {
    return (
      <TouchableOpacity
        underlayColor="transparent"
        onPress={() => {
          this.dialog && this.dialog.show();
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={styles.titleText}>
            趋势 {this.state.timeSpan.showText}
          </Text>
          <MaterialIcons
            name={'arrow-drop-down'}
            size={22}
            style={{color: 'white'}}></MaterialIcons>
        </View>
      </TouchableOpacity>
    );
  }

  onSelectTimeSpan(tab) {
    this.dialog.dismiss();
    this.setState({
      timeSpan: tab,
    });
  }

  getTrendingDialog() {
    return (
      <TrendingDialog
        ref={dialog => (this.dialog = dialog)}
        onSelect={tab => this.onSelectTimeSpan(tab)}></TrendingDialog>
    );
  }

  genTabBar() {
    const routesConfig = {};
    this.tabs.forEach((part, index) => {
      routesConfig[`tab${index}`] = {
        screen: props => (
          <TrendingTabPage
            {...props}
            tabBarLabel={part}
            timeSpan={this.state.timeSpan}
          />
        ),
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
    const MatTopNav = this.genTabBar();
    const NavBar = (
      <NavigationBar titleView={this.getTitleView()}></NavigationBar>
    );
    const Dialog = this.getTrendingDialog();
    return (
      <>
        {NavBar}
        <MatTopNav />
        {Dialog}
      </>
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
  titleText: {
    fontSize: 20,
    color: '#fff',
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
