import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import './email.css'; // Import the CSS file for styling

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
    <div className='contact-container'>
      <h2>Contact Us</h2>
      <form ref={form} onSubmit={sendEmail} className='contact-form'>
        <label htmlFor='user_name'>Name</label>
        <input type='text' name='user_name' id='user_name' className='form-input' />
        
        <label htmlFor='user_email'>Email</label>
        <input type='email' name='user_email' id='user_email' className='form-input' />
        
        <label htmlFor='message'>Message</label>
        <textarea name='message' id='message' className='form-textarea' />
        
        <input type='submit' value='Send' className='submit-button' />
      </form>
      {message && <p className='message'>{message}</p>}
    </div>
  );
};
