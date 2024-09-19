import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import ToggleBackButton from '../components/ToggleBackButton';
import ToggleDrawerButton from '../components/ToggleDrawerButton';
import styles from '../style';
import { useRoute } from '@react-navigation/native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import imagePath from '../constants/imagePath';
import Icon from 'react-native-vector-icons/MaterialIcons'

const DetailedHistory = () => {
    const route = useRoute();
    const mapRef = useRef(null);
    const { ride } = route.params;
    const getFormattedTime = (date) => {
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';

        // Convert hours from 24-hour to 12-hour format
        hours = hours % 12;
        hours = hours ? hours : 12; // The hour '0' should be '12'

        // Pad minutes with leading zero if needed
        const minutesFormatted = minutes < 10 ? '0' + minutes : minutes;

        return `${hours}:${minutesFormatted} ${ampm}`;
    };
    // console.log(ride)
    const date = new Date(ride.startTime);
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", 'Nov', "Dec"]
    const formattedDate = months[date.getMonth()] + " " + date.getDate()  // e.g., "8/28/2024"
    const formattedTime = getFormattedTime(date);
    const [state, setState] = useState({
        pickuplocationCords: {
            latitude: ride.pickUpCoordinates[0],
            longitude: ride.pickUpCoordinates[1],
            // latitude: 24.85596976481587, longitude: 67.01026478891055,
            latitudeDelta: 0.03,
            longitudeDelta: 0.0121,
        },
        droplocationCords: {
            latitude: ride.destinationCoordinates[0],
            longitude: ride.destinationCoordinates[1],
            // latitude: 24.856359163996004, longitude: 67.03034916877843,
            latitudeDelta: 0.03,
            longitudeDelta: 0.0121,
        },
    })
    const { pickuplocationCords, droplocationCords, } = state;
    useEffect(() => {
        if (mapRef.current) {
            mapRef.current.fitToCoordinates(
                [pickuplocationCords, droplocationCords],
                {
                    edgePadding: { top: 50, right: 20, bottom: 50, left: 20 },
                    animated: true,
                }
            );
        }
    }, [pickuplocationCords, droplocationCords]);
    return (
        <View style={[styles.bgLight, { flex: 1, }]}>
            <ToggleBackButton />
            <ToggleDrawerButton />
            <View style={[styles.p3,{ flex: 1, }]}>
                {/* <View style={[]}> */}
                    {/* ----------------------------- Card (edit name email------------------------------) */}
                    <View style={[styles.bgWhite, styles.rounded, styles.shadow2, styles.px2,styles.py1,styles.mt5, styles.alignItemsCenter]}>
                <Text style={[styles.textBold, styles.fs3, styles.textBlack,styles.mb1]}>Ride Details</Text>
                        <View style={[styles.h30, styles.w100]}>

                            <MapView
                                ref={mapRef}
                                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                                style={mapStyles.map}
                                initialRegion={pickuplocationCords}
                            >
                                <Polyline
                                    coordinates={[
                                        state.pickuplocationCords,
                                        state.droplocationCords
                                    ]}
                                    // strokeColor="#4CB1DC"// fallback for when `strokeColors` is not supported by the map-provider
                                    strokeColor="green"// fallback for when `strokeColors` is not supported by the map-provider
                                    strokeWidth={8}

                                    geodesic={true}
                                />
                                <Marker coordinate={pickuplocationCords} title={"pickup location"}></Marker>
                                <Marker coordinate={droplocationCords} title={"Current location"}>
                                    <Image source={imagePath.icBike} style={{ width: 50, height: 50 }} />
                                </Marker>
                            </MapView>
                        </View>


                        <View style={[styles.w100, styles.my2]}>
                            <View style={[styles.flexRow, styles.justifyContentStart, styles.alignItemsCenter]}>
                                <Icon color="green" size={30} name={"share-location"} />
                                <Text style={[styles.textBlack, styles.px1, { fontSize: 15 }]}>{ride.destinationAddress ?? "Drop Address"}</Text>
                            </View>
                            <View style={[styles.flexRow, styles.justifyContentStart, styles.alignItemsCenter]}>
                                <Icon color="red" size={30} name={"my-location"} />
                                <Text style={[styles.textBlack, styles.px1, { fontSize: 15 }]}>{ride.pickUpAddress ?? "Pickup Address"}</Text>
                            </View>
                        </View>
                        <View style={[styles.justifyContentCenter, styles.w100, styles.alignItemsCenter,styles.p1]}>

                            <View style={[styles.w25, styles.px2, styles.borderTop5, styles.borderGrey,]}>
                            </View>
                        </View>
                        <View style={[styles.flexRow, styles.w100, styles.justifyContentBetween, styles.alignItemsCenter]}>
                            <Text style={[styles.textBlack, { fontSize: 15 }]}>Ride ID</Text>
                            <Text style={[styles.textAppColor, { fontSize: 15 }]}>{ride._id.slice(-8).toUpperCase()}</Text>
                        </View>
                        <View style={[styles.flexRow, styles.w100, styles.justifyContentBetween, styles.alignItemsCenter]}>
                       
                                <Text style={[styles.textBlack, { fontSize: 15, }]}>Bike Id </Text>
                          
                            <Text style={[styles.textAppColor, { fontSize: 15,  }]}>{ride.plateNo}</Text>

                        </View>

                        <View style={[styles.flexRow, styles.justifyContentBetween, styles.alignItemsCenter, styles.w100]}>
                            <View style={[styles.alignItemsStart]}>
                                <Text style={[styles.fs4, styles.textBlack, styles.textBold]}>{ride.distance + " Km"}</Text>
                                <Text style={[styles.textGrey, { fontSize: 12 }]}>Total travel distance</Text>
                            </View>
                            <View style={[styles.alignItemsEnd]}>
                                <Text style={[styles.fs4, styles.textBlack, styles.textBold]}>{ride.duration + " min"}</Text>
                                <Text style={[styles.textGrey, { fontSize: 12 }]}>Total travel time</Text>
                            </View>
                        </View>
                        <View style={[styles.justifyContentCenter, styles.alignItemsCenter, styles.w100, styles.py1]}>
                            <Text style={[styles.fs1, styles.textDanger, styles.textBold]}>{"Rs " + ride.price}</Text>
                            <Text style={[styles.fs5, styles.textGrey, styles.textBold]}>Total Fare</Text>
                        </View>

                        <View style={[styles.flexRow, styles.w100, styles.justifyContentBetween, styles.alignItemsCenter,styles.border1,styles.rounded,styles.borderGrey,styles.p1]}>
                            <View style={[  styles.alignItemsStart]}>
                                <Text style={[styles.textBlack, { fontSize: 12, marginLeft: -7 }]}>  {formattedDate}, {formattedTime}</Text>
                                <Text style={[styles.textBlack, styles.textBold, { fontSize: 12, marginLeft: 2 }]}>Ride Start Time </Text>

                            </View>

                            <View style={[  styles.alignItemsEnd]}>
     
                                <Text style={[styles.textBlack, { fontSize: 12, }]}>  {formattedDate}, {formattedTime}</Text>
                                    <Text style={[styles.textBlack, styles.textBold, { fontSize: 12, marginLeft: 2 }]}>Ride Start Time </Text>
                            </View>
                        </View>

                    </View>
                {/* </View> */}
            </View>
        </View>
    )
}
const mapStyles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: "auto",
        width: "auto",
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    btn: {
        position: 'absolute',
        backgroundColor: '#4CB1DC',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        width: 50,
        height: 50,
    },

    bottomCard: {
        width: "100%",
        padding: 10,
        borderTopEndRadius: 24,
        borderTopStartRadius: 24,
        backgroundColor: "white"

    },
    inputStyle: {
        backgroundColor: "white",
        borderRadius: 4,
        borderWidth: 1,
        alignItems: "center",
        height: 48,
        justifyContent: "center",
        marginTop: 16,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    modalInner: {
        backgroundColor: '#fff',
        width: '97%',
        height: '90%',
        padding: 20,
        position: 'absolute',
        bottom: 0,
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalText: {
        fontSize: 16,
        marginBottom: 5,
        marginLeft: 10,
    },
    modalbtn: {
        backgroundColor: 'lightgrey',
        justifyContent: 'center',
        alignSelf: 'flex-end',
        alignItems: 'center',
        borderRadius: 50,
        width: 40,
        height: 40,
        shadowColor: "rgba(0,0,0,.5)",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,

        elevation: 8,

    },

});
export default DetailedHistory