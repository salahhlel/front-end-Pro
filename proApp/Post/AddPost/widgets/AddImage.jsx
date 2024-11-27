import React, { useState } from 'react';
import { View,Image, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import iconAddImg from '../../../assets/addimg.png'
import { Center } from 'native-base';
const AddImage=()=>{

return(
   <TouchableOpacity style={styles.Addimage}>
     <Image
            source={iconAddImg}
            style={{width:24,height:24,marginRight:15,marginLeft:10}}
            />
   </TouchableOpacity>
)

}
const styles = StyleSheet.create({
    Addimage:{
        width: '48%',
        height: '80%',
        borderWidth: 2,
        borderColor: '#F08DB7',
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    }
});
export default AddImage;
