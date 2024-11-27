import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text, TextInput, YellowBox } from "react-native";
import { Select, Box, CheckIcon, Center, NativeBaseProvider, Spinner, HStack, Heading ,Actionsheet, useDisclose} from "native-base";
import { LinearGradient } from 'expo-linear-gradient';
import { useRoute, useNavigation } from '@react-navigation/native';
import BackIcon from '../assets/flecheIcon.png';
import CameraIcon from '../assets/cameraIcon.png';
import LogoWarpeed from '../assets/logo2.png';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios'
import Port from '../Port'
import { err } from 'react-native-svg';
import CheckBox from 'react-native-check-box';



const AcountDet = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { genre, email, password } = route.params;
    const [checked, setChecked] = useState(false);

    const today = new Date();
    const minDateOfBirth = new Date(today.getFullYear() - 16, today.getMonth(), today.getDate());
    const [birthDate, setBirthDate] = useState(minDateOfBirth);

    const [genreA, setGenreA] = useState(genre);
    const [BrandName, setBrandName] = useState('');
    const [emailA, setEmailA] = useState('');
    const [passwordA, setPasswordA] = useState('');
    const [phonenbr, setPhonenbr] = useState(null);
    const [Country, setCountry] = useState('');
    const [confirm, setConfirm] = useState('');


    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showSpiner,setShowSpiner]=useState(false)

    const [selectedImage, setSelectedImage] = useState(null);
    const [image, setImage] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclose();

    const [idgrade,setIdGrade]=useState(null)
    ////////////////////////////////////////////////////////////////

    
const IntitalGrade=async()=>{
    try{
        const response= await axios.put(Port+'/grades/')
        if(response.status==201){
            setIdGrade(response.data.id)
        }
        else{
            console.log(response.status);
        }
    }catch(e){
        throw new Error('error:'+e)
    }
}

const validateFullName = (fullname) => {
    if (!fullname || fullname.trim().length < 3) {
        alert('Please enter a valid Brand.');
        return false;
    }
    return true;
};
const validateCountry = (Country) => {
    if (!fullname) {
        alert('Please enter a valid country.');
        return false;
    }
    return true;
};
console.log(selectedImage)

const uploadImage = async () => {
    if (!selectedImage) {
      alert('Please select an image');
      return;
    }
  
    const formData = new FormData();
    // Il est important de s'assurer que le type MIME est bien défini
    formData.append('image', {
      uri: selectedImage.uri,
      name: selectedImage.uri.split('/').pop(),  // Optionnel: donner un nom à l'image
      type: selectedImage.type || 'image/jpeg',  // Assurez-vous que le type est correctement défini
    });
  
    try {
      const response = await axios.post(Port + '/props/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.status === 201) {
        console.log('Image uploaded successfully:', response.data);
        return response.data.url;
      }
    } catch (error) {
      console.log('Error uploading image:', error);
    }
  };
// Fonction de validation du numéro de téléphone
const validatePhoneNumber = (phonenbr) => {
    const phonePattern = /^[0-9]{8}$/; // Ajuste selon le format de ton pays
    if (!phonenbr || !phonePattern.test(phonenbr)) {
        alert('Please enter a valid 8-digit phone number.');
        return false;
    }
    return true;
};

// Fonction de validation de Mail
const validateMail = (mail) => {
    if (!mail) {
        alert('Please enter your email.');
        return false;
    }

    // Vérification du format de l'email avec une expression régulière
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(mail)) {
        alert('Please enter a valid email address.');
        return false;
    }

    return true; // Validation réussie
};


// Fonction de validation de mot de passe 
const validatePassword = (passwordA, confirmPassword) => {
    if (!passwordA) {
        alert('Please enter your password.');
        return false;
    }

    if (!confirmPassword) {
        alert('Please confirm your password.');
        return false;
    }

    // Vérifie si le mot de passe contient au moins une lettre majuscule et une lettre minuscule
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);

    if (!hasUpperCase || !hasLowerCase) {
        alert('Password must contain at least one uppercase letter and one lowercase letter.');
        return false;
    }

    if (passwordA !== confirmPassword) {
        alert('Passwords do not match. Please try again.');
        return false;
    }

    return true; // Validation réussie
};

   

