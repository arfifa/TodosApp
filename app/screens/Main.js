import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Alert, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import NoteList from '../components/NoteList';
import { getTodoData, storeTodoData } from '../config/StoreTodo';

class Main extends Component {

    constructor(props) {
        super(props)
        this.state = {
            noteArray: [],
            noteText: '',
            id: '',
            editText: '',
            edit: false
        }
    }

    async componentDidMount() {
        try {
            const todoData = await getTodoData();
            if (todoData === null) {
                await storeTodoData("[]");
            }
            await this.setState({
                noteArray: todoData
            })

        } catch (error) {
            Alert.alert(error)
        }
    }

    async componentWillUnmount() {
        await storeTodoData(this.state.noteArray)
    }

    async addNote() {
        if (this.state.noteText) {
            let d = new Date()
            let id = this.state.noteArray.length
            this.state.noteArray.push({
                'date': d.getFullYear() +
                    '/' + (d.getMonth() + 1) +
                    '/' + d.getDate(),
                'note': this.state.noteText,
                'id': id,
                'isDone': false
            })
            this.setState({ noteArray: this.state.noteArray, noteText: '' })
            await storeTodoData(this.state.noteArray)
        } else {
            Alert.alert('Text tidak boleh kosong!')
        }
    }

    async deleteNote(key) {
        this.state.noteArray.splice(key, 1)
        this.setState({ noteArray: this.state.noteArray })
        await storeTodoData(this.state.noteArray)
    }

    _handleEditNote(dataThisIndex) {
        this.setState({ editText: dataThisIndex.note, edit: true, id: dataThisIndex.id })
    }

    async _handleChangeEdit() {
        const { noteArray, id, editText } = this.state
        noteArray[id].note = editText
        this.setState({ noteText: '', edit: false, editText: '' })
        await storeTodoData(this.state.noteArray)
    }

    async _handleCheckBoxNote(checkNote) {
        const { noteArray } = this.state
        let checkNoteData = noteArray.find(note => checkNote.id === note.id)
        if (checkNoteData) {
            checkNoteData.isDone = !checkNote.isDone
            this.setState([...noteArray])
            await storeTodoData(this.state.noteArray)
        }
    }


    render() {
        let notes = this.state.noteArray.map((val, key) => {
            return <NoteList
                key={key}
                keyval={key}
                val={val}
                deleteMethod={() => this.deleteNote(key)}
                editMethod={() => this._handleEditNote(val)}
                checkBoxMethod={() => this._handleCheckBoxNote(val)} />
        })

        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#252525" />
                <View style={styles.header}>
                    <Text style={styles.textHeader}> - Note List - </Text>
                </View>
                <ScrollView style={styles.scrollContainer}>
                    {notes}
                </ScrollView>
                {this.state.edit ?
                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.addButton} onPress={this._handleChangeEdit.bind(this)}>
                            <Text style={styles.addButtonText}>EDIT</Text>
                        </TouchableOpacity>
                        <TextInput
                            style={styles.textInput}
                            value={this.state.editText}
                            onChangeText={noteText => this.setState({ editText: noteText })} />

                    </View> :
                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.addButton} onPress={this.addNote.bind(this)}>
                            <Icon name="plus" color="#FFF" size={25} />
                        </TouchableOpacity>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Write note here"
                            placeholderTextColor="#fff"
                            value={this.state.noteText}
                            onChangeText={noteText => this.setState({ noteText })} />
                    </View>
                }

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    scrollContainer: {
        flex: 1,
        marginBottom: 60,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10
    },
    textInput: {
        alignSelf: 'stretch',
        color: '#FFF',
        padding: 10,
        backgroundColor: '#AAA',
        borderTopWidth: 2,
        borderTopColor: "#252525",
        fontFamily: 'McLaren-Regular'
    },
    addButton: {
        position: 'relative',
        marginBottom: 5,
        right: 10,
        backgroundColor: '#E91E63',
        borderWidth: 2,
        borderColor: '#AAA',
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-end'
    },
    addButtonText: {
        color: 'white',
        fontSize: 16
    }

})

export default Main;