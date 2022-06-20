import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";

//react-bootstrap libraries
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import DataTable from "react-data-table-component";

//components
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SideMenu from "../../components/SideMenu";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const HsnMaster = () => {
  const [search, setSearch] = useState("");

  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [size, setSize] = useState(10);

  //form open and close
  const [show, setShow] = useState(false);
  const handleInsertClose = () => setShow(false);
  const handleInsertShow = () => setShow(true);

  const [showUpdate, setShowUpdate] = useState(false);
  const handleUpdateClose = () => setShowUpdate(false);
  const handleUpdateShow = (row) => {
    setUpdateId(row);
    setUpdateCode(row.HSN_CODE);
    setUpdateIgst(row.IGST);
    setUpdateCgst(row.CGST);
    setUpdateSgst(row.SGST);
    setUpdateDescription(row.DESCRIPTION);

    setShowUpdate(true);
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
      name: "HSN ID",
      selector: (row) => row.HSN_ID,
      sortable: false,
    },
    {
      name: "HSN CODE",
      selector: (row) => row.HSN_CODE,
      sortable: true,
    },
    {
      name: "I-GST",
      selector: (row) => row.IGST,
      sortable: false,
    },
    {
      name: "C-GST",
      selector: (row) => row.CGST,
      sortable: false,
    },
    {
      name: "S-GST",
      selector: (row) => row.SGST,
      sortable: true,
    },
    {
      name: "DESCRIPTION",
      selector: (row) => row.DESCRIPTION,
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

  const fetchHSN = async () => {
    const items = JSON.parse(localStorage.getItem("Info"));
    let token = "bearer " + items.token;
    setLoading(true);

    //=+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+=
    //This API is manage page ,Customer details and pagination.

    await axios
      .get(
        `http://localhost:5000/getHSN?search=${search}&page=${page}&per_page=${size}&delay=1`,
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
  //This API is to store data using form.
  //insert data

  const [code, setCode] = useState("");
  const [igst, setIgst] = useState("");
  const [cgst, setCgst] = useState("");
  const [sgst, setSgst] = useState("");
  const [description, setDescription] = useState("");

  const submitHSN = async (e) => {
    e.preventDefault();
    const items = JSON.parse(localStorage.getItem("Info"));
    let token = "bearer " + items.token;

    const result = await axios.post(
      "http://localhost:5000/addHsn",
      JSON.stringify({
        HSN_CODE: code,
        IGST: igst,
        CGST: cgst,
        SGST: sgst,
        DESCRIPTION: description,
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
      setCode("");
      setIgst("");
      setCgst("");
      setSgst("");
      setDescription("");
      fetchHSN(1);
    } else {
      alert(res.msg);
    }
  };

  //update

  const [updateId, setUpdateId] = useState("");

  const [updateCode, setUpdateCode] = useState("");
  const [updateIgst, setUpdateIgst] = useState("");
  const [updateCgst, setUpdateCgst] = useState("");
  const [updateSgst, setUpdateSgst] = useState("");
  const [updateCescription, setUpdateDescription] = useState("");

  const updateHSN = async (e) => {
    e.preventDefault();
    const items = JSON.parse(localStorage.getItem("Info"));
    let token = "bearer " + items.token;

    const result = await axios.post(
      "http://localhost:5000/updateHsn",
      JSON.stringify({
        HSN_ID: updateId.HSN_ID,
        HSN_CODE: updateCode,
        IGST: updateIgst,
        CGST: updateCgst,
        SGST: updateSgst,
        DESCRIPTION: updateCescription,
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
      setShowUpdate(false);
      fetchHSN(1);
    } else {
      alert(res.msg);
    }
  };

  //delete data

  const handleDelete = async (row) => {
    const items = JSON.parse(localStorage.getItem("Info"));
    let token = "bearer " + items.token;

    const result = await axios.post(
      `http://localhost:5000/deleteHsn`,
      {
        HSN_ID: row.HSN_ID,
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
      fetchHSN(1);
    } else {
      alert(res.msg);
    }
  };

  useEffect(() => {
    fetchHSN();
  }, [search, page]);

  // useEffect(() => {
  //   fetchHSN(1); //fetch page 1 of categorys
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
                    <button
                      class="btn btn-primary mb-4"
                      data-bs-target="#createfile"
                      data-bs-toggle="modal"
                      onClick={handleInsertShow}
                    >
                      <i class="fe fe-plus me-1"></i>Add New HSN
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
                            <Form.Control
                              placeholder="HSN Code"
                              type="text"
                              value={code}
                              onChange={(e) => setCode(e.target.value)}
                              required
                            />
                          </Form.Group>
                          <br />

                          <Form.Group controlId="formFile" className="mb-3">
                            <Form.Control
                              placeholder="IGST"
                              type="text"
                              value={igst}
                              onChange={(e) => setIgst(e.target.value)}
                              required
                            />
                          </Form.Group>
                          <br />

                          <Form.Group controlId="formFile" className="mb-3">
                            <Form.Control
                              placeholder="CGST"
                              type="text"
                              value={cgst}
                              onChange={(e) => setCgst(e.target.value)}
                              required
                            />
                          </Form.Group>
                          <br />

                          <Form.Group controlId="formFile" className="mb-3">
                            <Form.Control
                              placeholder="SGST"
                              type="text"
                              value={sgst}
                              onChange={(e) => setSgst(e.target.value)}
                              required
                            />
                          </Form.Group>
                          <br />

                          <Form.Group controlId="formFile" className="mb-3">
                            <Form.Control
                              placeholder="Description"
                              type="text"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              required
                            />
                          </Form.Group>
                          <br />
                        </Form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleInsertClose}>
                          Close
                        </Button>
                        <Button variant="primary" onClick={(e) => submitHSN(e)}>
                          Save Changes
                        </Button>
                      </Modal.Footer>
                    </Modal>
                    {/* //=+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+= */}
                    {/* Update HSN form */}
                    <Modal show={showUpdate} onHide={handleUpdateClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Update Data Form</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form method="POST" enctype="multipart/form-data">
                          <Form.Group controlId="formFile" className="mb-3">
                            <Form.Control
                              placeholder="HSN Code"
                              type="text"
                              value={updateCode}
                              onChange={(e) => setUpdateCode(e.target.value)}
                              required
                            />
                          </Form.Group>
                          <br />

                          <Form.Group controlId="formFile" className="mb-3">
                            <Form.Control
                              placeholder="IGST"
                              type="text"
                              value={updateIgst}
                              onChange={(e) => setUpdateIgst(e.target.value)}
                              required
                            />
                          </Form.Group>
                          <br />

                          <Form.Group controlId="formFile" className="mb-3">
                            <Form.Control
                              placeholder="CGST"
                              type="text"
                              value={updateCgst}
                              onChange={(e) => setUpdateCgst(e.target.value)}
                              required
                            />
                          </Form.Group>
                          <br />

                          <Form.Group controlId="formFile" className="mb-3">
                            <Form.Control
                              placeholder="SGST"
                              type="text"
                              value={updateSgst}
                              onChange={(e) => setUpdateSgst(e.target.value)}
                              required
                            />
                          </Form.Group>
                          <br />

                          <Form.Group controlId="formFile" className="mb-3">
                            <Form.Control
                              placeholder="Description"
                              type="text"
                              value={updateCescription}
                              onChange={(e) =>
                                setUpdateDescription(e.target.value)
                              }
                              required
                            />
                          </Form.Group>
                          <br />
                        </Form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleUpdateClose}>
                          Close
                        </Button>
                        <Button variant="primary" onClick={(e) => updateHSN(e)}>
                          Save Changes
                        </Button>
                      </Modal.Footer>
                    </Modal>
                    {/* //=+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+= */}

                    <DataTable
                      title="HSN-MASTER"
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

export default HsnMaster;
