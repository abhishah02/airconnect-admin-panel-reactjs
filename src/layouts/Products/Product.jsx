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
import { FloatingLabel, OverlayTrigger, Tooltip } from "react-bootstrap";
// import Select from "react-select-2";

const Category = () => {
  const [search, setSearch] = useState("");

  const [data, setData] = useState([]);

  const [show, setShow] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);

  const handleInsertClose = () => setShow(false);
  const handleInsertShow = () => setShow(true);

  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [size, setSize] = useState(10);

  const handleUpdateClose = () => setShowUpdate(false);
  const handleUpdateShow = (row) => {
    setUpdateId(row);
    setUpdateCategoryId(row.CATEGORY_ID);
    setUpdateHsnId(row.HSN_ID);
    setUpdatePname(row.PRODUCT_NAME);
    setUpdatePrice(row.PRODUCT_PRICE);
    setUpdateDescription(row.PRODUCT_DESCRIPTION);
    setUpdateImage(row);
    setShowUpdate(true);
  };

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

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const columns = [
    {
      name: "PRODUCT ID",
      selector: (row) => row.PRODUCT_ID,
      sortable: true,
    },
    {
      name: "CATEGORY NAME",
      selector: (row) => row.CATEGORY_NAME,
      sortable: true,
    },
    {
      name: "HSN CODE",
      selector: (row) => row.HSN_CODE,
      sortable: false,
    },
    {
      name: "PRODUCT NAME",
      selector: (row) => row.PRODUCT_NAME,
      sortable: true,
    },
    {
      name: "PRODUCT DESCRIPTION",
      selector: (row) => row.PRODUCT_DESCRIPTION,
      sortable: false,
    },
    {
      name: "PRODUCT PRICE",
      selector: (row) => row.PRODUCT_PRICE,
      sortable: false,
    },
    {
      name: "CATEGORY IMAGE",
      cell: (row) => (
        <img
          src={"http://localhost:5000/" + row.PRODUCT_IMAGE}
          height="50px"
          width="65px"
          border-radius="50%"
          alt={row.PRODUCT_IMAGE}
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

  const fetchProducts = async () => {
    const items = JSON.parse(localStorage.getItem("Info"));
    let token = "bearer " + items.token;
    setLoading(true);

    //=+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+=
    //This API is manage page ,category details and pagination.

    await axios
      .get(
        `http://localhost:5000/getProduct?search=${search}&page=${page}&per_page=${size}&delay=1`,
        {
          headers: {
            Authorization: token,
            enctype: "multipart/form-data",
          },
        }
      )
      .then(function (res) {
        setData(res.data.data);
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
    //     `http://localhost:5000/getProduct?search=${search}&page=${page}&per_page=${newPerPage}&delay=1`,
    //     {
    //       headers: {
    //         Authorization: token,
    //         enctype: "multipart/form-data",
    //       },
    //     }
    //   )
    //   .then(function (response) {
    //     setData(response.data.data);
    //     setSize(newPerPage);
    //     setLoading(false);
    //   })
    //   .catch(function (err) {
    //     localStorage.removeItem("Info");
    //     window.location.reload();
    //   });
  };

  const fetchCategorys = async () => {
    const items = JSON.parse(localStorage.getItem("Info"));
    let token = "bearer " + items.token;

    //=+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+=
    //This API is use for get category name

    await axios
      .get(`http://localhost:5000/getCategoryData`, {
        headers: {
          Authorization: token,
          enctype: "multipart/form-data",
        },
      })
      .then(function (res) {
        setCname(res.data.data);
      })
      .catch(function (err) {
        localStorage.removeItem("Info");
        window.location.reload();
      });
  };

  //=+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+=

  const [hsnCode, setHsnCode] = useState([]);
  const fetchHsn = async () => {
    const items = JSON.parse(localStorage.getItem("Info"));
    let token = "bearer " + items.token;

    //=+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+=
    //This API is use for get category name

    await axios
      .get(`http://localhost:5000/getHsnData`, {
        headers: {
          Authorization: token,
          enctype: "multipart/form-data",
        },
      })
      .then(function (res) {
        setHsnCode(res.data.data);
      })
      .catch(function (err) {
        localStorage.removeItem("Info");
        window.location.reload();
      });
  };

  //delete data
  const handleDelete = async (row) => {
    const items = JSON.parse(localStorage.getItem("Info"));
    let token = "bearer " + items.token;
    // console.log(token);

    const result = await axios.post(
      `http://localhost:5000/deleteProduct`,
      {
        PRODUCT_ID: row.PRODUCT_ID,
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
      fetchProducts(1);
    } else {
      alert(res.msg);
    }
  };

  //=+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+=
  //This API is to store data using form.
  //insert data

  const [cname, setCname] = useState([]);
  const [pname, setPname] = useState("");
  const [hsnId, setHsnId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState([]);

  const imgChange = (e) => {
    setImg(e.target.files[0]);
  };

  const submitProduct = async (e) => {
    e.preventDefault();

    const items = JSON.parse(localStorage.getItem("Info"));
    let token = "bearer " + items.token;

    const formData = new FormData();
    formData.append("PRODUCT_ID", "");
    formData.append("CATEGORY_ID", categoryId);
    formData.append("HSN_ID", hsnId);
    formData.append("PRODUCT_NAME", pname);
    formData.append("PRODUCT_DESCRIPTION", description);
    formData.append("PRODUCT_PRICE", price);
    formData.append("PRODUCT_IMAGE", img);

    const result = await axios.post(
      "http://localhost:5000/insertEditProduct",
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
      toast.success(res.msg);
      setShow(false);
      setPname("");
      setDescription("");
      setPrice("");
      fetchProducts(1);
    } else {
      alert(res.msg);
    }
  };

  //update data

  const [updateId, setUpdateId] = useState("");
  const [updatePname, setUpdatePname] = useState("");
  // const [updateCname, setUpdateCname] = useState([])
  const [updateHsnId, setUpdateHsnId] = useState("");
  const [updateCategoryId, setUpdateCategoryId] = useState("");
  const [updateDescription, setUpdateDescription] = useState("");
  const [updatePrice, setUpdatePrice] = useState("");
  const [updateImage, setUpdateImage] = useState([]);

  const imgUpdateChange = (e) => {
    setUpdateImage(e.target.files[0]);
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    const items = JSON.parse(localStorage.getItem("Info"));
    let token = "bearer " + items.token;

    const formData = new FormData();
    formData.append("PRODUCT_ID", updateId.PRODUCT_ID);
    formData.append("CATEGORY_ID", updateCategoryId);
    formData.append("HSN_ID", updateHsnId);
    formData.append("PRODUCT_NAME", updatePname);
    formData.append("PRODUCT_PRICE", updatePrice);
    formData.append("PRODUCT_DESCRIPTION", updateDescription);
    formData.append("PRODUCT_IMAGE", updateImage);

    //result api
    const result = await axios.post(
      "http://localhost:5000/insertEditProduct",
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
      fetchProducts(1);
    } else {
      alert(res.msg);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search, page]);

  useEffect(() => {
    // fetchProducts(1); //fetch page 1 of categorys
    fetchCategorys();
    fetchHsn();
  }, []);

  //=+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+=

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
                      <i class="fe fe-plus me-1"></i>Add New Product
                    </button>
                    {/* //=+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+= */}

                    {/* insert product form */}
                    <Modal show={show} onHide={handleInsertClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Insert Product Data Form</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form method="POST" enctype="multipart/form-data">
                          <Form.Group controlId="formFile" className="mb-3">
                            <FloatingLabel
                              controlId="floatingSelectGrid"
                              label="Category Name"
                            >
                              <Form.Select
                                aria-label="Floating label select example"
                                onChange={(e) => setCategoryId(e.target.value)}
                              >
                                <option>select category</option>
                                {cname.map((items) => (
                                  <option
                                    key={items.CATEGORY_ID}
                                    value={items.CATEGORY_ID}
                                  >
                                    {" "}
                                    {items.CATEGORY_NAME}{" "}
                                  </option>
                                ))}
                              </Form.Select>
                            </FloatingLabel>
                          </Form.Group>
                          <br />
                          <Form.Group controlId="formFile" className="mb-3">
                            <FloatingLabel
                              controlId="floatingSelectGrid"
                              label="HSN Code"
                            >
                              <Form.Select
                                aria-label="Floating label select example"
                                onChange={(e) => setHsnId(e.target.value)}
                              >
                                <option>select HSN Code</option>
                                {hsnCode.map((items) => (
                                  <option
                                    key={items.HSN_ID}
                                    value={items.HSN_ID}
                                  >
                                    {" "}
                                    {items.HSN_CODE}{" "}
                                  </option>
                                ))}
                              </Form.Select>
                            </FloatingLabel>
                          </Form.Group>
                          <br />
                          <Form.Group controlId="formFile" className="mb-3">
                            <Form.Control
                              placeholder="Product Name"
                              type="text"
                              value={pname}
                              onChange={(e) => setPname(e.target.value)}
                              required
                            />
                          </Form.Group>
                          <br />

                          <Form.Group controlId="formFile" className="mb-3">
                            <Form.Control
                              placeholder="Product Description"
                              type="text"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              required
                            />
                          </Form.Group>
                          <br />
                          <Form.Group controlId="formFile" className="mb-3">
                            <Form.Control
                              placeholder="Product Price"
                              type="text"
                              value={price}
                              onChange={(e) => setPrice(e.target.value)}
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
                          onClick={(e) => submitProduct(e)}
                        >
                          Save Changes
                        </Button>
                      </Modal.Footer>
                    </Modal>
                    {/* //=+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+= */}

                    {/* update product form */}
                    <Modal show={showUpdate} onHide={handleUpdateClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Update Data Form</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form method="POST" enctype="multipart/form-data">
                          <Form.Group controlId="formFile" className="mb-3">
                            <FloatingLabel
                              controlId="floatingSelectGrid"
                              label="Category Name"
                            >
                              <Form.Select
                                aria-label="Floating label select example"
                                value={updateCategoryId}
                                onChange={(e) =>
                                  setUpdateCategoryId(e.target.value)
                                }
                              >
                                <option>select category</option>
                                {cname.map((item) => (
                                  <option
                                    key={item.CATEGORY_ID}
                                    value={item.CATEGORY_ID}
                                    selected={setUpdateCategoryId}
                                  >
                                    {" "}
                                    {item.CATEGORY_NAME}{" "}
                                  </option>
                                ))}
                              </Form.Select>
                            </FloatingLabel>
                          </Form.Group>
                          <br />
                          <Form.Group controlId="formFile" className="mb-3">
                            <FloatingLabel
                              controlId="floatingSelectGrid"
                              label="HSN Code"
                            >
                              <Form.Select
                                aria-label="Floating label select example"
                                value={updateHsnId}
                                onChange={(e) => setUpdateHsnId(e.target.value)}
                              >
                                <option>select HSN Code</option>
                                {hsnCode.map((items) => (
                                  <option
                                    key={items.HSN_ID}
                                    value={items.HSN_ID}
                                    selected={setUpdateHsnId}
                                  >
                                    {" "}
                                    {items.HSN_CODE}{" "}
                                  </option>
                                ))}
                              </Form.Select>
                            </FloatingLabel>
                          </Form.Group>
                          <br />

                          <Form.Group controlId="formFile" className="mb-3">
                            <Form.Control
                              placeholder="Product name"
                              type="text"
                              value={updatePname}
                              onChange={(e) => setUpdatePname(e.target.value)}
                            />
                          </Form.Group>
                          <br />

                          <Form.Group controlId="formFile" className="mb-3">
                            <Form.Control
                              placeholder="Product description"
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
                              placeholder="Product Price"
                              type="text"
                              value={updatePrice}
                              onChange={(e) => setUpdatePrice(e.target.value)}
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
                          onClick={(e) => updateProduct(e)}
                        >
                          Save Changes
                        </Button>
                      </Modal.Footer>
                    </Modal>
                    {/* //=+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+= */}
                    <DataTable
                      title="Products"
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
