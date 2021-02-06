import React, { useState } from 'react';


import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableHighlight,
    Image,
    Alert,
    Dimensions
} from 'react-native';

import * as Facebook from 'expo-facebook';
import { connect } from 'react-redux';
import { fbData } from '../../store/action'



function LoginView(props) {
    const [email, Setemail] = useState('')
    const [password, SetPassword] = useState('')
    const [message, Setmessage] = useState('')
    const [fbinfo, setfbinfo] = useState('')



    const onRegister = async function () {
        auth.createUserWithEmailAndPassword(email, password).then(() => {
            Alert.alert('correct')
        }).catch(() => {
            Alert.alert('wrong')
        })







    }


    const onLogin = async function () {
        try {
            await LoginUser(email, password)
                .then(function (user) {
                    Alert.alert('correct')

                })


        }
        catch (error) {
            Alert.alert('wrong')

        }
    }
    const facebookLogin = async () => {
        await Facebook.initializeAsync({
            appId: '828442274649000',
        });
        const {
            type,
            token,
            expirationDate,
            permissions,
            declinedPermissions,
        } = await Facebook.logInWithReadPermissionsAsync({
            permissions: ['public_profile'],
        })

        if (type === 'success') {
            const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500)`)


            const userInfo = await response.json()
            console.log('userInfo', userInfo)
            props.fbData(userInfo)
            Alert.alert('Logged in!', `Hi ${userInfo.name}!`);
            setfbinfo(userInfo)


            props.navigation.navigate('Home', { itemid: 86, otherparams: 'anything' })

        }



        else {
            // type === 'cancel'
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.container4}>
                <Text style={{ color: '#c60101', fontSize: 20, fontWeight: 'bold', marginTop: 60 }}>Welcome To Blood Donation App</Text>
            </View>

            <Image size={50} source={{ uri: 'https://www.centurypa.com/images/blog/Blood%20donation.jpg' }} style={{ width: '100%', height: '35%', marginTop: 60 }} />

            <View style={styles.container4}>
                <Text style={{ color: 'grey', marginLeft: 10, paddingTop: 20 , fontSize: 18, fontStyle: 'italic' }}>"Blood Donation will cost you nothing but it will save a life"</Text>
            </View>




            <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={facebookLogin}>
                <Text style={styles.loginText}>Login With Facebook</Text>
            </TouchableHighlight>


        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',


    },
    container2: {
        width: Dimensions.get('window').width * 0.5,
        height: Dimensions.get('window').height * 0.2,

    },
    container4: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column',
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: 350,
        height: 45,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'

    },
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
    },
    inputIcon: {
        width: 30,
        height: 30,
        marginLeft: 15,
        justifyContent: 'center'
    },
    buttonContainer: {



        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 250,
        borderRadius: 10,
        marginTop: '25%',
        marginBottom: 110
    },
    loginButton: {

        backgroundColor: "#166FE5",

    },
    loginText: {
        color: 'white',
        fontSize: 18
    }
});

const mapDispatchToProps = function (dispatch) {
    return {
        fbData: (data) => dispatch(fbData(data))
    }

}

export default connect(null, mapDispatchToProps)(LoginView);