// Fonction pour nettoyer et préparer les données de l'utilisateur
const PrepareUserData = async (email, BrandName, Country, phonenbr, passwordA,img, checked) => {
    const sanitizedEmail = email;
    const sanitizedbrand = fullname;
    const sanitizedPhone = phonenbr;
    
    try {
       
        return {
            email: sanitizedEmail,
            password: password, 
            brand_name: sanitizedbrand,
            phone_number: sanitizedPhone,
            region: Country,
            profile_picture_url: img,
            grade: idgrade,
            password: passwordA,
          
        };
    } catch (error) {
        console.error('Error fetching grade:', error); // Log l'erreur de la requête
        return null; // Retourner null si une erreur se produit
    }
};




// Fonction pour envoyer la requête et créer l'utilisateur
const addUser = async (userData, setShowSpiner, navigation, genre) => {
    try {
        // IntitalGrade()
        // if(idgrade){

            const response = await axios.post(`${Port}/users/`, userData);
            if (response.status === 200) {
                setShowSpiner(false); // Arrêter le spinner
                navigation.navigate("LoginWEmail", { genre });
            } else {
                throw new Error('Failed to add user'); // Gère les autres statuts
            }
        // }

    } catch (error) {
        setShowSpiner(false); // Arrêter le spinner en cas d'erreur
        console.error('Error adding user:', error); // Log l'erreur pour débogage
        alert('Error adding user: ' + error.message);
    }
};

// Fonction principale pour ajouter un nouvel utilisateur
const AddNewUser = async () => {
    // Validation des entrées
    if (!validateFullName(BrandName)) return;
    if (!validatePhoneNumber(phonenbr)) return;
    if (!validateCountry(Country)) return;
    if (!validateMail(emailA)) return;
    if (!validatePassword(passwordA,confirm)) return;

    // Début de l'animation du spinner
    setShowSpiner(true);

    try {
        console.log(PrepareUserData(email, fullname, phonenbr, genreA, selectedRegion, birthDate, password));

        const img = await uploadImage();
        
       
        
        console.log(img);

        // Attends que la fonction prepareUserData retourne les données avant de continuer
        const userData = await PrepareUserData(email, fullname, phonenbr, genreA, selectedRegion, birthDate, password, img);

        // Vérifie si les données utilisateur sont correctement préparées
        if (!userData) {
            throw new Error("User data could not be prepared");
        }

        // Envoyer la requête pour ajouter l'utilisateur
        await addUser(userData, setShowSpiner, navigation, genre);
    } catch (error) {
        setShowSpiner(false); // Arrêter le spinner en cas d'erreur
        console.error('Error adding user:', error);
        alert('Error adding user: ' + error.message);
    }
};




 const pickImageFromGallery = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Permission d\'accès à la galerie refusée !');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
        setSelectedImage({
            uri: result.assets[0].uri,
            type: result.assets[0].type, // Type MIME détecté (image/jpeg, image/png, etc.)
        });
    }
    onClose();
  };

  const takePhotoWithCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Permission d\'accès à la caméra refusée !');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
        setSelectedImage({
            uri: result.assets[0].uri,
            type: result.assets[0].type, // Type MIME détecté (image/jpeg, image/png, etc.)
        });
    }
    onClose();
  };


////////////////////////////////////////////////////////////////
    const regions = [
        'Ariana', 'Béja', 'Ben Arous', 'Bizerte', 'Gabès', 'Gafsa', 'Jendouba',
        'Kairouan', 'Kasserine', 'Kébili', 'Le Kef', 'Mahdia', 'La Manouba',
        'Médenine', 'Monastir', 'Nabeul', 'Sfax', 'Sidi Bouzid', 'Siliana',
        'Sousse', 'Tataouine', 'Tozeur', 'Tunis', 'Zaghouan'
    ];

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || birthDate;
        setShowDatePicker(false);
        setBirthDate(currentDate);
    };
