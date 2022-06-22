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

import {
  Button,
  FloatingLabel,
  Form,
  Modal,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
// import SalesBillEdit from "./Sales_bill_edit";

const SubAdmin = () => {
  const [search, setSearch] = useState("");
  const [mainData, setMainData] = useState([]);

  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  // const [size, setSize] = useState(10);

  const [show, setShow] = useState(false);
  const handleInsertClose = () => {
    setUpdateId("");
    setName("");
    setNumber("");
    setEmail("");
    setPassword("");
    setRoleid("");
    setShow(false);
  };
  const handleInsertShow = () => setShow(true);

  // const [showUpdate, setShowUpdate] = useState(false);
  // const handleUpdateClose = () => setShowUpdate(false);
  const handleUpdateShow = (row) => {
    setUpdateId(row.id);
    setName(row.admin_name);
    setNumber(row.admin_number);
    setEmail(row.admin_email);
    setPassword();
    setRoleid(row.ADMIN_ROLE_ID);
    setShow(true);
  };

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

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

  const columns = [
    {
      name: "Sub Admin Name",
      selector: (row) => row.admin_name,
      sortable: true,
    },
    {
      name: "Number",
      selector: (row) => row.admin_number,
      sortable: false,
    },
    {
      name: "Email",
      selector: (row) => row.admin_email,
      sortable: false,
    },
    {
      name: "Sub Admin Role",
      selector: (row) => row.ADMIN_ROLE_NAME,
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
              onClick={() => handleUpdateShow(row)}
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
      `http://localhost:5000/deleteSubAdmin`,
      {
        id: row.id,
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
      fetchSubAdmin();
    } else {
      alert(res.msg);
    }
  };

  const fetchSubAdmin = async () => {
    const items = JSON.parse(localStorage.getItem("Info"));
    let token = "bearer " + items.token;
    setLoading(true);

    //=+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+=
    //This API is manage page ,Customer details and pagination.

    await axios
      .get(
        `http://localhost:5000/getSubAdmin?search=${search}&page=${page}&per_page=${perPage}&delay=1`,
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
  };

  //=+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+=
  //This API is use for get state name
  const [role, setRole] = useState([]);
  const fetchRole = async () => {
    const items = JSON.parse(localStorage.getItem("Info"));
    let token = "bearer " + items.token;

    //=+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+=
    //This API is use for get category name

    await axios
      .get(`http://localhost:5000/getRole`, {
        headers: {
          Authorization: token,
          enctype: "multipart/form-data",
        },
      })
      .then(function (res) {
        setRole(res.data.data);
      })
      .catch(function (err) {
        localStorage.removeItem("Info");
        window.location.reload();
      });
  };
  //=+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+=
  //This API is to store data using form.
  //insert data

  const [updateId, setUpdateId] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roleid, setRoleid] = useState("");

  const submitProduct = async (e) => {
    e.preventDefault();

    const items = JSON.parse(localStorage.getItem("Info"));
    let token = "bearer " + items.token;

    const result = await axios.post(
      "http://localhost:5000/insertEditAdmin",
      JSON.stringify({
        id: updateId,
        admin_name: name,
        admin_number: number,
        admin_email: email,
        admin_password: password,
        ADMIN_ROLE_ID: roleid,
      }),
      {
        headers: {
          "Content-type": "application/json",
          Authorization: token,
        },
      }
    );
    let res = await result.data;
    if (res.st) {
      // toast.success(res.msg);
      alert(res.msg);
      setShow(false);
      setUpdateId("");
      setName("");
      setNumber("");
      setEmail("");
      setPassword("");
      setRoleid("");
      fetchSubAdmin();
    } else {
      alert(res.msg);
    }
  };
  //=+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+=
  //This API is to store data using form.
  //update data

  // const [updateName, setUpdateName] = useState("");
  // const [updateNumber, setUpdateNumber] = useState("");
  // const [updateEmail, setUpdateEmail] = useState("");
  // const [updatePassword, setUpdatePassword] = useState("");
  // const [updateRoleid, setUpdateRoleid] = useState("");

  // const updateSubAdmin = async (e) => {
  //   e.preventDefault();
  //   const items = JSON.parse(localStorage.getItem("Info"));
  //   let token = "bearer " + items.token;

  //   const result = await axios.post(
  //     "http://localhost:5000/insertEditAdmin",
  //     JSON.stringify({
  //       id: updateId.id,
  //       admin_name: updateName,
  //       admin_number: updateNumber,
  //       admin_email: updateEmail,
  //       admin_password: updatePassword,
  //       ADMIN_ROLE_ID: updateRoleid,
  //     }),
  //     {
  //       headers: {
  //         "Content-type": "application/json",
  //         Authorization: token,
  //       },
  //     }
  //   );
  //   let res = await result.data;
  //   console.log(res);
  //   if (res.st) {
  //     // alert(res.msg);
  //     toast.success(res.msg);
  //     setShowUpdate(false);
  //     fetchSubAdmin();
  //   } else {
  //     alert(res.msg);
  //   }
  // };
  //=+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+=

  useEffect(() => {
    // fetchBillData();
    fetchSubAdmin();
  }, [search, page, perPage]);

  useEffect(() => {
    // fetchBillData(1); //fetch page 1 of categorys
    // alert(JSON.stringify(mainData));
    fetchRole();
  }, []);

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
                    <button
                      class="btn btn-primary mb-4"
                      data-bs-target="#createfile"
                      data-bs-toggle="modal"
                      onClick={handleInsertShow}
                    >
                      <i class="fe fe-plus me-1"></i>Add Sub Admin
                    </button>
                    {/* //=+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+= */}

                    {/* insert product form */}
                    <Modal show={show} onHide={handleInsertClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Insert Sub Admin Form Data</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form method="POST" enctype="multipart/form-data">
                          <Form.Group controlId="formFile" className="mb-3">
                            <Form.Control
                              placeholder="Enter Name"
                              type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              required
                            />
                          </Form.Group>
                          <br />

                          <Form.Group controlId="formFile" className="mb-3">
                            <Form.Control
                              placeholder="Enter Phone Number"
                              type="text"
                              value={number}
                              onChange={(e) => setNumber(e.target.value)}
                              required
                            />
                          </Form.Group>
                          <br />

                          <Form.Group controlId="formFile" className="mb-3">
                            <Form.Control
                              placeholder="Enter Email"
                              type="text"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                            />
                          </Form.Group>
                          <br />

                          <Form.Group controlId="formFile" className="mb-3">
                            <Form.Control
                              placeholder="Enter Password"
                              type="text"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                            />
                          </Form.Group>
                          <br />

                          <Form.Group controlId="formFile" className="mb-3">
                            <FloatingLabel
                              controlId="floatingSelectGrid"
                              label="Role Name"
                            >
                              <Form.Select
                                aria-label="Floating label select example"
                                value={roleid}
                                onChange={(e) => setRoleid(e.target.value)}
                              >
                                <option>select Role</option>
                                {role.map((items) => (
                                  <option
                                    key={items.ADMIN_ROLE_ID}
                                    value={items.ADMIN_ROLE_ID}
                                  >
                                    {" "}
                                    {items.ADMIN_ROLE_NAME}{" "}
                                  </option>
                                ))}
                              </Form.Select>
                            </FloatingLabel>
                          </Form.Group>
                          <br />
                        </Form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleInsertClose}>
                          Close
                        </Button>
                        <Button
                          variant="primary"
                          onClick={(e) => submitProduct(e)}
                        >
                          Save Changes
                        </Button>
                      </Modal.Footer>
                    </Modal>

                    {/* //=+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+= */}
                    {/* Update Sub Admin form */}
                    {/* <Modal show={showUpdate} onHide={handleUpdateClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Update Data Form</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form method="POST" enctype="multipart/form-data">
                          <Form.Group controlId="formFile" className="mb-3">
                            <Form.Control
                              placeholder="Enter Name"
                              type="text"
                              value={updateName}
                              onChange={(e) => setUpdateName(e.target.value)}
                              required
                            />
                          </Form.Group>
                          <br />

                          <Form.Group controlId="formFile" className="mb-3">
                            <Form.Control
                              placeholder="Enter Phone Number"
                              type="text"
                              value={updateNumber}
                              onChange={(e) => setUpdateNumber(e.target.value)}
                              required
                            />
                          </Form.Group>
                          <br />

                          <Form.Group controlId="formFile" className="mb-3">
                            <Form.Control
                              placeholder="Enter Email"
                              type="text"
                              value={updateEmail}
                              onChange={(e) => setUpdateEmail(e.target.value)}
                              required
                            />
                          </Form.Group>
                          <br />

                          <Form.Group controlId="formFile" className="mb-3">
                            <Form.Control
                              placeholder="Enter Password"
                              type="text"
                              value={updatePassword}
                              onChange={(e) =>
                                setUpdatePassword(e.target.value)
                              }
                              required
                            />
                          </Form.Group>
                          <br />

                          <Form.Group controlId="formFile" className="mb-3">
                            <FloatingLabel
                              controlId="floatingSelectGrid"
                              label="Role Name"
                            >
                              <Form.Select
                                aria-label="Floating label select example"
                                value={updateRoleid}
                                onChange={(e) =>
                                  setUpdateRoleid(e.target.value)
                                }
                              >
                                <option>select Role</option>
                                {role.map((items) => (
                                  <option
                                    key={items.ADMIN_ROLE_ID}
                                    value={items.ADMIN_ROLE_ID}
                                    selected={setUpdateRoleid}
                                  >
                                    {" "}
                                    {items.ADMIN_ROLE_NAME}{" "}
                                  </option>
                                ))}
                              </Form.Select>
                            </FloatingLabel>
                          </Form.Group>
                          <br />
                        </Form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleUpdateClose}>
                          Close
                        </Button>
                        <Button
                          variant="primary"
                          onClick={(e) => updateSubAdmin(e)}
                        >
                          Save Changes
                        </Button>
                      </Modal.Footer>
                    </Modal> */}
                    {/* //=+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+= */}

                    <DataTable
                      title="Sub-Admin Data"
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

export default SubAdmin;
