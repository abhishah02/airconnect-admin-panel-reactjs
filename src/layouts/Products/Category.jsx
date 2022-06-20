/* eslint-disable react/style-prop-object */
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
// import { useNavigate } from "react-router-dom";

//components
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SideMenu from "../../components/SideMenu";

//react-bootstrap libraries
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import DataTable from "react-data-table-component";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const Category = () => {
  const [search, setSearch] = useState("");

  const [data, setData] = useState([]);
  // const [filterData, setFilterData] = useState([]);

  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [size, setSize] = useState(10);

  //form open and close
  const [show, setShow] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);

  const handleInsertClose = () => setShow(false);
  const handleInsertShow = () => setShow(true);

  const handleUpdateClose = () => setShowUpdate(false);
  const handleUpdateShow = (row) => {
    setUpdateId(row);
    setUpdateName(row.CATEGORY_NAME);
    setUpdateDescription(row.CATEGORY_DESCRIPTION);
    setUpdateImage(row);
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
      name: "CATEGORY ID",
      selector: (row) => row.CATEGORY_ID,
      sortable: false,
    },
    {
      name: "CATEGORY NAME",
      selector: (row) => row.CATEGORY_NAME,
      sortable: true,
    },
    {
      name: "CATEGORY DESCRIPTION",
      selector: (row) => row.CATEGORY_DESCRIPTION,
      sortable: false,
    },
    {
      name: "CATEGORY IMAGE",
      cell: (row) => (
        <img
          src={"http://localhost:5000/" + row.DESCRIPTION_IMAGE}
          height="50px"
          width="65px"
          border-radius="50%"
          alt={row.DESCRIPTION_IMAGE}
        />
      ),
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

  const fetchCategorys = async () => {
    const items = JSON.parse(localStorage.getItem("Info"));
    let token = "bearer " + items.token;
    setLoading(true);

    //=+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+=
    //This API is manage page ,category details and pagination.

    await axios
      .get(
        `http://localhost:5000/getCategory?search=${search}&page=${page}&per_page=${size}&delay=1`,
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
    // const items = JSON.parse(localStorage.getItem("Info"));
    // let token = "bearer " + items.token;
    // setLoading(true);

    // await axios
    //   .get(
    //     `http://localhost:5000/getCategory?search=${search}&page=${page}&per_page=${newPerPage}&delay=1`,
    //     {
    //       headers: {
    //         Authorization: token,
    //         enctype: "multipart/form-data",
    //       },
    //     }
    //   )
    //   .then(function (response) {
    //     setData(response.data.data);
    //     // setFilterData(response.data.data);
    //     setSize(newPerPage);
    //     setLoading(false);
    //   })
    //   .catch(function (err) {
    //     localStorage.removeItem("Info");
    //     window.location.reload();
    //   });
  };

  //=+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+=
  //This API is to store data using form.
  //insert data

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState([]);

  const imgChange = (e) => {
    setImg(e.target.files[0]);
  };

  // const notify = () => toast("Insert data successfully!");
  const submitCategory = async (e) => {
    e.preventDefault();
    const items = JSON.parse(localStorage.getItem("Info"));
    let token = "bearer " + items.token;

    const formData = new FormData();
    formData.append("CATEGORY_NAME", name);
    formData.append("CATEGORY_DESCRIPTION", description);
    formData.append("DESCRIPTION_IMAGE", img);

    const result = await axios.post(
      "http://localhost:5000/Category",
      formData,
      {
        method: "POST",
        headers: {
          Authorization: token,
          enctype: "multipart/form-data",
        },
      }
    );
    let res = await result.data;
    console.log(res);
    if (res.st) {
      // alert(res.msg);
      toast.success(res.msg);
      setShow(false);
      setName("");
      setDescription("");
      fetchCategorys(1);
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
        CATEGORY_ID: row.CATEGORY_ID,
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
      fetchCategorys(1);
    } else {
      alert(res.msg);
    }
  };

  // update data

  const [updateId, setUpdateId] = useState("");
  const [updateName, setUpdateName] = useState("");
  const [updateDescription, setUpdateDescription] = useState("");
  const [updateImage, setUpdateImage] = useState([]);

  const imgUpdateChange = (e) => {
    setUpdateImage(e.target.files[0]);
  };

  const updateCategory = async (e) => {
    e.preventDefault();
    const items = JSON.parse(localStorage.getItem("Info"));
    let token = "bearer " + items.token;

    const formData = new FormData();
    formData.append("CATEGORY_ID", updateId.CATEGORY_ID);
    formData.append("CATEGORY_NAME", updateName);
    formData.append("CATEGORY_DESCRIPTION", updateDescription);
    formData.append("DESCRIPTION_IMAGE", updateImage);

    const result = await axios.post(
      "http://localhost:5000/updateCategory",
      formData,
      {
        method: "POST",
        headers: {
          Authorization: token,
          enctype: "multipart/form-data",
        },
      }
    );
    let res = await result.data;
    console.log(res);
    if (res.st) {
      // alert(res.msg);
      toast.success(res.msg);
      setShowUpdate(false);
      fetchCategorys();
    } else {
      alert(res.msg);
    }
  };

  useEffect(() => {
    fetchCategorys();
  }, [search, page]);

  // useEffect(() => {
  //   fetchCategorys(1); //fetch page 1 of categorys
  // }, []);

  return (
    <>
      <Header />
      <SideMenu />
      <br />
      {/* {console.log(totalRows)}{" "} */}
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
                      <i class="fe fe-plus me-1"></i>Add New Category
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
                              placeholder="Category name"
                              type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              required
                            />
                          </Form.Group>
                          <br />

                          <Form.Group controlId="formFile" className="mb-3">
                            <Form.Control
                              placeholder="Category description"
                              type="text"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              required
                            />
                          </Form.Group>
                          <br />

                          <Form.Group controlId="formFile" className="mb-3">
                            <Form.Control
                              type="file"
                              size="lg"
                              placeholder="Category Image"
                              onChange={imgChange}
                              required
                            />
                          </Form.Group>
                        </Form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleInsertClose}>
                          Close
                        </Button>
                        <Button
                          variant="primary"
                          onClick={(e) => submitCategory(e)}
                        >
                          Save Changes
                        </Button>
                      </Modal.Footer>
                    </Modal>
                    {/* //=+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+= */}

                    {/* update category form */}
                    <Modal show={showUpdate} onHide={handleUpdateClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Update Data Form</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form method="POST" enctype="multipart/form-data">
                          <Form.Group controlId="formFile" className="mb-3">
                            <Form.Control
                              placeholder="Category name"
                              type="text"
                              value={updateName}
                              onChange={(e) => setUpdateName(e.target.value)}
                            />
                          </Form.Group>
                          <br />

                          <Form.Group controlId="formFile" className="mb-3">
                            <Form.Control
                              placeholder="Category description"
                              type="text"
                              value={updateDescription}
                              onChange={(e) =>
                                setUpdateDescription(e.target.value)
                              }
                            />
                          </Form.Group>
                          <br />

                          <Form.Group controlId="formFile" className="mb-3">
                            <Form.Control
                              type="file"
                              size="lg"
                              placeholder="Category Image"
                              onChange={imgUpdateChange}
                            />
                          </Form.Group>
                        </Form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleUpdateClose}>
                          Close
                        </Button>
                        <Button
                          variant="primary"
                          onClick={(e) => updateCategory(e)}
                        >
                          Save Changes
                        </Button>
                      </Modal.Footer>
                    </Modal>
                    {/* //=+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+= */}
                    <DataTable
                      title="Category"
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
      {/* <!-- End Row --> */}
      <Footer />
    </>
  );
};

export default Category;
