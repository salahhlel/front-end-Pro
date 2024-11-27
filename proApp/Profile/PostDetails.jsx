import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { FontAwesome, MaterialIcons, Ionicons, Feather } from '@expo/vector-icons';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';

const PostDetails = () => {
  const [showTags, setShowTags] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [liked, setLiked] = useState(false); // État pour l'étoile (aimé ou non)
  const [saved, setSaved] = useState(false); // État pour l'icône de sauvegarde
  const [showComments, setShowComments] = useState(false); // État pour afficher/masquer les commentaires

  const images = [
    'https://via.placeholder.com/350x200',
    'https://via.placeholder.com/350x200/0000FF',
    'https://via.placeholder.com/350x200/FF00FF'
  ];

  const handleImagePress = () => {
    setShowTags(!showTags);
  };

  const handleSwipe = (event) => {
    if (event.nativeEvent.translationX < 0) {
      const nextIndex = (currentImageIndex + 1) % images.length;
      setCurrentImageIndex(nextIndex);
    } else if (event.nativeEvent.translationX > 0) {
      const prevIndex = (currentImageIndex - 1 + images.length) % images.length;
      setCurrentImageIndex(prevIndex);
    }
  };

  // Fonction pour gérer le clic sur l'étoile
  const handleLikePress = () => {
    setLiked(!liked); // Bascule l'état "aimé"
  };

  // Fonction pour gérer le clic sur l'icône de sauvegarde
  const handleSavePress = () => {
    setSaved(!saved); // Bascule l'état "enregistré"
  };

  // Fonction pour gérer le clic sur l'icône de commentaire
  const handleCommentPress = () => {
    setShowComments(!showComments); // Bascule l'état pour afficher/masquer les commentaires
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity>
            <Text style={styles.backButton}>Back</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.postContainer}>
        <PanGestureHandler onHandlerStateChange={handleSwipe}>
            <View>
                <TouchableOpacity onPress={handleImagePress}>
                    <Image
                    source={{ uri: images[currentImageIndex] }}
                    style={styles.postImage}
                    />
                </TouchableOpacity>
            </View>
        </PanGestureHandler>


          {showTags && (
            <View style={styles.tagContainer}>
              <TouchableOpacity style={styles.tag}>
                <Text style={styles.tagText}>Prada - $250</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.tag}>
                <Text style={styles.tagText}>Gucci - $180</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.tag}>
                <Text style={styles.tagText}>Kenzo - $300</Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.iconBar}>
            {/* Icône étoile pour aimer */}
            <TouchableOpacity style={styles.iconButton} onPress={handleLikePress}>
              <FontAwesome
                name={liked ? 'star' : 'star-o'} // Change l'icône selon l'état "aimé"
                size={24}
                color={liked ? '#FFED2B' : 'black'} // Change la couleur selon l'état
              />
            </TouchableOpacity>

            {/* Icône pour ajouter un commentaire */}
            <TouchableOpacity style={styles.iconButton} onPress={handleCommentPress}>
              <Ionicons name="chatbubble-outline" size={24} color="black" />
            </TouchableOpacity>

            <View style={styles.imageIndicator}>
              {images.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    currentImageIndex === index ? styles.activeDot : styles.inactiveDot
                  ]}
                />
              ))}
            </View>

            {/* Icône pour passer une commande */}
            <TouchableOpacity style={styles.iconButton}>
              <Feather name="shopping-cart" size={24} color="black" />
            </TouchableOpacity>

            {/* Icône pour enregistrer le post */}
            <TouchableOpacity style={styles.iconButton} onPress={handleSavePress}>
              <MaterialIcons
                name={saved ? 'bookmark' : 'bookmark-border'} // Change l'icône selon l'état "enregistré"
                size={24}
                color={saved ? 'black' : 'black'} // Change la couleur selon l'état
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.postDetails}>
          <Text style={styles.postText}>Here's my outfit for bestie's bday! 🎉</Text>
          <View style={styles.userInfo}>
            <Image
              source={{ uri: 'https://via.placeholder.com/50' }}
              style={styles.profileImage}
            />
            <Text style={styles.userName}>Anant R.</Text>
          </View>
        </View>


        {showComments && ( // Affiche les commentaires uniquement si showComments est vrai
          <View style={styles.commentsContainer}>
       
       
            <View style={styles.comment}>
              <Image source={{ uri: 'https://via.placeholder.com/40' }} style={styles.commentProfileImage} />
              <View style={styles.commentDetails}>
                <Text style={styles.commentUser}>L.L</Text>
                <Text style={styles.commentText}>The real death is that no one in the world remembers you.</Text>
              </View>
            </View>

            <View style={styles.comment}>
              <Image source={{ uri: 'https://via.placeholder.com/40' }} style={styles.commentProfileImage} />
              <View style={styles.commentDetails}>
                <Text style={styles.commentUser}>Marta</Text>
                <Text style={styles.commentText}>The real death is that no one in the world remembers you.</Text>
                <View style={styles.likeContainer}>
                  <Text style={styles.likeText}>1234</Text>
                </View>
              </View>
            </View>
            <View style={styles.commentInputContainer}>              
          <TextInput placeholder="Comment..." style={styles.commentInput} />
        </View>
          </View>
        )}
      </ScrollView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    marginTop:'5%'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  backButton: {
    color: '#007BFF',
    fontSize: 16,
  },
  postContainer: {
    position: 'relative',
  },
  postImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  tagContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 10,
    left: 10,
  },
  tag: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    marginRight: 5,
  },
  tagText: {
    color: '#fff',
  },
  iconBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  iconButton: {
    padding: 10,
  },
  imageIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 2,
  },
  activeDot: {
    backgroundColor: '#000',
  },
  inactiveDot: {
    backgroundColor: '#ccc',
  },
  postDetails: {
    marginTop: 15,
  },
  postText: {
    fontSize: 16,
    marginBottom: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  commentInputContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  commentInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  commentsContainer: {
    marginTop: 10,
  },
  comment: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  commentProfileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  commentDetails: {
    flex: 1,
  },
  commentUser: {
    fontWeight: 'bold',
  },
  commentText: {
    color: '#555',
  },
  likeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeText: {
    color: '#007BFF',
  },
});

export default PostDetails;
