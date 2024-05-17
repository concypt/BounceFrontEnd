import {  useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import styles from "./contact.module.css";
import { Link, NavLink } from "react-router-dom";
import "react-date-range/dist/styles.css"; // Main css file
import "react-date-range/dist/theme/default.css"; // Theme css file
import Reveal from "../../components/utils/Reveal.jsx";

// imaages
import promoteImg2 from "../../assets/images/promote_img2.png";
import calender from "../../assets/images/calender.svg";
import promoteImg from "../../assets/images/promote_img.png";

function News() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    fetch("https://bounce.extrasol.co.uk/api/attenders/contact-us", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Api-Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9",
        
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((response) => {
        setIsSubmitting(false); 
        
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Message sent successfully!",
          timer: 2000,
        }).then(() => {
          setFormData({ // Reset form fields to empty values
            name: "",
            email: "",
            subject: "",
            message: "",
          });
          navigate("/contact");
        });
      })
      .catch((error) => {
        console.error("Error submitting host application:", error);
        setIsSubmitting(false); 
        // Handle error
      });
  };
  return (
    <>
      <div className="bounce_bg_circle">
        <div className={styles.aboutMain}>
          <dir className={`header_div ${styles.headerBlog}`}>
            <div className={styles.cardContainer}>
              <h1>Contact Us</h1>
              <div className={styles.contactForm}>
                <form onSubmit={handleSubmit} className={styles.formInput}>
                  <div className={styles.contactInput}>
                    <div className={styles.contactFields}>
                      <label htmlFor="">Your Name</label>
                      <input type="text" placeholder="Name" value={formData.name} name="name" onChange={handleChange} required />
                    </div>
                    <div className={styles.contactFields}>
                      <label htmlFor="">Your Email</label>
                      <input type="email" placeholder="Email" value={formData.email}  name="email" onChange={handleChange} required />
                    </div>
                  </div>
                  <div className={styles.contactFields}>
                    <label htmlFor="">Subject</label>
                    <input type="text" placeholder="Subject" name="subject" value={formData.subject} onChange={handleChange}/>
                  </div>
                  <div className={styles.contactFields}>
                    <label htmlFor="">Message</label>
                    <textarea placeholder="Message" name="message" value={formData.message} onChange={handleChange} id=""></textarea>
                  </div>
                  <div className={styles.contactInfo}>
                    <Link>
                      <b>Addreess:</b> BOUNCE INC LTD 7 Bell Yard London WC2A
                      2JR
                    </Link>
                    <Link>
                      <b>Email:</b> Info@bounce.live
                    </Link>
                    <Reveal width="100%" delay=".6">
                      <button
                        type="submit"
                        className={`global_button_one ${styles.submitBtn}`}
                        disabled={isSubmitting} 
                      >
                        {" "}
                      
                        <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                      </button>
                    </Reveal>
                  </div>
                </form>
              </div>
            </div>
          </dir>
        </div>
      </div>
    </>
  );
}

export default News;
