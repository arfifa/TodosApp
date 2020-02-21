import React, { Component } from 'react'
import { View, StyleSheet, Dimensions, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import { connect } from 'react-redux';

import { postContact } from '../redux/action/contacts';

class AddContact extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      no_telp: '',
      email: ''
    }
  }

  _handleAddContact = async () => {
    const { name, no_telp, email } = this.state
    try {
      if (name.length > 0 && no_telp.length > 0 && email.length > 0) {
        let timeStamp = new Date().getTime()
        await this.props.dispatch(postContact({ id: timeStamp, ...this.state }))
        Alert.alert(
          'successfully!',
          '',
          [
            {
              text: 'OK',
              onPress: () => {
                this.props.navigation.navigate('data')
              }
            },
          ],
          { cancelable: false },
        );
      } else {
        Alert.alert('All form must be filled!')
      }
    } catch (error) {
      Alert.alert(JSON.stringify(error))
    }
  }

  render() {
    const { name, no_telp, email } = this.state
    return (
      <>
        <View style={styles.root}>
          <View style={styles.header}>
            <Text style={styles.textHeader}> - Add Contact - </Text>
          </View>
          <View style={styles.containerBody}>
            <View style={styles.containerInput}>
              <TextInput
                type="text"
                placeholder="Name"
                value={name}
                autoFocus
                style={styles.textInput}
                onChangeText={name =>
                  this.setState({
                    name
                  })
                } />
              <TextInput
                type="text"
                placeholder="Telphone number"
                value={no_telp}
                maxLength={13}
                style={styles.textInput}
                onChangeText={no_telp =>
                  this.setState({
                    no_telp
                  })
                } />
              <TextInput
                type="text"
                placeholder="email"
                value={email}
                keyboardType="email-address"
                style={styles.textInput}
                onChangeText={email =>
                  this.setState({
                    email
                  })
                } />
            </View>
            <TouchableOpacity
              style={styles.btnAddContact}
              onPress={this._handleAddContact} >
              <Text style={styles.textBtnAddContact}>ADD CONTACT</Text>
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
    paddingBottom: 5
  },
  containerInput: {
    padding: 10,
    marginBottom: 20
  },
  textInput: {
    backgroundColor: '#eddbb9',
    borderWidth: 2,
    borderColor: '#252525',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    fontFamily: 'McLaren-Regular'
  },
  btnAddContact: {
    paddingHorizontal: 15,
    paddingVertical: 7,
    width: 150,
    height: 50,
    backgroundColor: '#A7BF2E',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    alignSelf: 'flex-end',
    marginRight: 20,
    borderRadius: 5
  },
  textBtnAddContact: {
    color: '#FFF',
    fontFamily: 'McLaren-Regular',
  }
})

const mapStateToProps = state => {
  return {
    contacts: state.contacts
  }
}

export default connect(mapStateToProps)(AddContact);
