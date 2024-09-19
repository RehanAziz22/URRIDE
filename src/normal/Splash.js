import { View, Text, Image, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from '../style'
import { useSelector } from 'react-redux'

const Splash = ({ navigation }) => {
  // const bike = useSelector(state => state.bike);
  // const [bikes, setBikes] = useState([]);
  let [isloading, setLoader] = useState(true)
  // let [error, setError] = useState()
  const data = useSelector((state) => {
    return state.user;
  })
 
  useEffect(() => {
    setTimeout(() => {
      if(!data=={}){
        navigation.navigate('Parent')
      }else{
        navigation.navigate('Login')
        // navigation.navigate('QRScanner')
        // navigation.navigate('Parent')
      }
    }, 2000)
  }, [])

  return (
    <View style={[styles.flexCenter, styles.bgWhite, styles._black, styles.textBlack, styles.w100, styles.h100]}>
      <Image source={{ uri: "https://thumbs.dreamstime.com/b/classic-blue-speed-motorcycle-travel-adventure-vector-illustration-vehicle-motorbike-design-label-emblem-flat-225428982.jpg" }} style={{ width: 300, height: 300 }} />
      <View style={[styles.flexRow, styles.alignItemsCenter, styles.justifyContentBetween]}>
        <Text style={[styles.textAppColor, styles.fs1, styles.textBold, styles.textCenter,{fontSize:50}]}>URRIDE</Text>
        {/* <Icon color={styles._danger} size={40} style={[styles.mx1]} name="airport-shuttle"/> */}
      </View>
      <Text style={[styles.textBlack, styles.textBold, styles.fs5, styles.mt2, styles.w50, styles.textCenter]}>book your bike and
        you are ready to go!</Text>

      {/* {error && } */}
      <Text style={[styles.textDanger, styles.textBold, styles.fs5, styles.mt2, styles.w50, styles.textCenter]}>
        {isloading ? <ActivityIndicator color={styles._info} size={"small"} /> : ""}
      </Text>

    </View>
  )
}

export default Splash