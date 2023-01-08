import { View, Text, StatusBar, TextInput, Image, TouchableOpacity, Platform, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { normalize } from '../components/utils'
import { add_but, minus_but, pic } from '../components/icons'
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';


export default function CreateCategory({ navigation }) {

    const [filePath, setFilePath] = useState("");
    const [cate_name, setCate_name] = useState("")
    const [cate_sub, setCate_sub_] = useState("")
    const [img, setImg] = useState()
    const [val, setval] = useState([])

    const onChangeText = (text) => {
        setCate_name(text)
    }

    const onChangeSub = (data, i) => {
        const inputData = [ ...val]
        inputData[i] = { "name" : data }
        setval(inputData)
    }

    const Add = async () => {

        console.log("catename",cate_name)
        console.log("img",img)
        console.log("sub",val)

        fetch("https://dmapi.ipaypro.co/app_task/categories/add", {
            method: "POST",
            body: JSON.stringify({
                category_name  : cate_name,
                image: img,
                sub_cateries : val
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(response => console.log("response.json()", response))
        .then(data => console.log(data));
        setCate_name("")
        setImg()
        setFilePath("")
        setval([])
        navigation.navigate("View")

    }

    const chooseFile = () => {
        let options = {
            title: 'Select Image',
            customButtons: [
                {
                    name: 'customOptionKey',
                    title: 'Choose Photo from Custom Option'
                },
            ],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        let photo = {
            uri: '',
            type: 'image/jpeg',
            name: 'image.jpg',
        };
        launchImageLibrary(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log(
                    'User tapped custom button: ',
                    response.customButton
                );
                alert(response.customButton);
            } else if (response.assets) {
                photo.uri =
                    Platform.OS === 'android'
                        ? String(response.assets[0].uri)
                        : String(response.assets[0].uri).replace('file://', '');
                let source = response;
                console.log("image Data", photo.uri)
                setImg(photo.uri)
                setFilePath(response);
            }
        });
    };

    // let photo = {
    //     uri: '',
    //     type: 'image/jpeg',
    //     name: 'image.jpg',
    //   };
    // launchImageLibrary(options, response => {
    //               if (response.didCancel) {
    //                 console.log('User cancelled image picker');
    //               } else if (response.errorCode) {
    //                 console.log('ImagePicker Error: ', response.errorCode);
    //               } else if (response.assets) {
    //                 photo.uri =
    //                   Platform.OS === 'android'
    //                     ? String(response.assets[0].uri)
    //                     : String(response.assets[0].uri).replace('file://', '');
    //               }
    //             });
    // }

    const handleAdd = () => {
        const value = [...val, {}]
        setval(value)
    }

    const handleDelete = (i) => {
        const deleteVal = [...val]
        deleteVal.splice(i)
        setval(deleteVal)
    }

    return (
        <>
            <StatusBar translucent={false} barStyle={"dark-content"} backgroundColor={"#FFFFFF"} />
            <ScrollView style={{ flex: 1, backgroundColor: "#FFFFFF" }} >
                <View style={{ alignSelf: "center", marginTop: normalize(40) }} >
                    <Text style={{ fontSize: normalize(22), color: "#000000", fontWeight: "800" }} > Add Categories & SubCategories</Text>
                </View>
                <View style={{ width: normalize(320), borderBottomWidth: 1, borderColor: "#C5C5C5", marginTop: normalize(25), alignSelf: "center" }} />
                <View style={{ marginLeft: normalize(40), marginTop: normalize(25) }} >
                    <Text style={{ fontSize: normalize(18), fontWeight: '500', color: "#000000" }} >Category Name</Text>
                </View>
                <View style={{ marginLeft: normalize(40), marginTop: normalize(15) }} >
                    <TextInput
                        style={{ height: normalize(40), width: normalize(290), borderWidth: 1, borderColor: "#c5c5c5" }}
                        onChangeText={onChangeText}
                    />
                </View>
                <View style={{ marginLeft: normalize(40), marginTop: normalize(25) }} >
                    <Text style={{ fontSize: normalize(18), fontWeight: '500', color: "#000000" }} >Category Image</Text>
                </View>
                <View style={{ marginLeft: normalize(40), marginTop: normalize(15), flexDirection: "row" }} >
                    <View style={{ height: normalize(90), width: normalize(120), borderStyle: "dashed", borderWidth: 2, borderColor: "#c5c5c5", justifyContent: "center" }} >
                        <Image source={filePath ? { uri: img } : pic} style={filePath ? { height: normalize(80), width: normalize(80), alignSelf: "center" } : { height: normalize(20), width: normalize(20), alignSelf: "center" }} />
                    </View>
                    <TouchableOpacity style={{ height: normalize(40), width: normalize(120), backgroundColor: "#00a1e4", marginLeft: normalize(50), marginTop: normalize(30), justifyContent: "center" }} onPress={chooseFile}>
                        <Text style={{ color: "#FFFFFF", fontSize: normalize(16), fontWeight: "500", textAlign: "center" }} >Choose File</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginLeft: normalize(40), marginTop: normalize(25) }} >
                    <Text style={{ fontSize: normalize(18), fontWeight: '500', color: "#000000" }} >Category Sub-Categories</Text>
                </View>
                <View style={{ marginLeft: normalize(40), marginTop: normalize(15), flexDirection: "row" }} >
                    <Text style={{ fontSize: normalize(18), fontWeight: "500", }} > Click to Add Sub Categories </Text>
                    <TouchableOpacity style={{ alignSelf: 'center', marginLeft: normalize(15) }} onPress={handleAdd} >
                        <Image source={add_but} style={{ height: normalize(30), width: normalize(30), tintColor: "#00a1e4" }} />
                    </TouchableOpacity>
                </View>

                <>
                    {
                        val.map((data, i) => {
                            return (
                                <View style={{ marginLeft: normalize(40), marginTop: normalize(15), flexDirection: "row" }} >
                                    <TextInput
                                        style={{ height: normalize(45), width: normalize(250), borderWidth: 1, borderColor: "#c5c5c5" }}
                                        onChangeText={e => onChangeSub(e, i)}
                                        value = {data}
                                    />
                                    <TouchableOpacity style={{ alignSelf: 'center', marginLeft: normalize(15) }} onPress={() => handleDelete(i)} >
                                        <Image source={minus_but} style={{ height: normalize(30), width: normalize(30), tintColor: "#00a1e4" }} />
                                    </TouchableOpacity>
                                </View>
                            )
                        })
                    }
                </>

                <TouchableOpacity style={{ height: normalize(50), width: normalize(290), backgroundColor: "#00a1e4", alignSelf: "center", marginTop: normalize(50), justifyContent: "center" }} onPress={Add} >
                    <Text style={{ color: "#FFFFFF", fontSize: normalize(18), fontWeight: "600", textAlign: "center" }} >Add</Text>
                </TouchableOpacity>
            </ScrollView>
        </>
    )
}

{/* <View style={{ marginLeft: normalize(40), marginTop: normalize(15), flexDirection: "row" }} >
<TextInput
    style={{ height: normalize(45), width: normalize(250), borderWidth: 1, borderColor: "#c5c5c5" }}
    onChangeText={onChangeSub}
/>
<View style={{ alignSelf: 'center', marginLeft: normalize(15) }} >
    <Image source={add_but} style={{ height: normalize(30), width: normalize(30), tintColor: "#00a1e4" }} />
</View>
</View>
<View style={{ marginLeft: normalize(40), marginTop: normalize(15), flexDirection: "row" }} >
<TextInput
    style={{ height: normalize(45), width: normalize(250), borderWidth: 1, borderColor: "#c5c5c5" }}
    onChangeText={onChangeText}
/>
<View style={{ alignSelf: "center", marginLeft: normalize(15) }}>
    <Image source={minus_but} style={{ height: normalize(30), width: normalize(30), tintColor: "#C5C5C5" }} />
</View>
</View> */}