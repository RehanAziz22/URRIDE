import { View, Text, TouchableOpacity, ActivityIndicator, ToastAndroid, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import styles from '../style';
import { useDispatch, useSelector } from 'react-redux';
import { addBike } from '../store/slices/BikeSlice';
import axios from 'axios';
import { BASE_URL } from '../../config';
import { useNavigation } from '@react-navigation/native';
import { addUser } from '../store/slices/UserSlice';
const QRScanScreen = (props) => {

    const dispatch = useDispatch()
    const navigation = useNavigation()
    const [plateNo, setPlateNo] = useState("")
    const [isLoading, setLoader] = useState(false);
    const [error, setError] = useState(null);
    const [bike, setBike] = useState()
    const [flashEnabled, setFlashEnabled] = useState(false);
    const user = useSelector((state) => {
        return state.user;
    })

    useEffect(() => {
        setError('')
        setLoader('')

    }, [])



    let scanQR = () => {
        setLoader(true);
        setError(null);
        axios.get(`${BASE_URL}bikes`, { timeout: 10000 })
            .then((response) => {
                const filteredBike = response.data.filter(bike => bike.plateNo === plateNo);

                setBike(filteredBike[0])
                // console.log(filteredBike[0])
                dispatch(addBike(filteredBike[0]))
                updateBikeUser(filteredBike[0])
                setLoader(false);
                setError('')
            }).catch((error) => {
                setError(error || "Error fetching bike:");
                setLoader(false);
                console.log(error)
            });



    }

    const updateBikeUser = (filteredBike) => {
        console.log("user updating", user._id);
        console.log("bike id", filteredBike._id)

        const objToSend = {
            // status: "in_use",
            // markerVisible: false,
            rentedBy: user._id,
            rideStartEnd: true
        };


        axios
            .put(`${BASE_URL}bike/${filteredBike._id}`, objToSend)
            .then((response) => {
                const { success, message, data } = response.data;
                if (success) {
                    updateUserDetails()
                    setBike(data)
                    dispatch(addBike(data))
                    navigation.navigate('RideStartScreenMap'); // Ensure navigation is done with props
                    ToastAndroid.show(message, ToastAndroid.SHORT);
                    setLoader(false);
                    console.log("========================================", data, "=====> loc updated data")
                } else {
                    setError(message);
                    console.log(error);
                    setLoader(false);
                }
            })
            .catch((error) => {
                console.error(error);
                setError("An error occurred while updating the bike information.");
                setLoader(false);
            });
    }

    const updateUserDetails = () => {
        const objToSend = {
            id: user._id,
            mobileNumber: user.mobileNumber,
            plateNo: plateNo,
        };

        axios.put(`${BASE_URL}user`, objToSend)
            .then((res) => {
                console.log(res.data, "response");
                const { status, message, data } = res.data
                if (status) {
                    //true
                    console.log(res.data)
                    ToastAndroid.show(message, ToastAndroid.SHORT)
                    dispatch(addUser(data))
                    dispatch(removeBike())
                    setLoader(false)
                } else {
                    //false
                    console.log(res.data.message)
                    // alert(res.data.message)
                    setError(res.data.message)
                    setLoader(false)

                }
            }
            ).catch(
                (error) => { console.log(error, "error") }
            )
    }



    return (
        <View style={[styles.w100, styles.h100, styles.alignItemsCenter, styles.justifyContentCenter]}>
            {/* <View style={[styles.h40, styles.w70, styles.bgGrey]}>

            </View> */}
            <QRCodeScanner
                onRead={({ data }) => {
                    setPlateNo(data);
                    scanQR(data);  // Automatically call scanQR when a QR code is scanned
                }}
                flashMode={flashEnabled ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}
                reactivate={true}
                reactivateTimeout={1000}
            />
            {isLoading ? <ActivityIndicator color={'blue'} size={40} />:
            <Text style={[styles.fs3,styles.textBold,styles.textBlack]}>{plateNo}</Text>
            }
            <Button
                title={flashEnabled ? "Turn Flash Off" : "Turn Flash On"}
                onPress={() => setFlashEnabled(!flashEnabled)}
            />
            {/* <Button onPress={scanQR} title='Continue'/> */}
        </View>
    )
}

export default QRScanScreen