import React, { useMemo, useState, useEffect } from 'react';
import { useTable, useSortBy } from 'react-table'
import { useNavigate } from 'react-router-dom';
import Header from './utils/Header'
import Footer from './utils/Footer'
import styles from '../styles/ManagePrinter.module.css'
import { FaNewspaper } from "react-icons/fa6"
import { IoSearch, IoEyeSharp, IoSettingsSharp } from "react-icons/io5"
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti"
import axios from 'axios';

function ManagePrinter() {
  const [data, setData] = useState([]); // State to hold the printer data
  const [loading, setLoading] = useState(true); // State to show loading state
  const [error, setError] = useState(null); // State to handle errors
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]); // Filtered data
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const [selectedPrinter, setSelectedPrinter] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [selectedStatus, setStatus] = useState("")
  const statusOption = ["Bật", "Tắt", "Bảo trì"]
  const navigate = useNavigate()
  
  const fetchData = async () => {
    try {
   
        const response = await axios.get('http://localhost:3000/api/manage_student_info');

        if (response.data.success) {
            console.log("Fetched data:", response.data.data); // In ra dữ liệu
            setData(response.data.data);
        } else {
            throw new Error(response.data.message);
        }
    } catch (err) {
        setError(err.message || 'An unexpected error occurred.');
    } finally {
        setLoading(false);
    }
};

  useEffect(() => {
      fetchData();
  }, []);

  useEffect(() => {
    const removeAccents = (str) =>
      str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  
    if (searchTerm) {
      const normalizedSearch = removeAccents(searchTerm);
      const filtered = data.filter((item) =>
        removeAccents(item.stu_name).includes(normalizedSearch)
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data); // Reset if search term is empty
    }
  }, [searchTerm, data]);


  // const refillPaper = async (printerId) => {
  //   try {
  //     const response = await fetch('http://localhost:3000/api/refill_paper', {
  //       method: 'PATCH',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ printer_id: printerId }),
  //     });

  //     const result = await response.json();

  //     if (response.ok && result.success) {
  //       // Optionally, refresh the data to reflect the updated paper count
  //       const updatedData = data.map((printer) =>
  //         printer.printer_id === printerId ? { ...printer, num_paper: 500 } : printer
  //       );
  //       setData(updatedData);
  //     } else {
  //       alert(result.message || 'Không thể nạp lại giấy');
  //     }
  //   } catch (error) {
  //     console.error('Error refilling paper:', error);
  //     alert('Đã xảy ra lỗi khi nạp lại giấy.');
  //   }
  // };



  // Define table columns
  const columns = useMemo(
    () => [
      {
        Header: 'ID HỌC SINH',
        accessor: 'stu_id',
      },
      {
        Header: 'HỌ TÊN',
    
        accessor: 'stu_name',
        Cell: ({ value }) => (
          <div style={{ textAlign: 'left' }}>
            {value}
          </div>
        )
      },
      {
        Header: 'ID THẺ ',
        accessor: 'card_id',
        Cell: ({ value }) => (
          <div style={{ textAlign: 'middle' }}>
            {value}
          </div>
        )
      },
      {
        Header: 'SỐ TIỀN',
        accessor: 'money',
        Cell: ({ value }) => (
          <div style={{ textAlign: 'right' }}>
            {value} VND
          </div>
        )
      },
      {
        Header: 'TÌNH TRẠNG',
        accessor: 'status',
        Cell: ({ value }) => {
          const isIn = value === 'IN';
        
          const displayText = isIn ? 'Đang gửi xe' : 'Off';
          const statusClass = isIn ? styles.bật : styles.tắt;
        
          return (
            <div className={`${styles.statusBadge} ${statusClass}`}>
              {displayText}
            </div>
          );
        },
      },
      {
        Header: 'USERNAME',
        accessor: 'username',
      },
      {
        Header: 'PASSWORD',
        accessor: 'password',
      },
    ],
    []
  );

  const tableInstance = useTable(
    {
      columns,
      data: filteredData,
    },
    useSortBy
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = tableInstance

  return (
    <div className={styles.container}>
      <Header text='SPSO NAME' showLogout={true} />

      {loading && <p>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.search_add}>
        <div className={styles.search_wrapper}>
          <IoSearch className={styles.search_icon} />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Nhập tên học sinh"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        </div>

        <button className={styles.addPrinter} onClick={() => navigate('/spso_homepage/manage_printer/add_printer')}>
          THÊM HỌC SINH
        </button>
      </div>


      <div className={styles.table_printer}>
        {!loading && !error && (
          <div className={styles.table_wrapper}>
            <table className={styles.table} {...getTableProps()}>
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th className={styles.th} {...column.getHeaderProps(column.getSortByToggleProps())}>
                        {column.render("Header")}
                        <span>
                          {column.isSorted ? (column.isSortedDesc ? <TiArrowSortedDown /> : <TiArrowSortedUp />) : ''}
                        </span>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);
                  return (
                    // <tr {...row.getRowProps()}>
                    <tr {...row.getRowProps()} key={row.id} className={styles.tr}> 
                      {row.cells.map((cell) => (
                        // <td {...cell.getCellProps()} key={cell.column.id} className={styles.td}>
                        <td key={cell.column.id} {...cell.getCellProps()} className={styles.td}>   
                        {/* <td className={styles.td} {...cell.getCellProps()}>  */}
                          {cell.render("Cell")}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>



      <Footer />
    </div>
  );
}

export default ManagePrinter;