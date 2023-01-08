import React from 'react';
import { Provider } from 'react-redux';
import { View, Text, Image } from "react-native"
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CategoryList from './src/screens/CategoryList';
import CreateCategory from './src/screens/CreateCategory';
import { add, info } from './src/components/icons';
import { normalize } from './src/components/utils';
import Store from "./src/components/redux" 

const Tab = createBottomTabNavigator();

export default function App() {

const { store }  = Store()

  return (
    <Provider store={store} >
    <NavigationContainer >
      <Tab.Navigator screenOptions={{ headerShown: false, tabBarShowLabel: false, tabBarHideOnKeyboard: true }}  >
        <Tab.Screen name="View" component={CategoryList}
          options={{
            tabBarIcon: ({ focused }) => (
              <View>
                <Image source={info} resizeMode='contain' style={{ width: normalize(18), height: normalize(18), alignSelf: "center", tintColor: focused ? "#00a1e4" : "#bebebe" }} />
                <Text style={{ textAlign: 'center', color: focused ? "#00a1e4" : "#bebebe" }}>{"View"} </Text>
              </View>
            )
          }}
        />
        <Tab.Screen name="Add New" component={CreateCategory}
          options={{
            tabBarIcon: ({ focused }) => (
              <View>
                <Image source={add} resizeMode='contain' style={{ width: normalize(18), height: normalize(18), alignSelf: "center", tintColor: focused ? "#00a1e4" : "#bebebe" }} />
                <Text style={{ textAlign: 'center', color: focused ? "#00a1e4" : "#bebebe" }}>{"Add New"} </Text>
              </View>
            )
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
    </Provider>
  );
}