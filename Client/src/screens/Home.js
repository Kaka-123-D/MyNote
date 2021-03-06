import { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { SwipeListView, SwipeRow } from "react-native-swipe-list-view";
import Constants from "expo-constants";
import { connect } from "react-redux";

import SettingButton from "../components/SettingButton";
import SearchBar from "../components/SearchBar";
import CheckButton from "../components/CheckButton";
import FolderListItem from "../components/FolderListItem";
import DeleteButton from "../components/DeleteButton";
import DropDownOfFolder from "../components/DropDownOfFolder";
import AntIcons from "react-native-vector-icons/AntDesign";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { deleteFolder, expulsionFolder } from "../redux/reducers/Folder";
import { deleteNoteInFolder, expulsionNoteInFolder } from "../redux/reducers/Note";

const mapStateToProps = (state) => ({
  folderList: state.folder.folderList,
  folderCount: state.folder.folderCount,
});

const mapActionToProps = {
  deleteFolder,
  deleteNoteInFolder,
  expulsionFolder,
  expulsionNoteInFolder
};

function Home({
  navigation,
  folderList,
  folderCount,
  deleteFolder,
  deleteNoteInFolder,
  expulsionFolder,
  expulsionNoteInFolder
}) {
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);
  const [textSearch, setTextSearch] = useState("");

  const handlePressFolderIcon = () => {
    setIsOpenDropDown(!isOpenDropDown);
  };
  const handleCheckButtonPress = () => {
    navigation.navigate("TodoList");
  }
  const handleSettingPress = () => {
    navigation.navigate("Settings");
  };
  const handleRecycleBinPress = () => {
    navigation.navigate("RecycleBin");
  };
  const handleFolderListItemPress = (id, name, isFolderShare) => {
    navigation.navigate("Folder", { name, id, isFolderShare });
  };
  const handleDeleteFolder = (item) => {
    if (item.isFolderShare) {
      expulsionFolder(item.id)
      expulsionNoteInFolder(item.id)
    } else {
      deleteNoteInFolder(item.id);
      deleteFolder(item.id);
    }
  };
  const renderItem = (data, rowMap) => {
    if (
      !data.item.isDeleted &&
      data.item.name.toLowerCase().includes(textSearch.toLowerCase())
    ) {
      return (
        <SwipeRow
          rightOpenValue={-80}
          leftOpenValue={0}
          disableRightSwipe={true}
          style={styles.folderRow}
        >
          <DeleteButton
            style={styles.deleteButton}
            onDeletePress={() => handleDeleteFolder(data.item)}
          />
          <FolderListItem
            style={styles.folderListItem}
            onFolderListItemPress={() =>
              handleFolderListItemPress(data.item.id, data.item.name, data.item.isFolderShare)
            }
            info={data.item}
          />
        </SwipeRow>
      );
    } else return <></>;
  };
  const keyExtractor = (item) => item.id;

  return (
    <View style={styles.container}>
      <DropDownOfFolder
        isOpen={isOpenDropDown}
        setIsOpen={() => handlePressFolderIcon()}
        onRecycleBinPress={handleRecycleBinPress}
      />
      <SettingButton
        style={styles.settingButton}
        onSettingPress={handleSettingPress}
      />
      <View style={styles.headerIcon}>
        <View style={styles.folderButton}>
          <TouchableOpacity onPress={() => handlePressFolderIcon()}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <MaterialIcons name="folder" size={30} color="#000" />
            <MaterialIcons name="arrow-drop-down" size={20} color="#000" />
            </View>
          </TouchableOpacity>
        </View>
        <CheckButton name="checksquareo" style={styles.checkButton} onCheckButtonPress={() => handleCheckButtonPress()}/>
      </View>
      <SearchBar style={styles.searchBar} textSearch={textSearch} setTextSearch={setTextSearch} />
      {folderCount === 0 ? (
        <View>
          <Image
            source={require("../public/emptyNote.png")}
            style={styles.emptyNoteImage}
          />
          <Text style={{ textAlign: "center" }}>
            Kh??ng co?? ghi chu?? na??o ???? ????y
          </Text>
        </View>
      ) : (
        <SwipeListView
          data={folderList}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      )}
    </View>
  );
}

// height: 667
// width: 375

const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: "#f7f7f7",
    flex: 1,
    paddingHorizontal: 25,
  },
  settingButton: {
    position: "absolute",
    top: Constants.statusBarHeight + 5,
    right: 15,
    zIndex: 1,
  },
  headerIcon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: Constants.statusBarHeight + 10,
  },
  searchBar: {
    marginTop: 40,
  },
  folderButton: {
    paddingHorizontal: 8,
  },
  checkButton: {
    paddingHorizontal: 8,
  },
  emptyNoteImage: {
    width: 211,
    height: 173,
    marginTop: 100,
    marginLeft: 80,
  },
  deleteButton: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  folderListItem: {},
  folderRow: {
    marginTop: 20,
  },
});

export default connect(mapStateToProps, mapActionToProps)(Home);
