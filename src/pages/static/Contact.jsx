import { useState } from "react";
import Swal from "sweetalert2";
import styles from "./contact.module.css";
import { Link } from "react-router-dom";
import Reveal from "../../components/utils/Reveal.jsx";
import { useMutation } from "@tanstack/react-query";
import { contactUsForm } from "../../api/masabService";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const mutation = useMutation({
    mutationFn: contactUsForm,
    mutationKey: [contactUsForm],
    onSuccess: (data) => {
      if(data.success==true){
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Message sent successfully!",
          timer: 2000,
        });   
      }
      else{
        Swal.fire({
          icon: "info",
          title: "Information",
          text: data.msg,
        });
      }
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Error submitting form: ${error.message}`,
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <>
      <div className="bounce_bg_circle">
        <div className={styles.aboutMain}>
          <div className={`header_div ${styles.headerBlog}`}>
            <div className={styles.cardContainer}>
              <h1>Contact Us</h1>
              <div className={styles.contactForm}>
                <form onSubmit={handleSubmit} className={styles.formInput}>
                  <div className={styles.contactInput}>
                    <div className={styles.contactFields}>
                      <label htmlFor="">Your Name</label>
                      <input
                        type="text"
                        placeholder="Name"
                        value={formData.name}
                        name="name"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className={styles.contactFields}>
                      <label htmlFor="">Your Email</label>
                      <input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        name="email"
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className={styles.contactFields}>
                    <label htmlFor="">Subject</label>
                    <input
                      type="text"
                      placeholder="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={styles.contactFields}>
                    <label htmlFor="">Message</label>
                    <textarea
                      placeholder="Message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      id=""
                    ></textarea>
                  </div>
                  <div className={styles.contactInfo}>
                    <Link>
                      <b>Address:</b> BOUNCE INC LTD 7 Bell Yard London WC2A 2JR
                    </Link>
                    <Link>
                      <b>Email:</b> info@bounce.live
                    </Link>
                    <Reveal width="100%" delay=".6">
                      <button
                        type="submit"
                        className={`global_button_one ${styles.submitBtn}`}
                        disabled={mutation.isLoading}
                      >
                        <span>
                          {mutation.isLoading ? "Sending..." : "Send message"}
                        </span>
                      </button>
                    </Reveal>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
