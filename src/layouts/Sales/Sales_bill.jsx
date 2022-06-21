import axios from "axios";
import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

//react-bootstrap librarie
import {
  Col,
  Form,
  OverlayTrigger,
  Row,
  Table,
  Tooltip,
} from "react-bootstrap";

//react select dropdown menu
import Select from "react-select";

//components
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SideMenu from "../../components/SideMenu";

function SalesBill() {
  let navigate = useNavigate();
  const deleteTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Delete
    </Tooltip>
  );

  const [cNameData, setCNameData] = useState([]);
  const fetchCategorys = async () => {
    const items = JSON.parse(localStorage.getItem("Info"));
    let token = "bearer " + items.token;

    //=+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+=
    //This API is use for get category name

    await axios
      .get(`http://localhost:5000/getCustomerData`, {
        headers: {
          Authorization: token,
          enctype: "multipart/form-data",
        },
      })
      .then(function (res) {
        setCNameData(res.data.data);
      })
      .catch(function (err) {
        localStorage.removeItem("Info");
        window.location.reload();
      });
  };

  const [pNameData, setPNameData] = useState([]);
  const fetchProducts = async () => {
    const items = JSON.parse(localStorage.getItem("Info"));
    let token = "bearer " + items.token;

    //=+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+=
    //This API is use for get category name

    await axios
      .get(`http://localhost:5000/getProductData`, {
        headers: {
          Authorization: token,
          enctype: "multipart/form-data",
        },
      })
      .then(function (res) {
        setPNameData(res.data.data);
      })
      .catch(function (err) {
        localStorage.removeItem("Info");
        window.location.reload();
      });
  };

  const [data, setData] = useState([]);
  const [qty, setQty] = useState();

  const getTempData = (e) => {
    var temp = data;

    temp.push({
      PRODUCT_ID: e.value,
      PRODUCT_NAME: e.label,
      PRODUCT_PRICE: e.price,
      HSN_CODE: e.hsncode,
      CGST: e.cgst,
      SGST: e.sgst,
      IGST: e.igst,
      PRODUCT_QTY: e.qty,
    });

    console.log("Temp:", temp);
    setData([...temp]);
  };

  function ccyFormat(num) {
    return `${num.toFixed(2)}`;
  }

  function total(items) {
    return items.map(({ subtotal }) => subtotal).reduce((sum, i) => sum + i, 0);
  }

  const invoiceTotal = total(data);

  // const invoiceCGST = cgst(data);

  const [stotal, setSTotal] = useState(0);
  const [igst, setIgst] = useState(0);
  const [cgst, setCgst] = useState(0);
  const [sgst, setSgst] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const calculate = () => {
    var totaligst = 0,
      totalcgst = 0,
      totalsgst = 0,
      grandtotal = 0;
    for (var x in data) {
      totaligst +=
        parseFloat(data[x].subtotal) * parseFloat(data[x].IGST / 100);
      // console.log(data[x].subtotal);
      totalcgst +=
        parseFloat(data[x].subtotal) * parseFloat(data[x].CGST / 100);
      // console.log(totalcgst);
      totalsgst +=
        parseFloat(data[x].subtotal) * parseFloat(data[x].SGST / 100);

      if (stateName === 5) {
        grandtotal = Math.floor(invoiceTotal + totalcgst + totalsgst);
      } else {
        grandtotal = Math.floor(invoiceTotal + totaligst);
      }
    }
    setSTotal(invoiceTotal);
    setIgst(totaligst);
    setCgst(totalcgst);
    setSgst(totalsgst);
    setGrandTotal(grandtotal);
  };

  const [customerId, setCustomerId] = useState("");
  const [stateName, setStateName] = useState("");

  const handleCustomer = (e) => {
    setCustomerId(cNameData[e.target.value].CUSTOMER_ID);
    setStateName(cNameData[e.target.value].STATE_ID);
  };

  const [clear, setClear] = useState(true); //This is use for auto render state

  const handleDelete = (e, index) => {
    data.splice(index, 1);
    setClear(!clear);
  };

  //=+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+=
  //This API is to store data using form.
  //insert data

  const [billNo, setBillNo] = useState("");
  const [date, setDate] = useState("");

  const addBillData = async (e) => {
    e.preventDefault();
    const items = JSON.parse(localStorage.getItem("Info"));
    let token = "bearer " + items.token;

    const result = await axios.post(
      "http://localhost:5000/insertEditSales",
      JSON.stringify([
        { data: data },
        {
          SALES_ID: "",
          SALES_BILL_NO: billNo,
          SALES_DATE: date,
          CUSTOMER_ID: customerId,
          TOTAL_IGST: igst,
          TOTAL_SGST: sgst,
          TOTAL_CGST: cgst,
          TOTAL: stotal,
          GRAND_TOTAL: grandTotal,
        },
      ]),
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
      alert(res.msg);
      navigate("/sales");
    } else {
      alert(res.msg);
    }
  };
  //=+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+=

  useEffect(() => {
    console.log("effect");
    calculate();
  }, [data]);

  useEffect(() => {
    fetchCategorys();
    fetchProducts();
  }, []);

  //=+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+==+=+=+=

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
                    <h1>Add New Bill</h1>
                    <Form method="POST" enctype="multipart/form-data">
                      <br />
                      <Row className="g-2">
                        <Col md>
                          <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Bill Number</Form.Label>
                            <Form.Control
                              placeholder="Bill Number"
                              type="text"
                              value={billNo}
                              onChange={(e) => setBillNo(e.target.value)}
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col md>
                          <div className="row">
                            <div className="col-md-6">
                              <Form.Group controlId="dob">
                                <Form.Label>Select Bill Date</Form.Label>
                                <Form.Control
                                  type="date"
                                  name="bill"
                                  placeholder="Date of Bill"
                                  value={date}
                                  onChange={(e) => setDate(e.target.value)}
                                />
                              </Form.Group>
                            </div>
                          </div>
                        </Col>

                        <br />
                      </Row>
                      <Row>
                        <Col md>
                          <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>
                              Customer Name, City and State
                            </Form.Label>

                            <Form.Select
                              aria-label="Floating label select example"
                              onChange={(e) => {
                                handleCustomer(e);
                              }}
                            >
                              <option>Select Customer Name and State</option>
                              {cNameData.map((items, index) => (
                                <option key={index} value={index}>
                                  {" "}
                                  {items.CUSTOMER_ID}
                                  {" , "}
                                  {items.CUSTOMER_NAME}
                                  {" , "}
                                  {items.STATE_ID}
                                  {" , "}
                                  {items.STATE_NAME}{" "}
                                </option>
                              ))}
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col md>
                          <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Product Name</Form.Label>

                            <Select
                              // onChange={(res) => console.log(res)}

                              onChange={(e) => getTempData(e)}
                              options={pNameData}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      {/* <table className="table table-bordered"> */}
                      {data.length === 0 ? (
                        "No Data Found"
                      ) : (
                        <>
                          <Table striped bordered hover>
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>Product Name</th>
                                <th>HSN</th>
                                <th>Product Price</th>
                                <th>QTY</th>
                                <th>Sub Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              {data.map((item, index) => {
                                return (
                                  <tr key={index}>
                                    <td>
                                      <OverlayTrigger
                                        placement="bottom"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={deleteTooltip}
                                      >
                                        <i
                                          className="fe fe-trash-2 fa-2x"
                                          onClick={(e) => {
                                            handleDelete(index);
                                          }}
                                        ></i>
                                      </OverlayTrigger>
                                    </td>
                                    <td>{item.PRODUCT_NAME}</td>
                                    <td>{item.HSN_CODE}</td>
                                    <td>
                                      <Form.Group
                                        controlId="formFile"
                                        className="mb-3"
                                      >
                                        <Form.Control
                                          placeholder="PRICE"
                                          type="text"
                                          value={item?.PRODUCT_PRICE}
                                          onChange={(e) => {
                                            setQty(e.target.value);
                                            var temp = data;
                                            temp[index].PRODUCT_PRICE =
                                              e.target.value;
                                            temp[index].subtotal =
                                              e.target.value * temp[index].qty;
                                            setData([...temp]);
                                          }}
                                        />
                                      </Form.Group>
                                    </td>
                                    <td>
                                      <Form.Group
                                        controlId="formFile"
                                        className="mb-3"
                                      >
                                        <Form.Control
                                          placeholder="QTY"
                                          type="text"
                                          value={item?.qty}
                                          onChange={(e) => {
                                            var temp = data;
                                            temp[index].qty = e.target.value;
                                            temp[index].subtotal =
                                              e.target.value *
                                              item.PRODUCT_PRICE;
                                            setData([...temp]);
                                          }}
                                          required
                                        />
                                      </Form.Group>
                                    </td>
                                    <td>
                                      <Form.Group
                                        controlId="formFile"
                                        className="mb-3"
                                      >
                                        <Form.Control
                                          placeholder="subTotal"
                                          type="text"
                                          value={
                                            item?.qty ? item.subtotal : "0"
                                          }
                                          required
                                        />
                                      </Form.Group>
                                    </td>
                                  </tr>
                                );
                              })}

                              <tr>
                                <th colSpan={4}></th>

                                <th>Total</th>
                                <th>{stotal}</th>
                              </tr>
                              {stateName === 5 ? (
                                <>
                                  <tr>
                                    <th colSpan={4}></th>
                                    <th>CGST</th>
                                    <th>{cgst > 0 ? cgst.toFixed(2) : 0}</th>
                                  </tr>
                                  <tr>
                                    <th colSpan={4}></th>
                                    <th>SGST</th>
                                    <th>{sgst > 0 ? sgst.toFixed(2) : 0}</th>
                                  </tr>
                                </>
                              ) : (
                                <>
                                  <tr>
                                    <th colSpan={4}></th>
                                    <th>IGST</th>
                                    <th>{igst > 0 ? igst.toFixed(2) : 0}</th>
                                  </tr>
                                </>
                              )}

                              <tr>
                                <th colSpan={4}></th>
                                <th>Grand ToTal</th>
                                <th>{grandTotal > 0 ? grandTotal : 0}</th>
                              </tr>

                              <tr>
                                <th colSpan={5}></th>
                                <th>
                                  <button
                                    class="btn btn-primary mb-4"
                                    data-bs-target="#createfile"
                                    data-bs-toggle="modal"
                                    onClick={(e) => addBillData(e)}
                                  >
                                    <i class="fe fe-plus me-1"></i>Add Bill
                                  </button>
                                </th>
                              </tr>
                            </tbody>
                          </Table>
                        </>
                      )}

                      <br />
                    </Form>
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
}

export default SalesBill;
