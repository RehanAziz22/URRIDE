import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ToggleBackButton from '../components/ToggleBackButton';
import ToggleDrawerButton from '../components/ToggleDrawerButton';
import styles from '../style';
import { useNavigation } from '@react-navigation/native';

const History = () => {
    const navigation = useNavigation();
    const [rideHistory, setRideHistory] = useState([]);
    const user = useSelector((state) => state.user);

    useEffect(() => {
        // Reverse the ride history array to display the most recent rides first
        setRideHistory(user.rideHistory.slice().reverse());
    }, [user]);

    const getFormattedTime = (date) => {
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12;
        hours = hours ? hours : 12; // The hour '0' should be '12'

        const minutesFormatted = minutes < 10 ? '0' + minutes : minutes;

        return `${hours}:${minutesFormatted} ${ampm}`;
    };

    return (
        <View style={[styles.bgLight, { flex: 1 }]}>
            <ToggleBackButton />
            <ToggleDrawerButton />
            <View style={{ flex: 1, paddingTop: 90, paddingHorizontal: 30 }}>
                <Text style={[styles.textBold, styles.fs1, styles.textBlack]}>Ride History</Text>
                <ScrollView style={[styles.my1]}>
                    {rideHistory.map((ride, index) => {
                        const date = new Date(ride.startTime);
                        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", 'Nov', "Dec"];
                        const formattedDate = `${months[date.getMonth()]} ${date.getDate()}`;
                        const formattedTime = getFormattedTime(date);

                        return (
                            <TouchableOpacity
                                onPress={() => navigation.navigate('detailedHistory', { ride })}
                                key={index}
                                style={[styles.bgWhite, styles.rounded, styles.shadow2, styles.p2, styles.mt1]}
                            >
                                {/* <View style={[styles.flexRow, styles.justifyContentStart, styles.alignItemsCenter]}>
                                    <Text style={[styles.textAppColor, { fontSize: 15 }]}>{ride._id.slice(0, 5)}...{ride._id.slice(-4)}</Text>
                                </View> */}
                                <View style={[styles.flexRow, styles.justifyContentBetween, styles.alignItemsCenter]}>

                                    <Text style={[styles.textBlack, { fontSize: 15, marginLeft: -7 }]}>  {formattedDate}, {formattedTime}</Text>
                                    <Text style={[styles.textAppColor, styles.fs1, styles.textBold]}>Rs {ride.price}</Text>
                                </View>
                                <View style={[styles.flexRow, styles.justifyContentBetween, styles.alignItemsCenter]}>
                                    <Text style={[styles.textBlack, styles.textBold, { fontSize: 15 }]}>Ride Id</Text>
                                    <Text style={[styles.textAppColor, { fontSize: 15 }]}>{ride._id.slice(-8).toUpperCase()}</Text>
                                </View>
                                    <View style={[styles.flexRow, styles.justifyContentBetween, styles.alignItemsCenter]}>
                                    <Text style={[styles.textBlack, styles.textBold, { fontSize: 15 }]}>Plate No</Text>
                                    <Text style={[styles.textBlack, { fontSize: 15 }]}>{ride.plateNo}</Text>
                                </View>
                                <View style={[styles.flexRow, styles.justifyContentBetween, styles.alignItemsCenter]}>
                                    <Text style={[styles.textBlack, styles.textBold, { fontSize: 15 }]}>Total Ride Time</Text>
                                    <Text style={[styles.textBlack, { fontSize: 15 }]}>{ride.duration} min</Text>
                                </View>
                                <View style={[styles.flexRow, styles.justifyContentBetween, styles.alignItemsCenter]}>
                                    <Text style={[styles.textBlack, styles.textBold, { fontSize: 15 }]}>Total Distance</Text>
                                    <Text style={[styles.textBlack, { fontSize: 15 }]}>{ride.distance} Km</Text>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>
        </View>
    );
};

export default History;
