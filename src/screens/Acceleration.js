import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
  AsyncStorage,
  ActivityIndicator
} from "react-native";
import moment from "moment";

import AccelerationItem from "../components/AccelerationItem";
import axios from "axios";

const accelerations = [
  {
    slug: "reactnative-online-1",
    name: "React Native",
    is_disabled: false,
    subscription_start_at: "2019-07-08T00:00:00-03:00",
    subscription_finish_at: "2019-07-28T23:59:59-03:00",
    start_at: "2019-08-17T00:00:00-03:00",
    finish_at: "2019-11-03T00:00:00-03:00",
    location: "Online",
    banner_url:
      "https://s3-us-west-1.amazonaws.com/acceleration-assets-highway/reactnative-online-1/banner.jpg",
    home_banner_url: "",
    color_scheme: "7800FF",
    company_count: 1
  },
  {
    slug: "adxp-datascience-joinville-1",
    name: "ADxp Data Science",
    is_disabled: false,
    subscription_start_at: "2019-07-09T00:00:00-03:00",
    subscription_finish_at: "2019-08-19T00:00:00-03:00",
    start_at: "2019-08-19T00:00:00-03:00",
    finish_at: "2019-10-23T23:59:59-03:00",
    location: "DevHub Joinville, SC",
    banner_url: "",
    home_banner_url: "",
    color_scheme: "",
    company_count: 1
  },
  {
    slug: "adxp-datascience-joinville-2",
    name: "ADxp Data Science",
    is_disabled: false,
    subscription_start_at: "2019-07-09T00:00:00-03:00",
    subscription_finish_at: "2019-08-20T00:00:00-03:00",
    start_at: "2019-08-20T00:00:00-03:00",
    finish_at: "2019-10-24T23:59:59-03:00",
    location: "DevHub Joinville, SC",
    banner_url: "",
    home_banner_url: "",
    color_scheme: "",
    company_count: 1
  },
  {
    slug: "adxp-datascience-sp-1",
    name: "ADxp Data Science",
    is_disabled: false,
    subscription_start_at: "2019-07-09T00:00:00-03:00",
    subscription_finish_at: "2019-09-23T00:00:00-03:00",
    start_at: "2019-09-23T00:00:00-03:00",
    finish_at: "2019-11-27T23:59:59-03:00",
    location: "a confirmar",
    banner_url: "",
    home_banner_url: "",
    color_scheme: "",
    company_count: 1
  },
  {
    slug: "adxp-datascience-sp-2",
    name: "ADxp Data Science",
    is_disabled: false,
    subscription_start_at: "2019-07-09T00:00:00-03:00",
    subscription_finish_at: "2019-09-24T00:00:00-03:00",
    start_at: "2019-09-24T00:00:00-03:00",
    finish_at: "2019-11-28T23:59:59-03:00",
    location: "a confirmar",
    banner_url: "",
    home_banner_url: "",
    color_scheme: "",
    company_count: 1
  },
  {
    slug: "python-online-1",
    name: "Python Women",
    is_disabled: false,
    subscription_start_at: "2019-07-22T00:00:00-03:00",
    subscription_finish_at: "2019-08-11T23:59:59-03:00",
    start_at: "2019-08-24T00:00:00-03:00",
    finish_at: "2019-11-02T23:59:59-03:00",
    location: "Online",
    banner_url:
      "https://s3-us-west-1.amazonaws.com/acceleration-assets-highway/python-online-1/banner.jpg",
    home_banner_url: "",
    color_scheme: "212133",
    company_count: 1
  }
];

export default class Acceleration extends Component {
  constructor(props) {
    super(props);
    this.state = { isVisible: false };
    this.state = { isLoading: false };
    this._showModal = this._showModal.bind(this);
    this._hideModal = this._hideModal.bind(this);
    this.accelerations = [];
    this.detailsItems = null;
    this.user = null;
  }

  _showModal(item) {
    this.setState({ isVisible: true });
    this.setItemsModal(item);
  }