///////////////////////////NATIVE BASE//////////////////////////////
    const Example = () => {
        return (
            <Box style={[styles.input, { borderColor: genreA === 'man' ? '#1870B3' : '#AD669E' }]}>
                <Select
                    selectedValue={selectedRegion}
                    minWidth="345"
                    accessibilityLabel="Choose Region"
                    placeholder="Choose Region"
                    _selectedItem={{
                        bg: "pink.200", // Couleur de fond de l'élément sélectionné
                        endIcon: <CheckIcon size="5" />,
                        borderRadius: 5, // Ajouter des bordures arrondies aux éléments sélectionnés
                      }}
                      _input={{
                          borderWidth: 0, // Supprime la bordure par défaut
                        }}
                        _light={{
                          borderWidth: 0, // Supprime la bordure par défaut
                        }}
                    style={{ color: genreA === 'man' ? '#1870B3' : '#AD669E' }}
                    onValueChange={itemValue => setSelectedRegion(itemValue)}
                >
                    {regions.map((region, index) => (
                        <Select.Item label={region} value={region} key={index} />
                    ))}
                </Select>
            </Box>
        );
    };
    const ExampleSpiner = () => {
        return <HStack space={2} justifyContent="center" mb={10}>
            <Spinner color={genreA === 'man' ? "cyan.800" : "indigo.800"}  size="lg" />
          </HStack>;
      };

