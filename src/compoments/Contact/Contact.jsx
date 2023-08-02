import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import "./contact.css";
import { toast } from "react-toastify";

function Contact() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm("service_wjx6ccj", "template_4a1s4ol", form.current, "gOiLfhOPEVkFD4ECC").then(
      (result) => {
        console.log(result.text);
        toast.success("Email sent successfully");
      },
      (error) => {
        console.log(error.text);
      }
    );
  };

  return (
    <div className="contact-form">
      <div className="container">
        <form ref={form} onSubmit={sendEmail}>
          <div className="form-row">
            <label>Name</label>
            <input type="text" name="user_name" required />
          </div>
          <div className="form-row">
            <label>Email</label>
            <input type="email" name="user_email" required />
          </div>
          <div className="form-row">
            <label>Message</label>
            <textarea name="message" required />
          </div>
          <input type="submit" value="Send" className="send-btn" />
        </form>
      </div>
    </div>
  );
}

export default Contact;
