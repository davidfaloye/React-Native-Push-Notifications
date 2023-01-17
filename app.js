import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';

Notifications.setNotificationHandler({handleNotification:async ()=>({
  shouldShowAlert: true,
  shouldPlaySound: true,
  shouldSetBadge: false,
})
})


export default function App() {
  const [expotoken,setExpoToken]=useState("");
  const [notification,setNotification]=useState(false);
  const notificationListener =useRef()
  const responseListener =useRef();

  useEffect(()=>{
    registerForPushNotificationsAsync().then((token)=>{
      setExpoToken(token)
    });
    
     // This listener is fired whenever a notification is received while the app is foregrounded
     notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  },[]);


  


  return (
    <View style={styles.container}>
      <Text style={{color:'#fff'}}>Open up App.js the starts you working on your app!</Text>
      <Text style={{color:"cyan", paddingVertical:10}}>This is your token {expotoken}</Text>

      <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical:20}}>
        <Text style={{color:'#fff'}}>Title: {notification && notification.request.content.title} </Text>
        <Text style={{color:'#fff'}}>Body: {notification && notification.request.content.body}</Text>
        <Text style={{color:'#fff'}}>Name: {notification && notification.request.content.data.name}</Text>
        <Text style={{color:'#fff'}}>Age: {notification && notification.request.content.data.age}</Text>
      </View>
      

      <Button title='Send Push Notification' onPress={async function(){await sendPushNotification(expotoken)}} />

      <StatusBar style="auto" />
      
    </View>
  );
}


// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.dev/notifications
async function sendPushNotification(deviceToken) {
  const message = {
    to: deviceToken,
    sound: 'default',
    title: 'Hey Evelyn',
    body: 'Jesus loves You!',
    data: { name:"Tobi",age:27 },
  };

  await fetch('https://...fetcher.php', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  }).then(res=>res.text()).then(data=>console.log(data));
}


async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
    //f9QkpuzJR4yt6T3nv0pKcx:APA91bFwlZRVXDTAKasAaOtVlbJlZO6QmC-mLqG7cLaNRCLowVU7GLoq1GqtDks5qrsPTxPamjbyGGhMpPTMRPApT-gKAleyOLd5Ymv6eOeKbtGhEa2SnmhdVfQ_MtMH3H80x4pL5fym
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
