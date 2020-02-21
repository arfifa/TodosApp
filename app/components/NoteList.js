import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { Icon, CheckBox } from 'native-base';

const NoteList = (props) => {
    return (
        <View key={props.keyVal} style={styles.note}>
            <CheckBox
                style={styles.CheckBoxNote}
                checked={props.val.isDone} onPress={props.checkBoxMethod} />
            <Text style={styles.noteText}>{props.val.date}</Text>
            <Text style={styles.noteText}>{props.val.note}</Text>
            <TouchableOpacity onPress={props.deleteMethod} style={styles.noteDelete}>
                <Icon
                    style={styles.iconTrash}
                    name="trash" />
            </TouchableOpacity>
            <TouchableOpacity onPress={props.editMethod} style={styles.noteEdit}>
                <Icon
                    style={styles.iconEdit}
                    name="create" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    note: {
        position: 'relative',
        padding: 10,
        paddingRight: 100,
        borderBottomWidth: 2,
        borderBottomColor: '#ededed',
        justifyContent: 'center',
    },
    CheckBoxNote: {
        position: 'absolute'
    },
    noteText: {
        marginLeft: 25,
        paddingLeft: 20,
        borderLeftWidth: 5,
        borderLeftColor: '#E91E63',
        fontFamily: 'McLaren-Regular'
    },
    noteDelete: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2980b9',
        padding: 10,
        right: 10,
    },
    iconTrash: {
        color: 'white',
    },
    noteEdit: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
        padding: 10,
        right: 50,
    },
    iconEdit: {
        color: 'white',
    },
})

export default NoteList;