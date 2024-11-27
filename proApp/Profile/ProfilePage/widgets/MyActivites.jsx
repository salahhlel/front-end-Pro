import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, FlatList,Image,ScrollView } from 'react-native';

const MyActivitie = () => {
  const [activeButton, setActiveButton] = useState('favorites'); // Track the active button

  const handlePress = (button) => {
    setActiveButton(button); // Update the active button state
  };

  const data = [
      {
        id: '1',
        avatar: 'https://media.voguebusiness.com/photos/65e762aa2a09a98387402ce6/2:3/w_2560%2Cc_limit/pfw-wrap-vogue-business-story.jpg', 
        status: 'Publisher',
        time: 'before 2 min',
        message: 'Sunny day',
      },
      {
        id: '2',
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaP-Rji0gsGL_IgIk2a1hpevSaH1wBJtkCiw&s',
        status: 'Publisher',
        time: 'before 2 min',
        message: 'Sunny day',
      },
      {
        id: '3',
        avatar: 'https://t4.ftcdn.net/jpg/04/84/87/61/360_F_484876187_u6HIlCgA2iZdfkoOamuQa43OJH2zaDVR.jpg',
        status: 'Publisher',
        time: 'before 2 min',
        message: 'Sunny day',
      },
    ];
  // Animated styles based on the active button
  const buttonStyle = (button) => ({
    backgroundColor: activeButton === button ? "#AD669E" : "#FFFFFF8F",
    borderColor: '#FFB6C8',
  });
  const App = () => {
      const renderItem = ({ item }) => (
        <View style={styles.card}>
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
          <View style={styles.info}>
            <Text style={styles.status}>{item.status}</Text>
            <Text style={styles.time}>{item.time}</Text>
            <Text style={styles.message}>{item.message}</Text>
          </View>
        </View>
      );
    
      return (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.container}
        />
      );
    };

  return (
    <View>
      <View style={styles.view2}>
        <TouchableOpacity
          style={[styles.button, buttonStyle('favorites')]} // Apply styles based on active button
          onPress={() => handlePress('favorites')}
        >
          <Text style={[styles.text, { color: activeButton === 'favorites' ? 'white' : '#AD669E' }]}>
           Neveau tag
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button2, buttonStyle('likes')]} // Apply styles based on active button
          onPress={() => handlePress('likes')}
        >
          <Text style={[styles.text2, { color: activeButton === 'likes' ? 'white' : '#AD669E' }]}>
            approved tags
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button2, buttonStyle('like')]} // Apply styles based on active button
          onPress={() => handlePress('like')}
        >
          <Text style={[styles.text2, { color: activeButton === 'like' ? 'white' : '#AD669E' }]}>
Activities
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{margin:2}}>
     
      <FlatList
        data={data}
        renderItem={App}
        keyExtractor={(item) => item.id}
        numColumns={1} // Display items in two columns
        scrollEnabled={true} // Enable scrolling
        contentContainerStyle={styles.imageGrid} // Style for the container
      />

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view2: {
    flexDirection: 'row',
    margin: 15,
  },
  button: {
    padding: 8,
    borderRadius: 50,
    marginRight: 5,
    borderWidth: 1,
  },
  button2: {
    padding: 10,
    borderRadius: 50,
    marginLeft: 15,
    borderWidth: 1,
  },
  text: {
    fontSize: 16,
  },
  text2: {
    fontSize: 16,
  },
//   imageGrid: {
//     flexGrow: 3, // Allow the FlatList to grow
//     paddingBottom: 10, // Optional: Add some padding at the bottom
//   },
  imageContainer: {
    width: '50%', // Each image will take half the width

    justifyContent: 'center',
    marginBottom: 50, // Add space between rows
    margin:2
  },
  image: {
    width: '40%', // Full width of the container
    height: 80, // Set a fixed height or adjust as needed
    borderRadius: 50, // Optional: to round the corners of the images
  },
  divider: {
    height: 3, // Height of the divider
    backgroundColor: '#FFB6C8', // Color of the divider
  },
    container: {
    padding: 10,
    backgroundColor: '#fff',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 10,
    shadowColor: '#000',
   
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  status: {
    color: '#fff',
    backgroundColor: '#8e44ad',
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 6,
    alignSelf: 'flex-start',
    fontSize: 12,
    marginBottom: 4,
    marginLeft:80,
  },
  time: {
    fontSize: 12,
    color: '#aaa',
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
    color: '#333',
  },
});


export default MyActivitie;
