import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ChatContainer } from "../../components/chat/ChatContainer";

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

export default function Checkout(props) {

  const { loggedInUser } = props
  const [message, setMessage] = useState("");
  let { id } = useParams();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      // axios.post(`${process.env.REACT_APP_API_URL}/api/order/${id}/paid`);
      setMessage(`Order ${id} placed! You will receive an email confirmation.`);
    }

    if (query.get("canceled")) {
      setMessage("Order canceled -- continue to shop around and checkout when you're ready.");
    }
  }, []);

  return (
    <>
      <Message message={message} />
      <ChatContainer loggedInUser={loggedInUser} />
    </>
  );
}
