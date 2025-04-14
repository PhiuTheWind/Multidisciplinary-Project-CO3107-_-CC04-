import React, {useState} from 'react';
import Header from './utils/Header';
import Footer from './utils/Footer';
import styles from '../styles/AddPrinter.module.css'
import { IoMdArrowDropdown } from "react-icons/io";

function AddPrinter() {
  const [isActive, setIsActive] = useState(false);

  const [money, setMoney] = useState(50000); // Default paper count
  const [studentName, setstudentName] = useState("");
  const [MSSV, setMSSV] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [cardid, setcardid] = useState("");
  

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const statusOptions = ["Bật", "Tắt"];

  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!studentName || !MSSV || !username || !cardid|| !password|| !money) {
      setErrorMessage("Vui lòng nhập tất cả các trường!");
      return;
    }

    if (Number(money) < 0) {
      setError('Số tiền lớn hơn 0.');
      return;
    }

    setError('');



    // Call API
    try {
      const response = await fetch("http://localhost:3000/api/add_student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: studentName,
          MSSV: MSSV,
          username: username,
          password: password,
          Id_card: cardid,
          money: money
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setSuccessMessage(result.message);
        alert("Đã thêm thành công");
        setErrorMessage("");
        // Reset form
        setstudentName("");
        setMSSV("");
        setusername("");
        setpassword("");
        setMoney("")
      } else {
        setErrorMessage(result.message || "Có lỗi xảy ra, vui lòng thử lại.");
        alert("Có lỗi xảy ra, vui lòng thử lại.");
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Error adding printer:", error);
      setErrorMessage("Không thể kết nối với server. Vui lòng thử lại sau.");
      setSuccessMessage("");
    }
  };

  return (
    <div className={styles.container}>
      <Header text='SPSO NAME' showLogout={true} />
      
      <section className={styles.add_printer_section}>
        {/* <form className={styles.form}> */}
        <form className={styles.form} onSubmit={handleSubmit}>
          <h1 className={styles.header}>THÊM THÔNG TIN HỌC SINH</h1>
          {/* <div className={styles.input_group}>
            <label className={styles.name}>ID máy in</label>
            <input 
              type='text'
              placeholder='Nhập ID máy in...'
              className={styles.input}
              required
            />
          </div> */}
          <div className={styles.input_group}>
            <label className={styles.name}>Tên học sinh</label>
            <input 
              type='text'
              placeholder='Nhập tên học sinh...'
              className={styles.input}
              required
              value={studentName}
              onChange={(e) => setstudentName(e.target.value)}

            />
          </div>
          <div className={styles.input_group}>
            <label className={styles.name}>MSSV </label>
            <input 
              type='text'
              placeholder='Nhập MSSV...'
              className={styles.input}
              required
              value={MSSV}
              onChange={(e) => setMSSV(e.target.value)}
            />
          </div>
          <div className={styles.input_group}>
            <label className={styles.name}>Username</label>
            <input 
              type='text'
              placeholder='Nhập username...'
              className={styles.input}
              required
              value={username}
              onChange={(e) => setusername(e.target.value)}

            />
          </div>
          <div className={styles.input_group}>
            <label className={styles.name}>Password</label>
            <input 
              type='text'
              placeholder='Nhập password...'
              className={styles.input}
              required
              value={password}
              onChange={(e) => setpassword(e.target.value)}

            />
          </div>
          <div className={styles.input_group}>
            <label className={styles.name}>ID thẻ </label>
            <input 
              type='text'
              placeholder='Nhập ID thẻ...'
              className={styles.input}
              required
              value={cardid}
              onChange={(e) => setcardid(e.target.value)}

            />
          </div>
          <div className={styles.input_group}>
            <label className={styles.name}>Số tiền (VND)</label>
            <input 
              type="number"
              placeholder="Nhập số tiền...."
              className={styles.input}
              required
              value={money}
              onChange={(e) => setmoney(Number(e.target.value))}
              
            />
          </div>
          {/* <button className={styles.addbutton}>THÊM</button> */}
          <button className={styles.addbutton} type="submit">THÊM</button>
        </form>
      </section>

      <Footer />
    </div>
  );
}

export default AddPrinter;
