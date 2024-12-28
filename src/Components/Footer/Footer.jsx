import React from "react";
import styles from "./Footer.module.css"; // Importing the CSS Module

export default function Footer() {
  return (
    <div className={styles.container}>
      <footer className={styles.footer}>
        <div className={styles.footerInfo}>
          <h3>Contact Us</h3>
          <p>
            <strong>Phone:</strong> +251932678214
          </p>
          <p>
            <strong>Email:</strong> fettabin@gmail.com
          </p>
          <p>
            <strong>Location:</strong> Hawassa, Ethiopia
          </p>
        </div>
        <div className={styles.contactMethods}>
          <h3>Get in Touch</h3>
          <p>
            <strong>Phone:</strong> +251906790061
          </p>
          <p>
            <strong>Telegram:</strong> @Fetu_Deen
          </p>
          <p>
            <strong>Email:</strong> info@moonlight.com
          </p>
        </div>
      </footer>
      <div className={styles.developerCredit}>
        <p>
          Developed by:
          <a
            style={{ textDecoration: "none" }}
            href="https://fetudev-portfolio.netlify.app/"
            target="_blank"
          >
            {" "}
            Moonlight Tech Solutions
          </a>
        </p>
      </div>
    </div>
  );
}
