import React, {useState} from "react";
import "../../styles/find-car-form.css";
import "../../styles/find-car-form.css";
import { Form, FormGroup } from "reactstrap";
import axiosInstance from "../../utils/axiosUtil";

const FindCarForm = () => {
  const [values,setValues] = useState({
    "fromAddress" : "",
    "toAddress" : "",
    "startDate" : "",
    "endDate" : "",
    "startTime": "",
    "endTime" : ""
  })

  const handleSubmit = async(e) => {
    e.preventDefault();
    const res = await axiosInstance.post('/api/car/getAvail-car',values);
    console.log(res);
  }

  const handleChange = (e) => {
     setValues({...values, [e.target.name] : e.target.value})
  }
  return (
    <Form className="form">
      <div className=" d-flex align-items-center justify-content-between flex-wrap">
        <FormGroup className="form__group">
        <label>From address</label>
          <input onChange={handleChange}  type="text" placeholder="From address" required name="fromAddress" />
        </FormGroup>

        <FormGroup className="form__group">
         <label>To address</label>
          <input onChange={handleChange} type="text" placeholder="To address" required name="toAddress" />
        </FormGroup>

        <FormGroup className="form__group">
          <label>start date</label>
          <input onChange={handleChange} type="date" placeholder="Journey date" required name="startDate" />
        </FormGroup>

        <FormGroup className="form__group">
        <label>end date</label>
        <input onChange={handleChange} type="date" placeholder="Journey date" required name="endDate" />
      </FormGroup>

        <FormGroup className="form__group">
        <label>start Time</label>
          <input
            onChange={handleChange}
            className="journey__time"
            type="time"
            placeholder="Journey time"
            name="startTime"
            required
          />
        </FormGroup>

        <FormGroup className="form__group">
        <label>End Time</label>
          <input
           onChange={handleChange}
            className="journey__time"
            type="time"
            placeholder="Journey time"
            name="endTime"
            required
          />
        </FormGroup>

       {/* <FormGroup className="select__group">
          <select>
            <option value="ac">AC Car</option>
            <option value="non-ac">Non AC Car</option>
          </select>
  </FormGroup> */}

        <FormGroup className="form__group" id="car-form-sbt-div">
          <button onClick={handleSubmit} className="btn find__car-btn" id="sbt-btn">Find Car</button>
        </FormGroup>
      </div>
    </Form>
  );
};

export default FindCarForm;
