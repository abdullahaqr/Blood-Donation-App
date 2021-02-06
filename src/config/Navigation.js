import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../components/Home'
import ProfileScreen from '../components/Profile'
import { Image } from 'react-native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from '../components/login'
import { connect } from 'react-redux';
import SideMenu from '../components/sideMenu'
import registrationForm from '../components/registrationForm'





const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();
const Drawer = createDrawerNavigator();

function StackNavigator(props) {
    return (
        <Stack.Navigator initialRouteName='Blood Donation App' screenOptions={{ headerShown:false}}>

            <Stack.Screen name='Login' component={Login} />

            <Stack.Screen name="Home" component={DrawerNavigator} />

        </Stack.Navigator>
    );
}



function DrawerNavigator(props, isLoggedIn) {



    return (


        <Drawer.Navigator drawerContent={props => <SideMenu {...props} />}>

            <>
                <Drawer.Screen name="Home" component={HomeScreen} />
                <Drawer.Screen name="Profile" component={ProfileScreen} />
                <Drawer.Screen name='Registration Form' component={registrationForm} />


                

            </>

        </Drawer.Navigator>

    )
}

export default (StackNavigator);





