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
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [plateNo, setPlateNo] = useState("TRQ-010");
    const [isLoading, setLoader] = useState(false);
    const [error, setError] = useState(null);
    const [bike, setBike] = useState();
    const [flashEnabled, setFlashEnabled] = useState(false);
    const user = useSelector((state) => state.user);

    useEffect(() => {
        setError('');
        setLoader('');
    }, []);

    let scanQR = (scannedPlateNo) => {
        setLoader(true);
        setError(null);
        axios.get(`${BASE_URL}bikes`, { timeout: 10000 })
            .then((response) => {
                const filteredBike = response.data.filter(bike => bike.plateNo === scannedPlateNo);

                setBike(filteredBike[0]);
                dispatch(addBike(filteredBike[0]));
                updateBikeUser(filteredBike[0]);
                updateUserDetails(scannedPlateNo);
                setLoader(false);
                setError('');
            }).catch((error) => {
                setError(error || "Error fetching bike:");
                setLoader(false);
                console.log(error);
            });
    };

    const updateBikeUser = (filteredBike) => {
        const objToSend = {
            rentedBy: user._id,
            rideStartEnd: true,
        };

        axios
            .put(`${BASE_URL}bike/${filteredBike._id}`, objToSend)
            .then((response) => {
                const { success, message, data } = response.data;
                if (success) {
                    setBike(data);
                    dispatch(addBike(data));
                    navigation.navigate('rideStart');
                    ToastAndroid.show(message, ToastAndroid.SHORT);
                    setLoader(false);
                } else {
                    setError(message);
                    setLoader(false);
                }
            })
            .catch((error) => {
                console.error(error);
                setError("An error occurred while updating the bike information.");
                setLoader(false);
            });
    };

    const updateUserDetails = (scannedPlateNo) => {
        const objToSend = {
            id: user._id,
            mobileNumber: user.mobileNumber,
            plateNo: scannedPlateNo,
        };

        axios.put(`${BASE_URL}user`, objToSend)
            .then((res) => {
                const { status, message, data } = res.data;
                if (status) {
                    ToastAndroid.show(message, ToastAndroid.SHORT);
                    dispatch(addUser(data));
                    setLoader(false);
                    navigation.navigate('Parent');
                } else {
                    setError(res.data.message);
                    setLoader(false);
                }
            })
            .catch((error) => {
                console.log(error, "error");
                setLoader(false);
            });
    };

    return (
        <View style={[styles.w100, styles.h100, styles.alignItemsCenter, styles.justifyContentCenter]}>
            {/* <QRCodeScanner
                onRead={({ data }) => {
                    setPlateNo(data);
                    scanQR(data);  // Automatically call scanQR when a QR code is scanned
                }}
                flashMode={flashEnabled ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}
                reactivate={true}
                reactivateTimeout={500}
            />
            <Button
                title={flashEnabled ? "Turn Flash Off" : "Turn Flash On"}
                onPress={() => setFlashEnabled(!flashEnabled)}
            /> */}
            <View style={[styles.h40, styles.w70, styles.bgGrey]}>

            </View>
            <Text style={[styles.fs3]}>{plateNo}</Text>
            {isLoading && <ActivityIndicator color={'blue'} size={40} />}
            <Button onPress={scanQR} title='Continue'/>
               
        </View>
    );
};

export default QRScanScreen;
