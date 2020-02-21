import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconA from 'react-native-vector-icons/AntDesign';

import { Main, ContactData, Map as MapScreen, AddContact } from '../screens/index';

const BottomNavigationStack = createBottomTabNavigator({
  todo: {
    screen: Main,
    navigationOptions: {
      tabBarLabel: 'Todo',
      tabBarIcon: ({ tintColor }) => (
        < Icon
          name="tasks"
          color={tintColor}
          size={25}
        />
      )
    }
  },
  data: {
    screen: ContactData,
    navigationOptions: {
      tabBarLabel: 'Contact',
      tabBarIcon: ({ tintColor }) => (
        <IconA name="contacts"
          color={tintColor}
          size={25}
        />
      )
    }
  },
  map: {
    screen: MapScreen,
    navigationOptions: {
      tabBarLabel: 'Location',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="map-marker-alt"
          color={tintColor}
          size={25}
        />
      )
    }
  },
},
  {
    tabBarOptions: {
      activeTintColor: 'pink',
      inactiveTintColor: '#AAA',
      labelStyle: {
        fontSize: 12,
      },
      style: {
        backgroundColor: '#252525',
        borderTopWidth: 2,
        borderTopColor: 'pink',
        paddingVertical: 6,
        height: 60
      }
    }
  },
)

const AppNavigationStack = createStackNavigator(
  {
    BottomNavigationStack,
    AddContact
  },
  {
    headerMode: 'none',
    initialRouteName: 'BottomNavigationStack'
  }
)


const Router = createSwitchNavigator(
  {
    AppNavigationStack
  },
  {
    headerMode: 'none',
    initialRouteName: 'AppNavigationStack'
  })


export default createAppContainer(Router);