///////////////////////////NATIVE BASE//////////////////////////////
const displayImageUri = selectedImage?decodeURIComponent(selectedImage.uri):''
const displayImageUri2 =displayImageUri? decodeURIComponent(displayImageUri):''
console.log(displayImageUri2 );

    return (
        <NativeBaseProvider>
        <View style={styles.container}>
            <LinearGradient
                colors={genreA === 'man' ? ['#2C9AEE', '#ABC0FF'] : ['#AD669E', '#FFB6C8']}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={styles.background}
            >
                <TouchableOpacity 
                onPress={onOpen}
                style={styles.cameraButton}>
                    {selectedImage?  
                    
                    <Image
                        source={{uri: displayImageUri2}}
                        style={styles.cameraIcon}
                    />:
                    <Image
                        source={CameraIcon}
                        style={styles.cameraIcon}
                    />
                }
                </TouchableOpacity>
                     <Actionsheet isOpen={isOpen} onClose={onClose}>
                        <Actionsheet.Content>
                        <Actionsheet.Item onPress={takePhotoWithCamera}>
                            Prendre une photo
                        </Actionsheet.Item>
                        <Actionsheet.Item onPress={pickImageFromGallery}>
                            Choisir depuis la galerie
                        </Actionsheet.Item>
                        <Actionsheet.Item onPress={onClose} color="red.500">
                            Annuler
                        </Actionsheet.Item>
                        </Actionsheet.Content>
                    </Actionsheet>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={[styles.input, { borderColor: genreA === 'man' ? '#1870B3' : '#AD669E', color: genreA === 'man' ? '#1870B3' : '#AD669E' }]}
                        placeholder="Name Of Brand "
                        placeholderTextColor={genreA === 'man' ? '#1870B3' : '#AD669E'}
                        onChangeText={(text) => { setBrandName(text) }}
                    />
                     <TextInput
                        style={[styles.input, { borderColor: genreA === 'man' ? '#1870B3' : '#AD669E', color: genreA === 'man' ? '#1870B3' : '#AD669E' }]}
                        placeholder="E-Mail"
                        placeholderTextColor={genreA === 'man' ? '#1870B3' : '#AD669E'}
                        onChangeText={(text) => { setEmailA(text) }}
                    />
                     <TextInput
                        style={[styles.input, { borderColor: genreA === 'man' ? '#1870B3' : '#AD669E', color: genreA === 'man' ? '#1870B3' : '#AD669E' }]}
                        placeholder="Country "
                        placeholderTextColor={genreA === 'man' ? '#1870B3' : '#AD669E'}
                        onChangeText={(text) => { setCountry(text) }}
                    />
                    <TextInput
                        style={[styles.input, { borderColor: genreA === 'man' ? '#1870B3' : '#AD669E', color: genreA === 'man' ? '#1870B3' : '#AD669E' }]}
                        placeholder="Phone Number"
                        placeholderTextColor={genreA === 'man' ? '#1870B3' : '#AD669E'}
                        keyboardType="phone-pad"
                        onChangeText={(text) => { setPhonenbr(text) }}
                    />
                         <TextInput
                        style={[styles.input, { borderColor: genre === 'man' ? '#1870B3' : '#AD669E', color: genre === 'man' ? '#1870B3' : '#AD669E' }]}
                        placeholder="Password"
                        placeholderTextColor={genre === 'man' ? '#1870B3' : '#AD669E'}
                        secureTextEntry
                        onChangeText={(text)=>{setPasswordA(text)}}
                       
                    />
                    <TextInput
                        style={[styles.input, { borderColor: genre === 'man' ? '#1870B3' : '#AD669E', color: genre === 'man' ? '#1870B3' : '#AD669E' }]}
                        placeholder="Confirm Password"
                        placeholderTextColor={genre === 'man' ? '#1870B3' : '#AD669E'}
                        secureTextEntry
                        onChangeText={(text)=>{setConfirm(text)}}

                    />
 <CheckBox
        style={styles.checkbox}
        isChecked={checked}
        onClick={() => setChecked(!checked)}
        rightText="j'accepte les règle et les conditions d'utilisation"
        rightTextStyle={styles.text}
        checkBoxColor="#1188"
      />
           

                {showDatePicker && (
                    <DateTimePicker
                        value={birthDate}
                        mode="date"
                        display="default"
                        onChange={onChange}
                    />
                )}
                </View>

                {/* <View style={styles.genderContainer}>
                    <TouchableOpacity onPress={() => setGenreA("man")} style={[styles.genderButton, genreA === 'man' && styles.selectedGender]}>
                        <Text style={styles.genderText}>Man</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setGenreA("woman")} style={[styles.genderButton, genreA === 'woman' && styles.selectedGender]}>
                        <Text style={styles.genderText}>Woman</Text>
                    </TouchableOpacity>
                </View> */}
                    {!showSpiner?
                <TouchableOpacity style={[styles.proceedButton, { backgroundColor: genreA === 'man' ? '#2C9AEE' : '#AD669E' }]}
                onPress={()=>{ navigation.navigate("ProfilePage", { genre })}}
                >
                    <Text style={styles.proceedText}>Proceed</Text>
                </TouchableOpacity>
                    :
                    <ExampleSpiner/>
                    }

                <Text style={styles.termsText}>By proceeding, you are accepting all our <Text style={styles.linkText}>terms & conditions</Text>.</Text>
            </LinearGradient>
        </View>
        </NativeBaseProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
        paddingVertical: 50,
    },
    cameraButton: {
        backgroundColor: '#FFFFFF6C',
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
        borderWidth: 2,
        borderColor: '#FFFFFF',
        marginTop: "20%"
    },
    cameraIcon: {
        width: 40,
        height: 40,
        tintColor: '#FFFFFF',
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#FFFFFFEC',
        borderRadius: 10,
        height: 50,
        marginBottom: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        borderWidth: 2,
    },
    pickerContainer: {
        backgroundColor: '#FFFFFFEC',
        borderRadius: 10,
        height: 50,
        justifyContent: 'center',
        marginBottom: 25,
        paddingHorizontal: 20,
        borderWidth: 2,
    },
    genderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 35,
    },
    genderButton: {
        flex: 1,
        paddingVertical: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 10,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    selectedGender: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    genderText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '500',
    },
    proceedButton: {
        borderRadius: 25,
        width: '100%',
        paddingVertical: 15,
        alignItems: 'center',
        marginBottom: 20,
    },
    proceedText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
    },
    termsText: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 12,
        textAlign: 'center',
    },
    linkText: {
        textDecorationLine: 'underline',
    },
    checkbox: {
        marginVertical: 10,
      },
      text: {
        fontSize: 16,
        color: '#333',
      },
});

export default AcountDet;
