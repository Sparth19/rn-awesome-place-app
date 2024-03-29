import React, {useState} from 'react';
import {useEffect} from 'react';
import {View, Image, Button, StyleSheet} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {useSelector} from 'react-redux';

const PickImage = (props) => {
  const [pickedImage, setPickedImage] = useState(null);

  const checker = useSelector((state) => state.places.placeAdded);

  useEffect(() => {
    console.log(checker);
    if (!checker) {
      setPickedImage(null);
    }
  }, [checker]);

  pickImageHandler = () => {
    ImagePicker.showImagePicker({title: 'Pick an Image'}, (res) => {
      if (res.didCancel) {
        console.log('User cancelled!');
      } else if (res.error) {
        console.log('Error', res.error);
      } else {
        setPickedImage({uri: res.uri});
        props.onImagePicked({uri: res.uri, base64: res.data});
      }
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.placeholder}>
        <Image source={pickedImage} style={styles.previewImage} />
      </View>
      <View style={styles.button}>
        <Button title="Pick Image" onPress={pickImageHandler} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  placeholder: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#eee',
    width: '80%',
    height: 150,
  },
  button: {
    margin: 8,
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
});

export default PickImage;
