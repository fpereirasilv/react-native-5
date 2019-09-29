import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  AsyncStorage,
  Image,
  ImageBackground,
  Button
} from "react-native";
import axios from "axios";

export default class Login extends Component {
  state = {
    email: "",
    password: "",
    isLoading: false,
    data: []
  };

  handleEmail = text => {
    this.setState({ email: text });
  };

  handlePassword = text => {
    this.setState({ password: text });
  };

  handleLogar = navigation => {
    const email = this.state.email;
    const pass = this.state.password;

    const baseURL = "https://api.codenation.dev/v1/user/auth";

    this.setState({
      isLoading: true
    });

    axios
      .post(baseURL, {
        email: email,
        password: pass
      })
      .then(response => {
        if (response.data && response.data.token) {
          this.setState({
            isLoading: true,
            data: response.data
          });
          navigation.navigate("Acceleration");
          return AsyncStorage.setItem("user", JSON.stringify(response.data));
        } else {
          this.setState({
            isLoading: false,
            data: response.data
          });
        }
      })
      .catch(error => {
        alert("Message: " + error);
      });
  };

  async componentDidMount() {
    const user = await AsyncStorage.getItem("user");
    if (user && user.length) {
      this.props.navigation.navigate("Acceleration");
    }
  }

  emailTest(email) {
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  }

  render() {
    const navigation = this.props.navigation;
    let _handleDisable = true;
    if (
      !this.isLoading &&
      this.state.password.length &&
      this.state.email.length &&
      this.emailTest(this.state.email)
    ) {
      _handleDisable = false;
    }

    return (
      <ImageBackground
        source={require("../../assets/_back.jpg")}
        style={styles.imageBack}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Image
              className="header-image"
              style={styles.headerImage}
              source={{
                uri:
                  "https://forum.codenation.com.br/uploads/default/original/2X/2/2d2d2a9469f0171e7df2c4ee97f70c555e431e76.png"
              }}
            />
          </View>
          <View style={styles.containerBody}>
            <TextInput
              className="email-input"
              style={styles.inputBox}
              onChangeText={text => {
                this.handleEmail(text);
              }}
              autoCapitalize="none"
              autoCompleteType="email"
              keyboardType="email-address"
              underlineColorAndroid="rgba(0,0,0,0)"
              placeholder="Email"
              placeholderTextColor="#002f6c"
              selectionColor="#fff"
              keyboardType="email-address"
              onSubmitEditing={() => this.password.focus()}
            />

            <TextInput
              className="password-input"
              style={styles.inputBox}
              onChangeText={text => {
                this.handlePassword(text);
              }}
              autoCompleteType="password"
              placeholder="Password"
              secureTextEntry={true}
              placeholderTextColor="#002f6c"
            />

            <Button
              className="submit-login"
              style={styles.button}
              color="#7800ff"
              title="Entrar"
              disabled={_handleDisable}
              onPress={() => {
                this.handleLogar(navigation);
              }}
            />
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  containerBody: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
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
  inputBox: {
    width: 300,
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 18,
    color: "#7800ff",
    marginVertical: 10,
    opacity: 0.5
  },
  button: {
    width: "100%",
    backgroundColor: "#7800ff",
    borderRadius: 15,
    marginVertical: 10,
    paddingVertical: 12
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#ffffff",
    textAlign: "center"
  },
  imageBack: {
    width: "100%",
    height: "100%",
    opacity: 0.6
  }
});
