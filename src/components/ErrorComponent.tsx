import React from "react";
import { ClipLoader } from "react-spinners";

const ErrorComponent: React.FC = () => {
  return (
    <div
      className="container"
      style={{ maxWidth: "1000px", display: "flex", justifyContent: "center" }}
    >
      <div
        className="error-inner"
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 40,
        }}
      >
        <h1 style={{ fontSize: 20, width: "100%" }}>
          Страница загружается, пожалуйста, подождите
        </h1>
        <ClipLoader size={100} color="#fbc100" />
      </div>
    </div>
  );
};

export default ErrorComponent;
