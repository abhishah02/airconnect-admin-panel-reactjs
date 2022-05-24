/* eslint-disable react/style-prop-object */
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
import { useNavigate } from "react-router-dom";

//components
import Footer from "../components/Footer";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";

//react-bootstrap libraries
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import DataTable from "react-data-table-component";

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
        width="50px"
        alt={row.name}
      />
    ),
  },
];

const Category = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [size, setSize] = useState(10);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let navigate = useNavigate();

  const fetchCategorys = async (page) => {
    const items = JSON.parse(localStorage.getItem("Info"));
    let token = "bearer " + items.token;
    setLoading(true);

    //=+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+=
    //This API is manage page ,category details and pagination.

    await axios
      .get(
        `http://localhost:5000/getCategory?page=${page}&per_page=${size}&delay=1`,
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
    fetchCategorys(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    const items = JSON.parse(localStorage.getItem("Info"));
    let token = "bearer " + items.token;
    setLoading(true);

    await axios
      .get(
        `http://localhost:5000/getCategory?page=${page}&per_page=${newPerPage}&delay=1`,
        {
          headers: {
            Authorization: token,
            enctype: "multipart/form-data",
          },
        }
      )
      .then(function (response) {
        setData(response.data.data);
        setSize(newPerPage);
        setLoading(false);
      })
      .catch(function (err) {
        localStorage.removeItem("Info");
        window.location.reload();
      });

    // if (response) {
    //   setData(response.data.data);
    //   setSize(newPerPage);
    //   setLoading(false);
    // } else {
    //   navigate("/");
    // }
  };

  useEffect(() => {
    // submitCategory();
    fetchCategorys(1); //fetch page 1 of categorys
  }, []);

  //=+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+=
  //This API is to store data using form.

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
      fetchCategorys(1);
    } else {
      alert(res.msg);
    }
  };

  return (
    <>
      <Header />
      <SideMenu />
      <br />
      {console.log(totalRows)}{" "}
      <div class="main-content side-content pt-0">
        <div class="side-app">
          <div class="main-container container-fluid">
            <div class="row">
              <div class="col-lg-12">
                <div class="card custom-card">
                  <div class="card-header rounded-bottom-0 my-3">
                    <h3 class="card-title">Category Types</h3>
                  </div>

                  <div class="card-body">
                    <button
                      class="btn btn-primary mb-4"
                      data-bs-target="#createfile"
                      data-bs-toggle="modal"
                      onClick={handleShow}
                    >
                      <i class="fe fe-plus me-1"></i>Add New Category
                    </button>
                    <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Form</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form method="POST" enctype="multipart/form-data">
                          <Form.Group controlId="formFile" className="mb-3">
                            <Form.Control
                              placeholder="Category name"
                              type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                          </Form.Group>
                          <br />

                          <Form.Group controlId="formFile" className="mb-3">
                            <Form.Control
                              placeholder="Category description"
                              type="text"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                            />
                          </Form.Group>
                          <br />

                          <Form.Group controlId="formFile" className="mb-3">
                            <Form.Control
                              type="file"
                              size="lg"
                              placeholder="Category Image"
                              onChange={imgChange}
                            />
                          </Form.Group>
                        </Form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
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
                    <DataTable
                      title="Category"
                      columns={columns}
                      data={data}
                      progressPending={loading}
                      pagination
                      fixedHeader={true}
                      fixedHeaderScrollHeight="480px"
                      paginationServer
                      paginationTotalRows={totalRows}
                      onChangeRowsPerPage={handlePerRowsChange}
                      onChangePage={handlePageChange}
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

// export default {
//   title: "Pagination/Category",
//   component: Category,
//   parameters: {
//     docs: {
//       page: doc,
//     },
//   },
// };
