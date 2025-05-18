import React from "react";
import styles from './modalPop.module.css'

interface ModalProps {
  id?: string;
  header?: React.ReactNode;
  body?: React.ReactNode;
  footer?: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ id = "Modal", header, body, footer, onClose }) => {
  return (
    <div id={id} className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.header}>
          <h2>{header ? header : "Header"}</h2>
          <span onClick={onClose} className={styles.closeModalIcon}>
            &times;
          </span>
        </div>
        <div className={styles.body}>
          {body ? (
            body
          ) : (
            <div>
              <p>This is our Modal Body</p>
            </div>
          )}
        </div>
        <div className={styles.footer}>{footer ? footer : <h2>Footer</h2>}</div>
      </div>
    </div>
  );
};

export default Modal;
