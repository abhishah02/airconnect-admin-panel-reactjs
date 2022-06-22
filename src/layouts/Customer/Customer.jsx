import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";

//react-bootstrap libraries
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import DataTable from "react-data-table-component";
import { FloatingLabel, OverlayTrigger, Tooltip } from "react-bootstrap";

//components
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SideMenu from "../../components/SideMenu";

const Customer = () => {
  const [search, setSearch] = useState("");

  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  // const [size, setSize] = useState(10);

  //form open and close
  const [show, setShow] = useState(false);
  const handleInsertClose = () => {
    setUpdateId("");
    setName("");
    setNumberOne("");
    setNumbertwo("");
    setAddress("");
    setStateId("");
    setCityId("");
    setShow(false);
  };
  const handleInsertShow = () => setShow(true);

  // const [showUpdate, setShowUpdate] = useState(false);
  // const handleUpdateClose = () => setShowUpdate(false);
  const handleUpdateShow = (row) => {
    setUpdateId(row.CUSTOMER_ID);
    setName(row.CUSTOMER_NAME);
    setNumberOne(row.CUSTOMER_PHONE_NO);
    setNumbertwo(row.CUSTOMER_WHATSAPP_NO);
    setAddress(row.CUSTOMER_ADDRESS);
    setStateId(row.STATE_ID);
    setCityId(row.CITY_ID);
    setShow(true);
  };

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const editTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Edit
    </Tooltip>
  );
  const deleteTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Delete
    </Tooltip>
  );

  const columns = [
    {
      name: "ID",
      selector: (row) => row.CUSTOMER_ID,
      sortable: false,
    },
    {
      name: "CUSTOMER NAME",
      selector: (row) => row.CUSTOMER_NAME,
      sortable: true,
    },
    {
      name: "PHONE NO",
      selector: (row) => row.CUSTOMER_PHONE_NO,
      sortable: false,
    },
    {
      name: "WHATSAPP NO",
      selector: (row) => row.CUSTOMER_WHATSAPP_NO,
      sortable: false,
    },
    {
      name: "ADDRESS",
      selector: (row) => row.CUSTOMER_ADDRESS,
      sortable: true,
    },
    {
      name: "CITY",
      selector: (row) => row.CITY_NAME,
      sortable: false,
    },
    {
      name: "STATE",
      selector: (row) => row.STATE_NAME,
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
              onClick={() => handleUpdateShow(row)}
            ></i>
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

  const fetchCustomer = async () => {
    const items = JSON.parse(localStorage.getItem("Info"));
    let token = "bearer " + items.token;
    setLoading(true);

    //=+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+=
    //This API is manage page ,Customer details and pagination.

    await axios
      .get(
        `http://localhost:5000/getCustomer?search=${search}&page=${page}&per_page=${perPage}&delay=1`,
        {
          headers: {
            Authorization: token,
            enctype: "multipart/form-data",
          },
        }
      )
      .then(function (res) {
        setData(res.data.data);
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

  const [stateName, setStateName] = useState([]);

  const fetchStates = async () => {
    const items = JSON.parse(localStorage.getItem("Info"));
    let token = "bearer " + items.token;

    await axios
      .get(`http://localhost:5000/getStateData`, {
        headers: {
          Authorization: token,
        },
      })
      .then(function (res) {
        setStateName(res.data.data);
      })
      .catch(function (err) {
        localStorage.removeItem("Info");
        window.location.reload();
      });
  };

  //=+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+=
  //This API is use for get state name

  const [cityName, setCityName] = useState([]);

  const fetchCities = async () => {
    const items = JSON.parse(localStorage.getItem("Info"));
    let token = "bearer " + items.token;

    await axios
      .post(
        `http://localhost:5000/getCityData`,
        {
          STATE_ID: stateId,
          // USTATE_ID: updateStatesId,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then(function (res) {
        // alert(stateId);
        setCityName(res.data.data);
      })
      .catch(function (err) {
        localStorage.removeItem("Info");
        window.location.reload();
      });
  };

  //=+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+=
  //This API is use for get updated city name

  // const [updateCityName, setUpdateCityName] = useState([]);

  // const fetchUpdatedCities = async () => {
  //   const items = JSON.parse(localStorage.getItem("Info"));
  //   let token = "bearer " + items.token;

  //   await axios
  //     .post(
  //       `http://localhost:5000/getCityData`,
  //       {
  //         STATE_ID: updateStatesId,
  //       },
  //       {
  //         headers: {
  //           Authorization: token,
  //         },
  //       }
  //     )
  //     .then(function (res) {
  //       // alert(stateId);
  //       setUpdateCityName(res.data.data);
  //     })
  //     .catch(function (err) {
  //       localStorage.removeItem("Info");
  //       window.location.reload();
  //     });
  // };

  //=+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+=
  //This API is to store data using form.
  //insert data

  const [updateId, setUpdateId] = useState("");
  const [name, setName] = useState("");
  const [numberOne, setNumberOne] = useState("");
  const [numberTwo, setNumbertwo] = useState("");
  const [address, setAddress] = useState("");
  const [stateId, setStateId] = useState("");
  const [cityId, setCityId] = useState("");

  // const [states, setStates] = useState("");

  const submitCustomer = async (e) => {
    e.preventDefault();
    const items = JSON.parse(localStorage.getItem("Info"));
    let token = "bearer " + items.token;

    const result = await axios.post(
      "http://localhost:5000/insertEditCustomer",
      JSON.stringify({
        CUSTOMER_ID: updateId,
        CUSTOMER_NAME: name,
        CUSTOMER_PHONE_NO: numberOne,
        CUSTOMER_WHATSAPP_NO: numberTwo,
        CUSTOMER_ADDRESS: address,
        STATE_ID: stateId,
        CITY_ID: cityId,
      }),
      {
        headers: {
          "Content-type": "application/json",
          Authorization: token,
        },
      }
    );
    let res = await result.data;
    console.log(res);
    if (res.st) {
      // alert(res.msg);
      toast.success(res.msg);
      setShow(false);
      setUpdateId("");
      setName("");
      setNumberOne("");
      setNumbertwo("");
      setAddress("");
      setStateId("");
      setCityId("");
      fetchCustomer();
    } else {
      alert(res.msg);
    }
  };

  //delete data

  const handleDelete = async (row) => {
    const items = JSON.parse(localStorage.getItem("Info"));
    let token = "bearer " + items.token;

    const result = await axios.post(
      `http://localhost:5000/deleteCategory`,
      {
        CUSTOMER_ID: row.CUSTOMER_ID,
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
      fetchCustomer(1);
    } else {
      alert(res.msg);
    }
  };

  // update data

  // const [updateName, setUpdateName] = useState("");
  // const [updateNumberOne, setUpdateNumberOne] = useState("");
  // const [updateNumberTwo, setUpdateNumbertwo] = useState("");
  // const [updateAddress, setUpdateAddress] = useState("");
  // const [updateCityId, setUpdateCityId] = useState("");
  // const [updateStatesId, setUpdateStatesId] = useState("");

  // const updateCustomer = async (e) => {
  //   e.preventDefault();
  //   const items = JSON.parse(localStorage.getItem("Info"));
  //   let token = "bearer " + items.token;

  //   const result = await axios.post(
  //     "http://localhost:5000/insertEditCustomer",
  //     JSON.stringify({
  //       CUSTOMER_ID: updateId.CUSTOMER_ID,
  //       CUSTOMER_NAME: updateName,
  //       CUSTOMER_PHONE_NO: updateNumberOne,
  //       CUSTOMER_WHATSAPP_NO: updateNumberTwo,
  //       CUSTOMER_ADDRESS: updateAddress,
  //       CITY_ID: updateCityId,
  //       STATE_ID: updateStatesId,
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
  //     fetchCustomer(1);
  //   } else {
  //     alert(res.msg);
  //   }
  // };

  useEffect(() => {
    fetchCustomer();
  }, [search, page, perPage]);

  // useEffect(() => {
  //   fetchCustomer(1); //fetch page 1 of categorys
  // }, []);

  useEffect(() => {
    fetchStates();
    fetchCities();
    // fetchUpdatedCities();
  }, [stateId]);
  // updateStatesId

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
                      <i class="fe fe-plus me-1"></i>Add New Customer
                    </button>
                    {/* //=+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+= */}

                    {/* insert category form */}
                    <Modal show={show} onHide={handleInsertClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Insert Data Form</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form method="POST" enctype="multipart/form-data">
                          <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Customer Name</Form.Label>
                            <Form.Control
                              placeholder="Customer Name"
                              type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              required
                            />
                          </Form.Group>
                          <br />

                          <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Customer Phone No.-1</Form.Label>
                            <Form.Control
                              placeholder="Customer Phone No.-1"
                              type="text"
                              value={numberOne}
                              onChange={(e) => setNumberOne(e.target.value)}
                              required
                            />
                          </Form.Group>
                          <br />

                          <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Customer Whatsapp No.-2</Form.Label>
                            <Form.Control
                              placeholder="Customer Whatsapp No.-2"
                              type="text"
                              value={numberTwo}
                              onChange={(e) => setNumbertwo(e.target.value)}
                              required
                            />
                          </Form.Group>
                          <br />

                          <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Customer Address</Form.Label>
                            <Form.Control
                              placeholder="Customer Address"
                              type="text"
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                              required
                            />
                          </Form.Group>
                          <br />

                          <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Customer State Name</Form.Label>
                            <FloatingLabel
                              controlId="floatingSelectGrid"
                              label="Customer State Name"
                            >
                              <Form.Select
                                aria-label="Floating label select example"
                                value={stateId}
                                onChange={(e) => setStateId(e.target.value)}
                              >
                                <option>select state</option>
                                {stateName.map((items) => (
                                  <option
                                    key={items.STATE_ID}
                                    value={items.STATE_ID}
                                    selected={setStateId}
                                  >
                                    {" "}
                                    {items.STATE_NAME}{" "}
                                  </option>
                                ))}
                              </Form.Select>
                            </FloatingLabel>
                          </Form.Group>
                          <br />

                          <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Customer City Name</Form.Label>
                            <FloatingLabel
                              controlId="floatingSelectGrid"
                              label="Customer City Name"
                            >
                              <Form.Select
                                aria-label="Floating label select example"
                                value={cityId}
                                onChange={(e) => setCityId(e.target.value)}
                              >
                                <option>select city</option>
                                {cityName.map((items) => (
                                  <option
                                    key={items.CITY_ID}
                                    value={items.CITY_ID}
                                    selected={setCityId}
                                  >
                                    {" "}
                                    {items.CITY_NAME}{" "}
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
                          onClick={(e) => submitCustomer(e)}
                        >
                          Save Changes
                        </Button>
                      </Modal.Footer>
                    </Modal>

                    {/* update Customer form */}
                    {/* <Modal show={showUpdate} onHide={handleUpdateClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Update Data Form</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form method="POST" enctype="multipart/form-data">
                          <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Customer Name</Form.Label>
                            <Form.Control
                              placeholder="Customer Name"
                              type="text"
                              value={updateName}
                              onChange={(e) => setUpdateName(e.target.value)}
                              required
                            />
                          </Form.Group>
                          <br />

                          <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Customer Phone No.-</Form.Label>
                            <Form.Control
                              placeholder="Customer Phone No.-1"
                              type="text"
                              value={updateNumberOne}
                              onChange={(e) =>
                                setUpdateNumberOne(e.target.value)
                              }
                              required
                            />
                          </Form.Group>
                          <br />

                          <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Customer Whatsapp No.-2</Form.Label>
                            <Form.Control
                              placeholder="Customer Whatsapp No.-2"
                              type="text"
                              value={updateNumberTwo}
                              onChange={(e) =>
                                setUpdateNumbertwo(e.target.value)
                              }
                              required
                            />
                          </Form.Group>
                          <br />

                          <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Customer Address</Form.Label>
                            <Form.Control
                              placeholder="Customer Address"
                              type="text"
                              value={updateAddress}
                              onChange={(e) => setUpdateAddress(e.target.value)}
                              required
                            />
                          </Form.Group>
                          <br />

                          <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Customer State Name</Form.Label>
                            <FloatingLabel
                              controlId="floatingSelectGrid"
                              label="Customer State Name"
                            >
                              <Form.Select
                                aria-label="Floating label select example"
                                value={updateStatesId}
                                onChange={(e) =>
                                  setUpdateStatesId(e.target.value)
                                }
                              >
                                <option>select state</option>
                                {stateName.map((items) => (
                                  <option
                                    key={items.STATE_ID}
                                    value={items.STATE_ID}
                                    selected={setUpdateStatesId}
                                  >
                                    {" "}
                                    {items.STATE_NAME}{" "}
                                  </option>
                                ))}
                              </Form.Select>
                            </FloatingLabel>
                          </Form.Group>
                          <br />

                          <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Customer City Name</Form.Label>
                            <FloatingLabel
                              controlId="floatingSelectGrid"
                              label="Customer City Name"
                            >
                              <Form.Select
                                aria-label="Floating label select example"
                                value={updateCityId}
                                onChange={(e) =>
                                  setUpdateCityId(e.target.value)
                                }
                              >
                                <option>select city</option>
                                {updateCityName.map((items) => (
                                  <option
                                    key={items.CITY_ID}
                                    value={items.CITY_ID}
                                    selected={setUpdateCityId}
                                  >
                                    {" "}
                                    {items.CITY_NAME}{" "}
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
                          onClick={(e) => updateCustomer(e)}
                        >
                          Save Changes
                        </Button>
                      </Modal.Footer>
                    </Modal> */}
                    {/* //=+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+= */}

                    <DataTable
                      title="Customer"
                      columns={columns}
                      data={data}
                      progressPending={loading}
                      pagination
                      fixedHeader={true}
                      fixedHeaderScrollHeight="500px"
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

export default Customer;
