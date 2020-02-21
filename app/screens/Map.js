import React, { Component } from 'react';
import {
  View,
  ToastAndroid,
  Platform,
  PermissionsAndroid,
  Dimensions,
  StyleSheet,
} from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { NavigationEvents } from 'react-navigation';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mapRegion: null,
      latitude: 0,
      longitude: 0,
      isLoading: false,
      errorMessage: null
    }
  }

  componentDidMount = async () => {
    await this.getLocation();
  };

  hasLocationPermission = async () => {
    if (
      Platform.OS === 'ios' ||
      (Platform.OS === 'android' && Platform.Version < 23)
    ) {
      return true;
    }
    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (hasPermission) {
      return true;
    }
    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }
    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location Permission Denied By User.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location Permission Revoked By User.',
        ToastAndroid.LONG,
      );
    }
    return false;
  };

  getLocation = async () => {
    const hasLocationPermission = await this.hasLocationPermission();

    if (!hasLocationPermission) {
      return;
    }

    this.setState({ isLoading: true }, () => {
      Geolocation.getCurrentPosition(
        position => {
          let region = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.00922,
            longitudeDelta: 0.00421 * 1.5,
          };
          this.setState({
            mapRegion: region,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            loading: false,
          });
        },
        error => {
          this.setState({ errorMessage: error });
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
          distanceFilter: 50,
          forceRequestLocation: true,
        },
      )
    })
  }

  render() {
    return (
      <View style={styles.root} >
        <NavigationEvents onDidFocus={() => this.componentDidMount()} />
        <MapView
          style={styles.mapView}
          showsMyLocationButton={true}
          showsIndoorLevelPicker={true}
          showsUserLocation={true}
          zoomControlEnabled={true}
          showsCompass={true}
          showsTraffic={true}
          region={this.state.mapRegion}
          initialRegion={{
            latitude: this.state.latitude || -7.755322,
            longitude: this.state.longitude || 110.381174,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}>
        </MapView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  mapView: {
    height: '100%',
    width: '100%'
  }
});

export default Map;

