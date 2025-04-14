import React, { useState, useEffect } from 'react';
import Header from './utils/Header';
import Footer from './utils/Footer';
import styles from '../styles/ManageConfig.module.css'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function ManageConfig() {
  const [date, setDate] = useState(new Date());
  const [defaultPage, setDefaultPage] = useState('');

  const [morning, setMorning] = useState('');
  const [evening, setEvening] = useState('');
  const [weekend, setWeekend] = useState('');

  const [fileTypes, setFileTypes] = useState({
    pdf: false,
    docx: false,
    jpg: false,
    png: false,
  });

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/price');
        const data = await response.json();
        if (data.success) {
          setMorning(data.data[0].price)
          setEvening(data.data[1].price)
          setWeekend(data.data[2].price)
        } else {
          console.error('Error:', error);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchConfig();
  }, []);

  const handleCheckboxChange = (type) => {
    setFileTypes((prev) => ({ ...prev, [type]: !prev[type] }));
  };


  const saveConfig = async () => {
    try {
      const payload = {
        morning: morning,
        evening: evening,
        weekend: weekend
      };
      console.log(payload)
      const response = await fetch('http://localhost:3000/api/price_update', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      if (response.ok) {
        console.log('Response:', result);
        alert('Configuration updated successfully!');
      } else {
        console.error('Error:', result.message);
        alert(`Failed to update configuration: ${result.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while updating the configuration.');
    }
  };



  return (
    <div className={styles.container}>
      <Header text='ADMIN' showLogout={true} />

      <section className={styles.config}>
        <form id="loginForm" className={styles.login_form}>
          <h1 className={styles.h1}>Quản lý giá gửi xe</h1>
          <div className={styles.input_group}>
            <label className={styles.name}>6h - 18h, Thứ 2 - Thứ 6 (VND):</label>
            <input
              type="number"
              placeholder='Nhập số tiền...'
              className={styles.input}
              
              //value={100}
              value={morning}
              onChange={(e) => setMorning(e.target.value)}
              required
            />
          </div>
          <div className={styles.input_group}>
            <label className={styles.name}>18h - 22h, Thứ 2 - Thứ 6 (VND):</label>
            <input
              type="number"
              placeholder='Nhập số tiền...'
              className={styles.input}
              //value={100}
              value={evening}
              onChange={(e) => setEvening(e.target.value)}
              required
            />
          </div>
          <div className={styles.input_group}> 
            <label className={styles.name}>Thứ 7, Chủ nhật (VND):</label>
              <input
                type="number"
                placeholder='Nhập số tiền...'
                className={styles.input}
                //value={100}
                value={weekend}
                onChange={(e) => setWeekend(e.target.value)}
                required
              />
          </div>
          {/* <button className={styles.button} type="submit"> */}
          <button className={styles.button} type="button" onClick={saveConfig}>
          LƯU THAY ĐỔI</button>
        </form>

      </section>

      <Footer />
    </div>
  );
}

export default ManageConfig;
