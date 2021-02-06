import React, { useEffect, useState } from 'react'

import { View, Image, Alert, Text, Dimensions, StyleSheet, ScrollView, SafeAreaView, TextInput,TouchableHighlight } from 'react-native'
import { Avatar, Title, Caption, Paragraph, Drawer, TouchableRipple, Switch, Button } from 'react-native-paper'
import { connect } from 'react-redux';

import { Picker } from '@react-native-picker/picker';
import { firebase } from '../config/firebase';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';



function RegistrationForm(props) {

    const [userInfo, setuserInfo] = useState(props.data)
    const [language, setLanguage] = useState('')
    const [bloodGroup, setbloodGroup] = useState('')
    const [Health, setHealth] = useState('')
    const [name, setName] = useState('');
    const [number, SetNumber] = useState('')
    const [Allinfo, setAllinfo] = useState('')
    const [region, setregion] = useState({
        latitude: 24.9588605,
        longitude: 67.065834,
        latitudeDelta: 0.003,
        longitudeDelta: 0.003,
    })
    const [markers, setMarker] = useState([])
    const [regionChange, setregionChange] = useState({})
    const [location, setLocation] = useState({});
    const [errorMsg, setErrorMsg] = useState(null);
    const [DocumentId, setDocumentId] = useState('')
    console.log('docme+++', DocumentId)
    const [value2, onChangeText2] = useState('Your Number');

    useEffect(async () => {
        Mapfunction()
    }, []);
   


    const saveUserData = async () => {
        const fbid = props.data.id
        const docid = DocumentId
        console.log('newdocid---<', docid)

        
        firebase.firestore().collection('userInfo').add({
            bloodGroup, fbid, Health, number, location, name, docid

        }).then(() => {
            Alert.alert('Your Information Save successfully')
        }).catch(function (error) {
            Alert.alert(error)


        })


    }

    return (
        <SafeAreaView style={styles.container}>

            <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#bac0d1' }}>
                <Text style={{ color: 'yellow', fontSize: 30, fontWeight: 'bold', }}>Registration Form</Text>
                <Title style={{ color: 'white' }}>Want To Register As a Donor? Then Fill The Form Below : </Title>

                <Image size={50} source={{ uri: props.data.picture.data.url }} style={styles.container2} />

                <View style={styles.inputContainer}>

                    <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/message/ultraviolet/50/3498db' }} />
                    <TextInput style={styles.inputs}
                        placeholder="Name"
                        keyboardType="text"
                        underlineColorAndroid='transparent'
                        onChangeText={(text) => setName(text)} />
                </View>

                <View style={styles.inputContainer}>
                    <Picker
                        selectedValue={bloodGroup}

                        style={styles.inputs}
                        onValueChange={(itemValue, itemIndex) =>
                            setbloodGroup(itemValue)
                        }>
                        <Picker.Item label="Choose Your Blood Group" value="" />
                        <Picker.Item label="O+" value="O+" />
                        <Picker.Item label="O-" value="O-" />
                        <Picker.Item label="A-" value="A-" />
                        <Picker.Item label="A+" value="A+" />
                        <Picker.Item label="B-" value="B+" />
                        <Picker.Item label="B-" value="B+" />
                        <Picker.Item label="AB+" value="AB+" />
                        <Picker.Item label="AB-" value="AB-" />

                    </Picker>
                </View>

                <View style={styles.inputContainer}>
                    <Picker
                        selectedValue={Health}
                        style={styles.inputs}
                        onValueChange={(itemValue, itemIndex) =>
                            setHealth(itemValue)
                        }>
                        <Picker.Item label="Tell About Your Health" value="" />
                        <Picker.Item label="Healthy" value="Healthy" />
                        <Picker.Item label="Sick" value="Sick" />
                    </Picker>
                </View>
                <View style={styles.inputContainer}>

                    <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/message/ultraviolet/50/3498db' }} />
                    <TextInput style={styles.inputs}
                        placeholder="Phone No"
                        keyboardType="numeric"
                        underlineColorAndroid='transparent'
                        value={number}
                        onChangeText={(text) => SetNumber(text)} />
                </View>

                <View style={{display:'flex',flexDirection:'column'}}>
                <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => saveUserData()}>
                    <Text style={styles.loginText}>Submit</Text>
                </TouchableHighlight>
                <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => props.navigation.navigate('Home')}>
                    <Text style={styles.loginText}>Go To Donor's List</Text>
                </TouchableHighlight>

                </View> 
               
            </ScrollView>
        </SafeAreaView>












    )




}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#bac0d1',
        marginTop: Constants.statusBarHeight,
    },
    text: {
        fontSize: 42,
    },
    container2: {
        width: Dimensions.get('window').width * 0.5,
        height: Dimensions.get('window').height * 0.3,
        borderRadius: 100,
        marginTop: 5

    },
    mapStyle: {
        width: Dimensions.get('window').width * 0.8,
        height: Dimensions.get('window').height * 0.3,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer: {



        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 150,
        borderRadius: 30,
        marginTop: '15%'
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: 350,
        height: 45,
        marginBottom: 30,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'

    },
    inputIcon: {
        width: 30,
        height: 30,
        marginLeft: 15,
        justifyContent: 'center'
    },
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
    },
    loginButton: {

        backgroundColor: "#166FE5",

    },
    loginText: {
        color: 'white',
    }

});

const mapStateToProps = function (state) {
    return {
        data: state.data
    }


}

export default connect(mapStateToProps, null)(RegistrationForm);