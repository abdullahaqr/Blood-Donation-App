import 'react-native-gesture-handler';
import React, { useEffect, useState, } from 'react'
import { View, Text, Button, Alert, FlatList, StyleSheet, StatusBar, Header, ScrollView, TextInput, TouchableOpacity,Image,TouchableHighlight } from 'react-native'
import { connect } from 'react-redux';
import { firebase } from '../config/firebase'
import { DataTable, Title, Appbar,icon } from 'react-native-paper';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
// import { Icon } from 'react-native-elements'






function Home(props) {


    const [token, setToken] = useState([])
    const [DocumentId, setDocumentId] = useState('')
    const [fullName, setFullName] = useState('')
    const [bloodGroup, setBloodGroup] = useState('')
    const [Health, setHealth] = useState('')
    const [phoneNo, setPhoneNo] = useState('')
    const [Allinfo, setAllinfo] = useState('')
    const [chatID, setChatID] = useState('')
    const [name, setName] = useState('')
    const [Allinfo2, setAllinfo2] = useState('')
    const [filterData, setfilterData] = useState(false)
    const [buttonFilter, setbuttonFilter] = useState(true)




    useEffect(() => {
        getCompanyToken()

    }, [Allinfo])

    


    const getCompanyToken = async () => {
        setfilterData(false)
        setbuttonFilter(true)



        var info = [];
        await firebase.firestore().collection('userInfo')


            .get().then(function (snaps) {
                snaps.forEach((doc) => {
                    console.log('doc****', doc.data())


                    info.push({ ...doc.data(), tokenId: doc.id })
                    console.log('info***', info)



                })
                setAllinfo(info)
                console.log('ok2--->', Allinfo)





            })









    }

    const getFilterData = async () => {




        var info2 = [];
        const filterName = name;
        console.log('name---->', filterName)
        await firebase.firestore().collection('userInfo')

            .where('bloodGroup', '==', filterName)



            .get().then(function (snaps) {
                snaps.forEach((doc) => {
                    console.log('doc****', doc.data())

                    info2.push({ ...doc.data(), tokenId: doc.id })
                    console.log('info**--2', info2)



                })
                setAllinfo2(info2)
                setfilterData(true)
                setbuttonFilter(false)



                console.log('ok--->', Allinfo2)




            }).then(() => {
                console.log('chala---->')
                setName('')
            })


    }


    const onChange = (text) => {
        setName(text)
        getFilterData()

    }



    return (



        <View style={styles.container}>
            <View style={{ display:'flex', flexDirection: "row",alignItems:'center', width: '100%', backgroundColor: '#bf112b', marginBottom: 5, borderRadius: 10 }}>




                    <TouchableOpacity onPress={() => props.navigation.dispatch(DrawerActions.toggleDrawer())} style={{ paddingLeft: 15, paddingTop: 50 }}>
                        <Image size={50} source={{ uri: 'https://cdn.icon-icons.com/icons2/916/PNG/512/Menu_icon_icon-icons.com_71858.png' }} style={{ width: 50, height: 50, paddingTop: 50 }} />
                        

                    </TouchableOpacity>
                     <Title style={{color:'#f9f9f9', marginLeft: 40, paddingTop: 50}}> 
                    Donors List
                </Title>



            </View>



                <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/message/ultraviolet/50/3498db' }} />





            {!filterData ? <FlatList
                data={Allinfo}
                keyExtractor={elem => elem.name}
                renderItem={elem => (<View style={styles.middle}>
                    <Text><Title style={{ color: '#bf112b' }}>Name: </Title><Title style={styles.top}>{elem.item.name}</Title></Text>
                    <Text><Title style={{ color: '#bf112b' }}>Phone No: </Title><Title>{elem.item.number}</Title></Text>
                    <Text><Title style={{ color: '#bf112b' }}>Blood Group: </Title><Title style={styles.top}>{elem.item.bloodGroup}</Title></Text>

                    <Text><Title style={{ color: '#bf112b' }}>Health: </Title><Title>{elem.item.Health}</Title></Text>

                </View>)}
            /> :

                <FlatList
                    data={Allinfo2}
                    keyExtractor={elem => elem.name}
                    renderItem={elem => (<View style={styles.middle}>
                        <Text><Title>Name: </Title><Title style={styles.top}>{elem.item.name}</Title></Text>
                        <Text><Title>Phone No: </Title><Title>{elem.item.number}</Title></Text>
                        <Text><Title>Blood Group: </Title><Title style={styles.top}>{elem.item.bloodGroup}</Title></Text>

                        <Text><Title>Health: </Title><Title>{elem.item.Health}</Title></Text>

                    </View>)}
                />
            }


        </View>


    )


}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: 'white',
        // padding: 20,
    },
    top: {
        flex: 0.3,
        // color:'red',
        alignItems:'center'

    },
    middle: {
        flex: 0.3,
        backgroundColor: "#e5e3e3",
        borderWidth: 3,
        marginBottom:10,
        borderRadius:20,
        // borderColor:'#930018',
        borderColor:'#bf112b',
        alignItems:'center',
        color:'white',
        marginRight: 20,
        marginLeft: 20,
    },
    bottom: {
        flex: 0.3,
        backgroundColor: "pink",
        borderWidth: 5,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
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
        width: 300,
        height: 45,
        marginBottom: 10,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'

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
    buttonContainer: {



        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 150,
        borderRadius: 10,
        marginLeft:70
    },
    loginButton: {

        backgroundColor: "blue",

    },
    loginText: {
        color: 'white',
    }
})

const mapStateToProps = function (state) {
    return {
        data: state.data,


    }

}



export default connect(mapStateToProps, null)(Home);


