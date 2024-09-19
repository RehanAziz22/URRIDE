import { View, Text, Modal, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import imagePath from '../constants/imagePath';
import styles from '../style';
import { useNavigation } from '@react-navigation/native';

const BIkeDetailsModal = (props) => {
  let { selectedBike, close, open } = props;
  // console.log(selectedBike)
  let reqestClose = () => {
    close(false)
  }
  const navigation = useNavigation()


  // Function to determine the icon name based on fuel level
  const getBatteryIcon = (fuelLevel) => {
    if (fuelLevel > 80) return 'battery-full';
    if (fuelLevel > 60) return 'battery-6-bar';
    if (fuelLevel > 40) return 'battery-5-bar';
    if (fuelLevel > 20) return 'battery-4-bar';
    if (fuelLevel > 0) return 'battery-3-bar';
    return 'battery-0-bar';
  }

  // Function to determine the icon color based on fuel level
  const getBatteryColor = (fuelLevel) => {
    if (fuelLevel > 60) return 'green';
    if (fuelLevel > 20) return 'orange';
    return 'red';
  }

  const batteryIcon = getBatteryIcon(selectedBike?.fuelLevel);
  const batteryColor = getBatteryColor(selectedBike?.fuelLevel);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      onRequestClose={reqestClose}
      visible={open}
      style={{ zIndex: 100 }}

    >
      <TouchableOpacity style={customStyles.modalContainer}  onPress={reqestClose}>
        <View style={customStyles.modalInner}>
          <View style={[styles.border2,styles.w20,styles.borderGrey,{alignSelf:'center'}]}></View>
          <View style={[styles.p2, styles.my2, styles.border2, styles.borderGrey, styles.rounded,{backgroundColor: "#F5F5F5"}]}>

            <View style={[styles.flexRow, styles.alignItemsCenter, styles.justifyContentBetween]}>
              <View>
                {/* <Text style={[styles.fs3, styles.textBold, styles.textBlack]}>Bike Information</Text> */}
                <View style={[styles.flexRow, styles.mt1]}>
                  {/* <Icon name='pin' size={25} color={'black'} /> */}
                  <Text style={[[styles.fs1, styles.mx1, styles.textBlack, styles.textBold]]}>{selectedBike?.plateNo}</Text>
                </View>
                <View style={[styles.flexRow, styles.mt1]}>
                  {/* <Icon name='two-wheeler' size={25} color={'black'} /> */}
                  <Text style={[styles.fs3, styles.mx1, styles.textBlack]}>{selectedBike?.model}</Text>
                </View>
                <View style={[styles.flexRow, styles.mt1, styles.alignItemsCenter]}>
                  <Icon name={batteryIcon} size={35} color={batteryColor} />
                  <Text style={[styles.fs3, styles.textBlack]}>{((selectedBike?.fuelLevel / 100) * selectedBike.fuelEfficiency * selectedBike.fuelTankCapacity).toFixed(1)} Km</Text>
                </View>
                {/* <View style={[styles.flexRow, styles.mt1]}>
                  <Icon name='battery-low' size={25} color={'black'} />
                  <Text style={[styles.fs5, styles.mx1, styles.textBlack]}>{selectedBike?.status}</Text>
                </View> */}
              </View>
              <View style={[styles.shadow5]}>

                <Image source={imagePath.icBike} style={[{ width: 120, height: 120 }]} />
              </View>
            </View>
          </View>
          {/* <View style={[styles.bgLight, styles.px3, styles.py2]}>

            <View style={[styles.bgWhite, styles.rounded, styles.shadow2, styles.p2, styles.m1]}>
              -------------------- Issue with a recent ride-------------------------------------
              <TouchableOpacity onPress={() => navigation.navigate('editName')} style={[styles.flexRow, styles.justifyContentAround, styles.alignItemsCenter,]}>
                <Icon name='credit-card' size={50} color={"black"} />
                <Text style={[styles.fs4, styles.textBlack]}>Make Payment</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.bgWhite, styles.rounded, styles.shadow2, styles.p2, styles.m1]}>
              -------------------- Issue with a recent ride-------------------------------------
              <TouchableOpacity onPress={() => navigation.navigate('editName')} style={[styles.flexRow, styles.justifyContentAround, styles.alignItemsCenter,]}>
                <Icon name='credit-card' size={50} color={"black"} />
                <Text style={[styles.fs4, styles.textBlack]}>Make Payment</Text>
              </TouchableOpacity>
            </View>

          </View> */}
          <View style={[styles.py2, styles.w100]}>

            <TouchableOpacity onPress={() => navigation.navigate('QRScanScreen')} style={[styles.btn]}>
              <Text style={[styles.fs4, styles.textWhite]}>Scan to Ride</Text>
            </TouchableOpacity>

          </View>
        </View>

      </TouchableOpacity>
    </Modal>
  )
}
const customStyles = StyleSheet.create({

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalInner: {
    backgroundColor: '#fff',
    width: '97%',
    // height: '90%',
    padding: 20,
    position: 'absolute',
    bottom: 0,
    borderRadius: 10,
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
export default BIkeDetailsModal