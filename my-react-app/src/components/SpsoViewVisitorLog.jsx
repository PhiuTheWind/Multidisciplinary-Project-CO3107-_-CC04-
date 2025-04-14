import React, { useMemo, useState, useEffect } from 'react';
import { useTable, useSortBy } from 'react-table'
import { useNavigate } from 'react-router-dom';
import Header from "./utils/Header";
import Footer from "./utils/Footer";
import styles from '../styles/SpsoViewStuLog.module.css'
import { IoSearch, IoEyeSharp } from "react-icons/io5"
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

function SpsoViewStuLog() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [start_time, setStartTime] = useState(null)
    const [end_time, setEndTime] = useState(null)
    const [status, setStatus] = useState("")
    const [selectedrow, setSelectedRow] = useState(null)
    const [isView, setIsViewOpen] = useState(false)
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Intl.DateTimeFormat('en-GB', {

            hour: '2-digit',
            minute: '2-digit',
            hour12: false // dùng giờ 24h, nếu bạn muốn 12h thì đặt là true
        }).format(new Date(dateString));
    };

    const formatDateOnly = (dateString) => {
        if (!dateString) return '';
        return new Intl.DateTimeFormat('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).format(new Date(dateString));
    };

    const formatDateTime = (datetimeStr) => {
        if (!datetimeStr) return "-";
        const date = new Date(datetimeStr);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

      
        return `${hours}:${minutes} `;
      };

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/history_visitor');
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
        const filtered = data.filter((row) => {
            const startTimeFilter = start_time ? new Date(row.start_time) >= new Date(start_time) : true;
            const endTimeFilter = end_time ? new Date(row.end_time) <= new Date(end_time) : true;
 
            const statusFilter = status ? row.status === status : true;

            return startTimeFilter && endTimeFilter &&  statusFilter;
        });

        setFilteredData(filtered);
    }, [data, start_time, end_time,  status]);

    const columns = useMemo(
        () => [

            {
                Header: 'BIỂN SỐ XE',
                accessor: 'bien_so_xe',
                Cell: ({ value }) => <div style={{ textAlign: 'middle' }}>{value}</div>,
            },
            {
                Header: 'Card ID',
                accessor: 'Card_id',
                Cell: ({ value }) => <div style={{ textAlign: 'middle' }}>{value}</div>, // Align text left
            },
            {
                Header: 'NGÀY GỬI',
                accessor: 'parking_date',
                Cell: ({ value }) => formatDateOnly(value),
            },
            {
                Header: 'THỜI GIAN VÀO',
                accessor: 'start_time',
                Cell: ({ value }) => formatDateTime(value),
            },
            {
                Header: 'THỜI GIAN RA',
                accessor: 'end_time',
                Cell: ({ value }) => formatDateTime(value),
            },
            {
                Header: 'THỜI GIAN GỬI',
                accessor: 'parking_time',
                Cell: ({ value }) => formatDateTime(value),
            },
            {
                Header: 'TÌNH TRẠNG',
                accessor: 'status',
                Cell: ({ value }) => (
                    <div
                        className={`${styles.statusBadge} ${value === 'IN' ? styles.recv : value === 'OUT' ? styles.unrecv : styles.print}`}
                    >
                        {value}
                    </div>
                ),
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
            <Header text='ADMIN NAME' showLogout={true} isStudent={false} />

            <div className={styles.search}>
                <div className={styles.input_group}>
                    <label className={styles.search_label}><IoSearch /> Từ</label>
                    <DatePicker
                        className={styles.datepick}
                        selected={start_time}
                        onChange={(date) => setStartTime(date)} // Ensure the handler updates state
                        dateFormat="dd/MM/yyyy"
                    />
                </div>
                <div className={styles.input_group}>
                    <label className={styles.search_label}><IoSearch /> Đến</label>
                    <DatePicker
                        className={styles.datepick}
                        selected={end_time}
                        onChange={(date) => setEndTime(date)} // Ensure the handler updates state
                        dateFormat="dd/MM/yyyy"
                    />
                </div>

                <div className={styles.input_id}>
                    <label className={styles.search_label}><IoSearch /> Trạng thái </label>
                    <select
                        className={styles.input}
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="">Tất cả</option>
                        <option value="IN">IN</option>
                        <option value="OUT">OUT</option>
                    </select>
                </div>
            </div>
            <div className={styles.table_printer}>

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
                                    <tr {...row.getRowProps()}>
                                        {row.cells.map((cell) => (
                                            <td className={styles.td} {...cell.getCellProps()}>
                                                {cell.render("Cell")}
                                            </td>
                                        ))}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {isView && (
                <div className={styles.popup}>
                    <div className={styles.popup_info}>
                        <h2 className={styles.h2}>Thông tin gửi xe</h2>
                        <div className={styles.info}>
                            <div className={styles.row}>
                                <label className={styles.field}>MSSV:</label>
                                <span className={styles.value}>{selectedrow?.stu_id}</span>
                            </div>
                            <div className={styles.row}>
                                <label className={styles.field}>Tên sinh viên:</label>
                                <span className={styles.value}>{selectedrow?.stu_name}</span>
                            </div>
                            <div className={styles.row}>
                                <label className={styles.field}>Thời gian vào:</label>
                                <span className={styles.value}>{formatDate(selectedrow?.start_time)}</span>
                            </div>
                            <div className={styles.row}>
                                <label className={styles.field}>Thời gian ra:</label>
                                <span className={styles.value}>{formatDate(selectedrow?.end_time)}</span>
                            </div>
                            <div className={styles.row}>
                                <label className={styles.field}>Ngày gửi:</label>
                                <span className={styles.value}>{formatDateOnly(selectedrow?.parking_date)}</span>
                            </div>
                            <div className={styles.row}>
                                <label className={styles.field}>Trạng thái:</label>
                                <span className={`${styles.value} ${
                                selectedrow?.status === 'OUT'
                                    ? styles.receive
                                    : selectedrow?.status === 'IN'
                                    ? styles.unreceive
                                    : styles.printing
                                }`}>
                                {selectedrow?.status}
                                </span>
                            </div>
                        </div>
                        <div className={styles.info}>
                            <div className={styles.row}>
                                <label className={styles.field}>Giá tiền:</label>
                                <span className={styles.value}>{selectedrow?.Price} VND</span>                        
                            </div>
                        </div>

                        <button className={styles.popup_btn} onClick={() => setIsViewOpen(false)}>
                            ĐÓNG
                        </button>
                    </div>

                </div>
            )}

            <Footer />
        </div>
    );

};
export default SpsoViewStuLog;
