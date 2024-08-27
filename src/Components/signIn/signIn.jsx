import React, { useState } from "react";
import { Button, Input, Card } from "antd";
import "antd/dist/reset.css";
import "./signIn.css";

export default function SignIn() {
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });
  const handleInputChange = (key, value) => {
    setSignInData({
      ...signInData,
      [key]: value,
    });
  };
  return (
    <div className="login-container">
      <img src="./hitech_logo.png" alt="LOGO" style={{marginBottom:"10px"}}/>
      <Card title="Login" bordered={false} style={{ width: 300 }}>
        <Input
          placeholder="Email"
          style={{ marginBottom: 10 }}
          onChange={(e) => {
            handleInputChange("email", e.target.value);
          }}
        />
        <Input.Password
          placeholder="Password"
          style={{ marginBottom: 20 }}
          onChange={(e) => {
            handleInputChange("password", e.target.value);
          }}
        />
        <Button
          type="primary"
          block
          onClick={() => {
            console.log("sign in data ", signInData);
          }}
        >
          Login
        </Button>
      </Card>
    </div>
  );
}
