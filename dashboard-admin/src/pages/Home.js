import React from "react";
import Header from "../components/header";
import { Jumbotron } from "react-bootstrap";

export default function Home() {
  return (
    <div>
      <Header />
      <Jumbotron style={{ background: "#fff" }} className="text-center">
        <h1>Welcome to dashboard page..!</h1>
        <p>
          This is admin only page where we can add our product. Most of the
          product have there own category so find category to add profuct.
          <p></p> Thanks!
        </p>
      </Jumbotron>
    </div>
  );
}
