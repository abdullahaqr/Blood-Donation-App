import React, { useEffect, useState } from 'react'

import { View, Image, Alert, Text, Dimensions, StyleSheet, ScrollView, SafeAreaView, TouchableHighlight, TextInput, TouchableOpacity } from 'react-native'
import { Avatar, Title, Caption, Paragraph, Drawer, TouchableRipple, Switch, Button } from 'react-native-paper'
import { connect } from 'react-redux';

import { Picker } from '@react-native-picker/picker';
import { firebase } from '../config/firebase';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';






function Profile(props) {

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

        getUserDetail()
    }, []);

    const Mapfunction = async () => {

        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
            Alert('Permission to access location was denied');
        }
        Location.watchPositionAsync({
            distanceInterval: 1,

            accuracy: 6
        }, location => {
            console.log('location***', location)
            let { coords: { latitude, longitude } } = location
            setLocation(location)
            setregion({

                latitude,
                longitude,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001

            });

        });

    }










    const getUserDetail = async (bloodGroup, fbid, Health, number, location, name) => {


        var fbid = props.data.id;





        await firebase.firestore().collection('userInfo')


            .where('fbid', '==', fbid)
            .get()
            .then(function (snaps) {
                snaps.forEach((doc) => {
                    console.log('doc****', doc.data())
                    var detail = [];

                    detail.push({ ...doc.data(), documentId: doc.id })
                    setDocumentId(detail[0].documentId)
                    setName(detail[0].name)
                    console.log('name***', name)
                    SetNumber(detail[0].number)
                    setbloodGroup(detail[0].bloodGroup)
                    setHealth(detail[0].Health)
                    setAllinfo(detail)
                })
                console.log('detail****', DocumentId)



            })
        console.log('Do---<', DocumentId)



    }

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


    const getUserDetail2 = async () => {


        if (bloodGroup, Health, number, location, name) {
            getUserDetail()

            firebase.firestore().collection('userInfo').doc(DocumentId).update({
                bloodGroup, Health, number, location, name

            }).then(() => {
                Alert.alert('Your Information Updated successfully')

            }).catch(function (error) {
                Alert.alert(error)


            })




        }
        else {
            Alert.alert('error')
            getUserDetail(props.data.id, name, bloodGroup, Health, number)

        }
    }


    return (

        <SafeAreaView style={styles.container}>
            <View style={{ display: 'flex', flexDirection: "row", alignItems: 'center', width: '100%', backgroundColor: '#f1f0f0', marginBottom: 5 }}>




                <TouchableOpacity onPress={() => props.navigation.dispatch(DrawerActions.toggleDrawer())}>
                    <Image size={50} source={{ uri: 'https://cdn.icon-icons.com/icons2/916/PNG/512/Menu_icon_icon-icons.com_71858.png' }} style={{ width: 50, height: 50 }} />


                </TouchableOpacity>
                <Title style={{ color: 'red' }}>

                    Profile View
                   </Title>






            </View>

            <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'grey' }}>

                <Image size={50} source={{ uri: props.data.picture.data.url }} style={styles.container2} />

                <View style={styles.inputContainer}>

                    <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/message/ultraviolet/50/3498db' }} />
                    <TextInput style={styles.inputs}
                        placeholder="Name"
                        keyboardType="text"
                        underlineColorAndroid='transparent'
                        value={name}
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

                <View style={{ display: 'flex', flexDirection: 'column' }}>
                    <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => getUserDetail2()}>
                        <Text style={styles.loginText}>Edit</Text>
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
        backgroundColor: 'grey',
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
        borderRadius: 15,
        borderBottomWidth: 1,
        width: '100%',
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

export default connect(mapStateToProps, null)(Profile);
