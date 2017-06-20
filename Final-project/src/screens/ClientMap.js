import React, { Component } from 'react';
import { Platform, View, ActivityIndicator } from 'react-native';
import { MapView, Constants, Location, Permissions } from 'expo';
import { Icon } from 'react-native-elements';
// import metro from '../json/metro.json';
import recents from '../json/recents.json';
import albums from '../json/albums.json';


class ClientMap extends Component {

  state = {
    mapLoaded: false,
    region: {
      longitude: 121.4635033,
      latitude: 25.0124794,
      longitudeDelta: 0.01,
      latitudeDelta: 0.02
    },
    albums: [],
    recents: [],
    errorMessage: null
  }

  componentWillMount() {
    this.setState({ recents });
  }

  componentDidMount() {
    this.setState({ mapLoaded: true });
  }

  onRegionChangeComplete = (region) => {
    this.setState({ region });
  }

  _getLocationAsync = async () => {
    let status = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({
      region: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        longitudeDelta: 0.01,
        latitudeDelta: 0.02
      }
    });
  };
  ClientMap = (props) => {
    const { No,
      Name,
      District,
      Address,
      Tel,
      image,
      Description
  } = props.navigation.state.params;
  };
  goToPageThree = (site) => {
    this.props.navigation.navigate('Details', { ...site });
  };
  render() {
    if (!this.state.mapLoaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <MapView
          region={this.state.region}
          style={{ flex: 1 }}
          onRegionChangeComplete={this.onRegionChangeComplete}
        >
          {this.state.recents.map(site => (
            <MapView.Marker
              coordinate={{ latitude: Number(site.latitude), longitude: Number(site.longitude) }}
              key={`${site.No}${site.Address}`}
              title={site.Name}
              description={site.Address}

              onPress={() => this.goToPageThree(site)}
            />
          ))}
        </MapView>
        <Icon
          raised
          name='my-location'
          color='white'
          containerStyle={{
            backgroundColor: '#517fa4',
            position: 'absolute',
            right: 20,
            bottom: 40
          }}
          onPress={this._getLocationAsync}
        />
      </View>
    );
  }
}

export default ClientMap;
