import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';


export const ContactUs = () => {
  const form = useRef();
  const [message, setMessage] = useState('');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const sendEmail = (e) => {
    e.preventDefault();

    const userName = form.current.user_name.value.trim();
    const userEmail = form.current.user_email.value.trim();
    const userMessage = form.current.message.value.trim();

    if (!userName || !userEmail || !userMessage) {
      setMessage('Please fill in all fields.');
      return;
    }

    if (!validateEmail(userEmail)) {
      setMessage('Please enter a valid email address.');
      return;
    }


    emailjs
      .sendForm(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        form.current,
        process.env.REACT_APP_PUBLIC_ID
      )
      .then(
        () => {
          setMessage('SUCCESS! Your message has been sent.');
          form.current.reset(); // Reset the form to its initial state
        },
        (error) => {
          setMessage(`FAILED... ${error.text}`);
        }
      );
  };

  return (
    <div className='contacts'>
      <form ref={form} onSubmit={sendEmail}>
        <label>Name</label>
        <input type="text" name="user_name" />
        <label>Email</label>
        <input type="email" name="user_email" />
        <label>Message</label>
        <textarea name="message" />
        <input type="submit" value="Send" />
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};
