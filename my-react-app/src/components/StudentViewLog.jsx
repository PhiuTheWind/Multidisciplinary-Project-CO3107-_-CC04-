import React, { useMemo, useState, useEffect } from "react";
import { useTable, useSortBy } from "react-table";
import { useNavigate } from "react-router-dom";
import Header from "./utils/Header";
import Footer from "./utils/Footer";
import styles from "../styles/StudentViewLog.module.css";
import { IoSearch, IoEyeSharp } from "react-icons/io5";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import DatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import { Getinfo } from "./utils/GetInfo";

function StudentViewLog() {
  const log_url = `http://localhost:3000/api/log`;
  const park_url = `http://localhost:3000/api/park`;

  const token = localStorage.getItem("userCredentials")
    ? JSON.parse(localStorage.getItem("userCredentials")).token
    : null;
  const [studentLogInfo, setStudentLogInfo] = useState([]);
  const [studentLogParkInfo, setStudentLogParkInfo] = useState([]);

  const GetLogInfo = async () => {
    try {
      const response = await axios.post(
        log_url,
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      if (response.status === 200) {
        setStudentLogInfo(response.data);
      } else if (response.status === 404) {
        navigate("/");
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const GetParkInfo = async () => {
    try {
      const response2 = await axios.post(
        park_url,
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("iiiiiiiiiiiiiiiiiiiii");
      console.log(response2.data);
      if (response2.status === 200) {
        setStudentLogParkInfo(response2.data);
      } else if (response2.status === 404) {
        navigate("/");
      }
      console.log(response2);
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // dùng giờ 24h, nếu bạn muốn 12h thì đặt là true
    }).format(new Date(dateString));
  };

  const formatDateOnly = (dateString) => {
    if (!dateString) return "";
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(new Date(dateString));
  };

  const navigate = useNavigate();
  const [studentInfo, setStudentInfo] = useState({
    name: "STUDENT",
    pagebalance: 0,
  });
  const [error, setError] = useState(null);
  const [start_time, setStartTime] = useState(null);
  const [end_time, setEndTime] = useState(null);
  const [filename, setFilename] = useState("");
  const [selectedrow, setSelectedRow] = useState(null);
  const [isView, setIsViewOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [stuid, setStuID] = useState("");

  useEffect(() => {
    const fetchStudentInfo = async () => {
      try {
        const data = await Getinfo();
        setStudentInfo(data); // Update state with fetched data
      } catch (err) {
        setError("Failed to fetch student information");
        console.error(err);
      }
    };

    fetchStudentInfo();
    GetLogInfo();
    GetParkInfo();
  }, []);

  // Filter Data Based on Search Criteria
  // const filteredData = useMemo(() => {
  //   return studentLogInfo.filter((log) => {
  //     const logStartDate = new Date(log.start_date);
  //     const logEndDate = new Date(log.end_date);

  //     const isStartDateValid = start_date === null || logStartDate >= new Date(start_date);
  //     const isEndDateValid = end_date === null || logEndDate <= new Date(end_date);
  //     const isFilenameValid =
  //       filename === "" || log.file_name.toLowerCase().includes(filename.toLowerCase());

  //     return isStartDateValid && isEndDateValid && isFilenameValid;
  //   });
  // }, [studentLogInfo, start_date, end_date, filename]);

  useEffect(() => {
    const filtered = studentLogParkInfo.filter((row) => {
      const startTimeFilter = start_time ? new Date(row.start_time) >= new Date(start_time) : true;
      const endTimeFilter = end_time ? new Date(row.end_time) <= new Date(end_time) : true;
      const stuIdFilter = stuid ? row.MSSV.includes(stuid) : true;
      const statusFilter = status ? row.status === status : true;

      return startTimeFilter && endTimeFilter && stuIdFilter && statusFilter;
    });

    setFilteredData(filtered);
  }, [studentLogParkInfo, start_time, end_time, stuid, status]);

  const columns = useMemo(
    () => [
      {
        Header: "MSSV",
        accessor: "MSSV",
        Cell: ({ value }) => <div style={{ width: "80px" }}>{value}</div>, // Align text left
      },
      {
        Header: "TÊN HỌC SINH",
        accessor: "student_used",
        Cell: ({ value }) => <div style={{ textAlign: "left" }}>{value}</div>, // Align text left
      },
      {
        Header: "Biển số xe",
        accessor: "bien_so_xe",
        Cell: ({ value }) => <div style={{ textAlign: "left" }}>{value}</div>, // Align text left
      },
      {
        Header: "Ngày gửi xe",
        accessor: "parking_date",
        Cell: ({ value }) => formatDateOnly(value),
      },
      // {
      //   Header: "Thời gian ra",
      //   accessor: "end_date",
      //   Cell: ({ value }) => formatDate(value),
      // },
      {
        Header: "TÌNH TRẠNG",
        accessor: "status",
        Cell: ({ value }) => (
          <div
            className={`${styles.statusBadge} ${
              value === "IN" ? styles.recv : value === "OUT" ? styles.unrecv : styles.print
            }`}
          >
            {value}
          </div>
        ),
      },
      {
        Header: "CHI TIẾT",
        Cell: ({ row }) => (
          <button
            className={styles.button}
            onClick={() => {
              setSelectedRow(row.original);
              setIsViewOpen(true);
            }}
          >
            <IoEyeSharp className={styles.icon} />
          </button>
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

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  return (
    <div className={styles.container}>
      <Header
        text={studentInfo.name}
        paper={studentInfo.pagebalance}
        showLogout={true}
        isStudent={true}
      />

      <div className={styles.search}>
        <div className={styles.input_group}>
          <label className={styles.search_label}>
            <IoSearch /> Từ
          </label>
          <DatePicker
            className={styles.datepick}
            selected={start_time}
            onChange={(date) => setStartTime(date)} // Ensure the handler updates state
            dateFormat="dd/MM/yyyy"
          />
        </div>
        <div className={styles.input_group}>
          <label className={styles.search_label}>
            <IoSearch /> Đến
          </label>
          <DatePicker
            className={styles.datepick}
            selected={end_time}
            onChange={(date) => setEndTime(date)} // Ensure the handler updates state
            dateFormat="dd/MM/yyyy"
          />
        </div>
        <div className={styles.input_filename}>
          <label className={styles.search_label}>
            <IoSearch /> Trạng thái{" "}
          </label>
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
                    <th
                      className={styles.th}
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      {column.render("Header")}
                      <span>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <TiArrowSortedDown />
                          ) : (
                            <TiArrowSortedUp />
                          )
                        ) : (
                          ""
                        )}
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
            <h2 className={styles.h2}>Thông Tin gửi xe</h2>
            <div className={styles.info}>
              <div className={styles.row}>
                <label className={styles.field}>MSSV:</label>
                <span className={styles.value}>{selectedrow?.MSSV}</span>
              </div>
              <div className={styles.row}>
                <label className={styles.field}>Tên sinh viên:</label>
                <span className={styles.value}>{selectedrow?.student_used}</span>
              </div>
              <div className={styles.row}>
                <label className={styles.field}>Thời gian vào bãi:</label>
                <span className={styles.value}>{formatDate(selectedrow?.start_time)}</span>
              </div>
              <div className={styles.row}>
                <label className={styles.field}>Thời gian ra bãi:</label>
                <span className={styles.value}>{formatDate(selectedrow?.end_time)}</span>
              </div>
              <div className={styles.row}>
                <label className={styles.field}>Ngày gửi xe:</label>
                <span className={styles.value}>{formatDateOnly(selectedrow?.parking_date)}</span>
              </div>
              <div className={styles.row}>
                <label className={styles.field}>Trạng thái:</label>
                <span
                  className={`${styles.value} ${
                    selectedrow?.status === "OUT"
                      ? styles.receive
                      : selectedrow?.status === "IN"
                      ? styles.unreceive
                      : styles.printing
                  }`}
                >
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
}
export default StudentViewLog;
