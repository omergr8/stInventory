import classes from "./Card.module.css";
import { Select } from "antd";
import { Button, Form } from "antd";
import React, { useState, useEffect } from "react";
import axios from "../../../../../axiosSet";
import { appUrls } from "../../../../../Constants/appUrls";
const { Option } = Select;

const Card = () => {
  const [plans, setPlans] = useState([]);
  const [cost, setCost] = useState();
  const handleChange = (value) => {
    setCost(value);
  };

  useEffect(() => {
    axios.get(appUrls.BILLING_PLANS).then((res) => {
      const billingPlan = res.data;
      setPlans(billingPlan);
    });
  }, [setPlans]);
  return (
    <div className={classes.box}>
      <h2 className={classes.plan}>Select Your Plan</h2>
      <Form className={classes.container} layout="horizontal">
        <Form.Item
          label={<p className={classes.label}>Monthly Order Volume</p>}
        >
          <div>
            <Select
              className={classes.select}
              placeholder="Select Order per Month"
              onChange={handleChange}
            >
              {plans.map(function (object, i) {
                return (
                  <Option key={object.id} value={object.monthly_credits}>
                    {object.name}
                  </Option>
                );
              })}
            </Select>
          </div>
        </Form.Item>
        <Form.Item>
          <Button size="large" type="primary">
            Activate Plan
          </Button>
        </Form.Item>
        <Form.Item>
          <div>
            <h2>{cost} USD /month</h2>
            <span>{cost} orders/month included.</span>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Card;
