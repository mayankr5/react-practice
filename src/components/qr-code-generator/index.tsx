import { useState } from "react";
import QRCode from "react-qr-code";
import styles from './QRCodeGenerator.module.css';

const QRCodeGenerator = () => {
  const [text, setText] = useState<string>("");
  const [qrCode, setQRCode] = useState<string>("");

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <input
          type="text"
          className={styles.inputField}
          placeholder="Enter value..."
          onChange={(e) => setText(e.target.value)}
        />
        <button className={styles.button} onClick={() => setQRCode(text)}>
          Generate QR
        </button>
      </div>
      {qrCode && (
        <div className={styles.qrCodeContainer}>
          <QRCode value={qrCode} />
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;
