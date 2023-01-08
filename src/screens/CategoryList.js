import { View, Text, StatusBar, Image, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { normalize } from '../components/utils'
import { down, menu } from '../components/icons'
import { useSelector } from 'react-redux'
// import { useEffect, useF } from 'react'
import { useFocusEffect } from '@react-navigation/native';

export default function CategoryList() {

    const data = useSelector(state => state.category);
    const [dropDown, setDropDown] = useState(false)
    const [cate_id, setCate_id] = useState("")
    const [value, setvalue] = useState();

    console.log("datavalue", value);

    const onCategory = (id) => {
        setCate_id(id)
        setDropDown(true)
        if (dropDown === true) {
            setDropDown(false)
        }
    }

    const getDetails = async () => {
        fetch('https://dmapi.ipaypro.co/app_task/categories')
            .then((response) => response.json())
            .then((data) => setvalue(data.result));
        console.log("datafrom get datails", data)
    }

    useFocusEffect(() => {
        getDetails()
    },[data])

    const sub_renderItem = ({ item }) => (
        // console.log("sub data",item)
        <>
            <View style={{ marginBottom: normalize(10), flexDirection: "row", justifyContent: "space-around" }}>
                <View style={{ width: normalize(120) }}>
                    <Text style={{ fontSize: normalize(18), fontWeight: "500", color: "#000000", top: normalize(22) }} >{item.name}</Text>
                </View>
                <View style={{ height: normalize(23), width: normalize(23), borderRadius: normalize(20), borderColor: "#c5c5c5", borderWidth: 2, alignSelf: "center", top: normalize(22) }} >

                </View>
            </View>
            <View style={{ width: normalize(280), borderBottomWidth: 1, borderColor: "#C5C5C5", marginTop: normalize(20), marginLeft: normalize(20) }} />
        </>

    )

    let Total = data.concat(value)

    console.log("Total", Total)

    const renderItem = ({ item }) => (
        // console.log("data", item)
        <>
            <TouchableOpacity style={{ alignSelf: "center" }} onPress={() => onCategory(item._id)} >
                <View style={{ height: normalize(60), width: normalize(330), borderWidth: 1, borderColor: "#C5C5C5", flexDirection: "row" }} >
                    <View style={{ flexDirection: "row", alignSelf: "center" }} >
                        <Image source={menu} style={{ height: normalize(35), width: normalize(35) }} />
                        <Image source={item.image} style={{ height: normalize(40), width: normalize(40), resizeMode: "contain" }} />
                    </View>
                    <View style={{ justifyContent: "center", marginLeft: normalize(30), width: normalize(150) }} >
                        <Text style={{ fontSize: normalize(18), color: "#000000", fontWeight: "500" }} >{item.category_name}</Text>
                    </View>
                    <View style={{ justifyContent: "center", marginLeft: normalize(20) }}  >
                        <Image source={down} style={{ height: normalize(30), width: normalize(30), transform: [{ rotate: item._id === cate_id && dropDown ? '0deg' : '-90deg' }] }} />
                    </View>
                </View>
            </TouchableOpacity>
            {
                item._id === cate_id && dropDown === true && (
                    <View style={{ width: normalize(330), borderColor: "#c5c5c5", borderWidth: 1, alignSelf: "center" }} >
                        <FlatList
                            data={item.sub_cateries}
                            renderItem={sub_renderItem}
                            keyExtractor={item => item.id}
                        />
                    </View>
                )
            }
        </>
    )

    return (
        <>
            <StatusBar translucent={false} barStyle={"dark-content"} backgroundColor={"#FFFFFF"} />
            <View style={{ flex: 1, backgroundColor: "#ffffff" }} >
                <View style={{ alignSelf: "center", marginTop: normalize(40) }}>
                    <Text style={{ fontSize: normalize(22), color: "#000000", fontWeight: "800" }} >Categories & SubCategories</Text>
                </View>
                <ScrollView style={{ marginTop: normalize(40) }} >
                    <FlatList
                        data={value ? Total : data}
                        renderItem={renderItem}
                        keyExtractor={item => item._id}
                        extraData={cate_id}
                    />
                </ScrollView>
            </View>
        </>
    )
}