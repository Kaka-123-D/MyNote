import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Constants from "expo-constants";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { connect } from 'react-redux'
import { useState } from "react";
import FlashMessage from 'react-native-flash-message'

import BackButton from "../components/BackButton";
import DropDownOfSync from "../components/DropDownOfSync";
import { logout, uploadData, downloadData, resetMes } from '../redux/reducers/Auth'

function Settings({ navigation, auth, logout, uploadData, downloadData, folders, notes, resetMes }) {
  const [isOpenDropDown, setIsOpenDropDown] = useState(false)

  const settingRefMes = React.useRef()

  React.useEffect(() => {
    if (auth.mes.type === 'uploadData' || auth.mes.type === 'downloadData') {
      if (auth.mes.status === 1) {
        settingRefMes.current.showMessage({
          message: auth.mes.content,
          type: 'success',
          duration: 500
        })
        resetMes()
      }
      if (auth.mes.status === 0) {
        settingRefMes.current.showMessage({
          message: auth.mes.content,
          type: 'danger',
          duration: 500
        })
        resetMes()
      }
    }
  }, [auth.mes.status])

  const handleBackPress = () => {
    navigation.goBack();
  }
  const handleLoginPress = () => {
    if (auth.isLogin) {
      handleToggleDropDown()
    } else {
      navigation.navigate("Login");
    }
  }
  const handleToggleDropDown = () => {
    setIsOpenDropDown(!isOpenDropDown)
  }
  const handleLogout = () => {
    logout()
  }
  const handleUploadData = () => {
    uploadData(folders, notes)
  }
  const handleDownloadData = () => {
    downloadData()
  }

  return (
    <View style={styles.container}>
      <BackButton style={styles.backButton} onBackPress={handleBackPress} />
      <DropDownOfSync 
        isOpen={isOpenDropDown} 
        setIsOpen={handleToggleDropDown} 
        onLogoutPress={handleLogout} 
        onUploadPress={handleUploadData}
        onDownloadPress={handleDownloadData}
        isStopLoading={auth.mes.status !== null ? true : false}
      />
      <Text style={styles.header}>Ghi ch??</Text>
      <View>
        <Text style={styles.title}>PHONG C??CH</Text>
        <View style={styles.settingRow}>
          <Text style={styles.setting}>C??? ch???</Text>
          <Text style={{ flex: 3, opacity: 0.5 }}>V???a</Text>
          <MaterialCommunityIcons
            name="menu-swap-outline"
            size={30}
            color="#000"
            style={styles.icon}
          />
        </View>
        <View style={styles.settingRow}>
          <Text style={styles.setting}>S???p x???p</Text>
          <Text style={{ flex: 3, opacity: 0.5 }}>Theo ng??y ch???nh s???a</Text>
          <MaterialCommunityIcons
            name="menu-swap-outline"
            size={30}
            color="#000"
            style={styles.icon}
          />
        </View>
      </View>
      <View>
        <Text style={styles.title}>?????NG B??? H??A</Text>
        <TouchableOpacity onPress={handleLoginPress} style={styles.settingRow}>
          <Text style={styles.setting}>{auth.isLogin ? auth.username : '????ng nh???p'}</Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={30}
            color="#000"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.title}>NH???C NH???</Text>
        <View style={styles.settingRow}>
          <View style={{ flex: 4 }}>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              Nh???c nh??? ??u ti??n cao
            </Text>
            <Text style={{ fontStyle: "italic", fontSize: 15, opacity: 0.5 }}>
              Ph??t ??m thanh ngay c??? khi im l???ng ho???c ch??? ????? Kh??ng l??m phi???n b???t
            </Text>
          </View>
          <MaterialCommunityIcons
            name="toggle-switch-off-outline"
            size={60}
            color="#000"
            style={styles.icon}
          />
          {/* <MaterialCommunityIcons name="toggle-switch" size={30} color="#000" /> */}
        </View>
      </View>
      <View>
        <Text style={styles.title}>KH??C</Text>
        <Pressable style={styles.settingRow}>
          <Text style={styles.setting}>Ch??nh s??ch ri??ng t??</Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={30}
            color="#000"
            style={styles.icon}
          />
        </Pressable>
        <Pressable style={styles.settingRow}>
          <Text style={styles.setting}>V??? ch??ng t??i</Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={30}
            color="#000"
            style={styles.icon}
          />
        </Pressable>
      </View>
      <FlashMessage position='top' ref={settingRefMes} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    backgroundColor: "#f7f7f7",
    fontFamily: "Nunito",
  },
  backButton: {
    position: "absolute",
    top: Constants.statusBarHeight + 5,
    left: 6,
  },
  header: {
    fontSize: 35,
    fontWeight: "400",
    marginTop: Constants.statusBarHeight + 50,
  },
  title: {
    fontSize: 15,
    color: "#000000",
    opacity: 0.5,
    fontWeight: "300",
    marginTop: 35,
  },
  settingRow: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  setting: {
    fontWeight: "bold",
    fontSize: 20,
    flex: 10,
  },
  icon: {
    flex: 1,
  },
});

const mapStateToProps = state => ({
  auth: state.auth,
  folders: state.folder.folderList,
  notes: state.note.noteList,
})

const mapActionToProps = {
  logout,
  uploadData,
  downloadData,
  resetMes
}

export default connect(mapStateToProps, mapActionToProps)(Settings)