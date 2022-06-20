import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Link, useNavigate } from "react-router-dom";

//react-bootstrap libraries
import DataTable from "react-data-table-component";

//components
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SideMenu from "../../components/SideMenu";
import axios from "axios";

import { OverlayTrigger, Tooltip } from "react-bootstrap";
// import SalesBillEdit from "./Sales_bill_edit";

const Sales = () => {
  const [search, setSearch] = useState("");
  const [mainData, setMainData] = useState([]);

  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [size, setSize] = useState(10);

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  // const handleUpdateShow = (row) => {
  // SalesBillEdit(row);
  // <SalesBillEdit data={row} />;
  // };

  const deleteTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Delete
    </Tooltip>
  );
  const editTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Edit
    </Tooltip>
  );

  const navigate = useNavigate();

  const columns = [
    {
      name: "SALES BILL NO",
      selector: (row) => row.SALES_BILL_NO,
      sortable: true,
    },
    {
      name: "SALES DATE",
      selector: (row) =>
        row.SALES_DATE.slice(0, 10).split("-").reverse().join("-"),
      sortable: true,
    },
    {
      name: "CUSTOMER NAME",
      selector: (row) => row.CUSTOMER_NAME,
      sortable: false,
    },
    {
      name: "GRAND TOTAL",
      selector: (row) => (
        <>
          <p>&#8377; {row.GRAND_TOTAL}</p>
        </>
      ),
      sortable: false,
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <OverlayTrigger
            placement="bottom"
            delay={{ show: 250, hide: 400 }}
            overlay={editTooltip}
          >
            <i
              className="fe fe-edit fa-2x"
              // onClick={() => alert(JSON.stringify(row))}
              onClick={() =>
                navigate("/sales/EditSalesBilling", {
                  state: {
                    data: row.SALES_ID,
                    stateId: row.STATE_ID,
                    row: row,
                  },
                })
              }
            ></i>
            {/* </Link> */}
          </OverlayTrigger>
          <OverlayTrigger
            placement="bottom"
            delay={{ show: 250, hide: 400 }}
            overlay={deleteTooltip}
          >
            <i
              className="mx-4 fe fe-trash-2 fa-2x text-red"
              onClick={() => handleDelete(row)}
            ></i>
          </OverlayTrigger>
        </>
      ),
    },
  ];

  //delete data
  const handleDelete = async (row) => {
    const items = JSON.parse(localStorage.getItem("Info"));
    let token = "bearer " + items.token;
    // console.log(token);

    const result = await axios.post(
      `http://localhost:5000/deleteBill`,
      {
        SALES_ID: row.SALES_ID,
      },
      {
        headers: {
          Authorization: token,
          enctype: "multipart/form-data",
        },
      }
    );
    let res = await result.data;

    // console.log(res);
    if (res.st) {
      // alert(res.msg);
      toast.success(res.msg);
      fetchBillData(1);
    } else {
      alert(res.msg);
    }
  };

  const fetchBillData = async () => {
    const items = JSON.parse(localStorage.getItem("Info"));
    let token = "bearer " + items.token;
    setLoading(true);

    //=+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+=
    //This API is manage page ,Customer details and pagination.

    await axios
      .get(
        `http://localhost:5000/getbill?search=${search}&page=${page}&per_page=${size}&delay=1`,
        {
          headers: {
            Authorization: token,
            enctype: "multipart/form-data",
          },
        }
      )
      .then(function (res) {
        setMainData(res.data.data);

        // setFilterData(res.data.data);
        setTotalRows(res.data.total);
        setLoading(false);
      })
      .catch(function (err) {
        localStorage.removeItem("Info");
        window.location.reload();
      });
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handlePerRowsChange = async (newPerPage) => {
    setPerPage(newPerPage);
    // const items = JSON.parse(localStorage.getItem("Info"));
    // let token = "bearer " + items.token;
    // setLoading(true);

    // await axios
    //   .get(
    //     `http://localhost:5000/getbill?search=${search}&page=${page}&per_page=${newPerPage}&delay=1`,
    //     {
    //       headers: {
    //         Authorization: token,
    //         enctype: "multipart/form-data",
    //       },
    //     }
    //   )
    //   .then(function (response) {
    //     setMainData(response.data.data);
    //     // alert("NOt data", response.data.data);
    //     // setFilterData(response.data.data);
    //     setSize(newPerPage);
    //     setLoading(false);
    //   })
    //   .catch(function (err) {
    //     localStorage.removeItem("Info");
    //     window.location.reload();
    //   });
  };

  useEffect(() => {
    fetchBillData();
  }, [search, page]);

  // useEffect(() => {
  //   fetchBillData(1); //fetch page 1 of categorys
  //   // alert(JSON.stringify(mainData));
  // }, []);

  return (
    <>
      <Header />
      <SideMenu />

      <div class="main-content side-content pt-0">
        <div class="side-app">
          <div class="main-container container-fluid">
            <div class="row">
              <div class="col-lg-12">
                <div class="card custom-card">
                  <div class="card-body">
                    <Link
                      to="/sales/salesBilling"
                      style={{ textDecoration: "none" }}
                    >
                      <button
                        class="btn btn-primary mb-4"
                        data-bs-target="#createfile"
                        data-bs-toggle="modal"
                      >
                        <i class="fe fe-plus me-1"></i>Add New Bill
                      </button>
                    </Link>

                    <DataTable
                      title="Sales Billing Data"
                      columns={columns}
                      data={mainData}
                      progressPending={loading}
                      pagination
                      fixedHeader={true}
                      // fixedHeaderScrollHeight="500px"
                      paginationServer
                      paginationTotalRows={totalRows}
                      onChangeRowsPerPage={handlePerRowsChange}
                      onChangePage={handlePageChange}
                      subHeader
                      subHeaderComponent={
                        <input
                          type="text"
                          placeholder="Search here"
                          className="w-25 form-control"
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                        />
                      }
                    />
                    <ToastContainer />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Sales;
