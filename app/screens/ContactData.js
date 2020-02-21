import React, { Component } from 'react'
import { View, StyleSheet, Dimensions, Text, FlatList, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import { NavigationEvents } from 'react-navigation';

import { getContacts } from '../redux/action/contacts';

const width = Dimensions.get('window').width;

class ContactData extends Component {
  constructor(props) {
    super(props)
    this.state = {
      contacts: []
    }
  }

  async componentDidMount() {
    await this.props.dispatch(getContacts())
    this.setState({
      contacts: this.props.contacts.data
    })
  }

  render() {
    const { contacts } = this.state
    return (
      <>
        <View style={styles.root}>
          <NavigationEvents onDidFocus={() => this.componentDidMount()} />
          <View style={styles.header}>
            <Text style={styles.textHeader}> - Contact List - </Text>
          </View>
          <View style={styles.containerBody}>
            <FlatList
              data={contacts}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.listContact}>
                  <View style={styles.profilePic}>
                    <Text>Photo</Text>
                  </View>
                  <View>
                    <Text style={styles.personName}>{item.name}</Text>
                    <Text style={styles.personContact}>{item.no_telp}</Text>
                    <Text style={styles.personContact}>{item.email}</Text>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={item => item.id.toString()}
            />
            <TouchableOpacity style={styles.containerPlusContact}
              onPress={() => this.props.navigation.navigate('AddContact')}>
              <Icon name="plus" size={35} color="#A7BF2E" />
            </TouchableOpacity>
          </View>
        </View>
      </>
    )
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  header: {
    backgroundColor: '#E91E63',
    alignItems: 'center',
    height: 50,
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#AAA',
  },
  textHeader: {
    color: 'white',
    fontSize: 18,
    fontWeight: '900',
    fontFamily: 'McLaren-Regular'
  },
  containerBody: {
    flex: 1,
    width: width,
    paddingBottom: 5
  },
  profilePic: {
    height: 50,
    width: 50,
    backgroundColor: '#eddbb9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  listContact: {
    width: width,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#A7BF2E',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5
  },
  personName: {
    fontFamily: 'McLaren-Regular',
    fontSize: 16,
    color: '#252525'
  },
  personContact: {
    color: '#1f1f1f',
    fontSize: 12
  },
  containerPlusContact: {
    backgroundColor: '#252525',
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: 'center',
    borderRadius: 25,
    position: 'absolute',
    bottom: 10,
    right: 20
  }
});

const mapStateToProps = state => {
  return {
    contacts: state.contacts
  }
}

export default connect(mapStateToProps)(ContactData);
