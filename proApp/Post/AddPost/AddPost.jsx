import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import AddImage from './widgets/AddImage.jsx'
import InputsAsk from './widgets/InputsAsk.jsx';
import Footer from '../../widgets/Footer.jsx'
const AddPost=()=>{

    return(
        
        <View style={styles.view1}>
            <View style={styles.view2}>
            <AddImage/>
            <AddImage/>
            </View>
            <View style={styles.view3}>
                <InputsAsk/>
            </View>
            <TouchableOpacity style={styles.button}>
                <Text style={{color:"#fff",fontSize:16,fontWeight:"bold"}} >Next</Text>
            </TouchableOpacity>
        </View>
    )

}
const styles = StyleSheet.create({
    view1:{
        flex:1,
        padding:"5%",
        backgroundColor:"#fff"
    },
    view2:{
        flexDirection:"row",
        justifyContent:"space-between",
        flex:2,
        paddingTop:10
    },
    view3:{
        flex:3
    },
    button:{
        backgroundColor:"#F08DB7",
        alignSelf:"flex-end",
        width:"25%",
        height:"5%",
        alignItems:"center",
        padding:"2%",
        borderRadius:10
    }
});
export default AddPost;