  _hideModal() {
    this.setState({ isVisible: false });
  }

  setItemsModal(item) {
    this.setState({ detailsItems: item });
  }

  async componentDidMount() {
    this.setState({ isLoading: true });

    const user = AsyncStorage.getItem("user");
    if (user && user.length) {
      this.setState({ user: JSON.parse(user) });
    }

    const res = await axios.get("https://api.codenation.dev/v1/acceleration");

    if (res && res.data) {
      this.setState({ accelerations: res.data, isLoading: false });
    }

    try {
      const user = await AsyncStorage.getItem("user");

      if (user && user.length) {
        this.setState({ user: JSON.parse(user) });
      }
    } catch (e) {
      alert("Não foi possicivel localizar o usuário." + e);
    }
  }

  render() {
    const navigation = this.props.navigation;
    const item = this.state.detailsItems;
    const user = this.state.user;
    const userPicture = user ? user.picture : null;
    const modal = this.state.isVisible ? (
      <Modal
        style={styles.containerModal}
        animationType={"slide"}
        transparent={false}
        Visible={this.state.isVisible}
        onRequestClose={this._hideModal}
        className="modal"
      >
        <Image
          style={styles.itemImage}
          source={{
            uri: item.banner_url
              ? item.banner_url
              : "http://denrakaev.com/wp-content/uploads/2015/03/no-image.png"
          }}
        />
        <View>
          <Text style={styles.textTile}>{item.name}</Text>
          <Text style={styles.textContainer}>Local: {item.location}</Text>
          <Text style={styles.textContainer}>
            Inscrição + desafio enviado até{" "}
            {moment(item.subscription_finish_at).format("DD/MM/YYYY")}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.btnItem}
          onPress={this._hideModal}
          className="close-modal-btn"
        >
          <Text style={styles.btnText}>FECHAR</Text>
        </TouchableOpacity>
      </Modal>
    ) : null;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            style={styles.headerImage}
            source={{
              uri:
                "https://forum.codenation.com.br/uploads/default/original/2X/2/2d2d2a9469f0171e7df2c4ee97f70c555e431e76.png"
            }}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate("Profile")}
            className={"user-image-btn"}
          >
            <Image
              style={styles.profileImage}
              source={{
                uri: userPicture
              }}
            />
          </TouchableOpacity>
        </View>

        {this.state.isLoading && (
          <View style={styles.loadingContent}>
            <ActivityIndicator size="large" color="#7800ff" />
          </View>
        )}
        {!this.state.isLoading && (
          <View>
            <Text style={styles.title}>Acelerações</Text>
            <FlatList
              data={this.state.accelerations}
              keyExtractor={item => item.slug}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  onPress={() => {
                    this._showModal(item);
                  }}
                  className="acceleration-item-btn"
                >
                  <AccelerationItem item={item} />
                </TouchableOpacity>
              )}
            />
          </View>
        )}
        {modal}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    borderBottomColor: "#7800ff",
    borderBottomWidth: 2,
    padding: 16,
    paddingTop: 55
  },
  headerImage: {
    height: 45,
    width: 250
  },
  title: {
    color: "#7800ff",
    fontSize: 30,
    padding: 16
  },
  profileImage: {
    borderRadius: 22,
    height: 45,
    width: 45
  },
  containerModal: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#FFF"
  },
  btnItem: {
    backgroundColor: "#fff",
    borderColor: "#7800ff",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginLeft: 30,
    paddingTop: 10,
    width: 300,
    height: 50
  },
  btnText: {
    textAlign: "center",
    paddingTop: 0
  },
  itemImage: {
    height: 200,
    width: 340,
    margin: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  textTile: {
    fontSize: 22,
    color: "#7800ff",
    marginLeft: 30,
    paddingTop: 5
  },
  textContainer: {
    marginLeft: 30,
    paddingTop: 10,
    textAlign: "left"
  },
  languageContent: {
    alignItems: "center",
    flexDirection: "row"
  }
});
