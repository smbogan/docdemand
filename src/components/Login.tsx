import { ButtonUnstyled } from "@mui/base";
import { Link } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalStateContext } from "../contexts/GlobalStateContext";
import { useContext } from "react";

export default function Login() {
  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const authContext = useContext(GlobalStateContext);

  var axios = require("axios");
  var data = JSON.stringify({
    email: email,
    password: password,
  });

  var config = {
    method: "post",
    url: "https://xma7-7q1q-g4iv.n7.xano.io/api:xv_aHIEN/auth/login",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  function login() {
    axios(config)
      .then(function (response: any) {
        authContext.setState({ token: "" });
        alert(JSON.stringify(response.data));
        authContext.setState({ token: response.data.authToken });
      })
      .catch(function (error: any) {
        console.log(error);
      })
      .finally(navigate("../provider/listings"));
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#eaeaea",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <p>{authContext.state.token}</p>
      <div
        style={{
          display: "flex",
          padding: 16,
          borderRadius: 8,
          background: "#fff",
          border: "1px solid gray",
          flexDirection: "column",
        }}
      >
        <h3 style={{ marginBottom: 24 }}>Login to DocDemand</h3>
        <label>
          Email:
          <input type="text" onChange={(evt) => setEmail(evt.target.value)} />
        </label>
        <label>
          Password:
          <input
            type="password"
            onChange={(evt) => setPassword(evt.target.value)}
          />
        </label>
        <ButtonUnstyled
          style={{
            margin: 12,
            borderRadius: 4,
            padding: 12,
            alignSelf: "flex-start",
            fontSize: 14,
            color: "#fff",
            fontWeight: "600",
            border: "0px",
            background: "#00b0f0",
            cursor: "pointer",
          }}
          onClick={() => login()}
        >
          Login
        </ButtonUnstyled>
        <p style={{ fontSize: 12, margin: 12 }}>
          Don't have an account? <Link href="./signup">Signup</Link>.
        </p>
      </div>
    </div>
  );
}
