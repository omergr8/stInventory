import React, { useState, useEffect } from "react";
import { Select } from "antd";
const countryList = require("country-list");
const { Option } = Select;

function handleChange(value) {}

const CountrySelector = (props) => {
  return (
    <div>
      <Select
        key={`${Math.floor(Math.random() * 1000)}-min`}
        defaultValue={props.countryCode}
        onChange={props.handleChange}
      >
        {countryList.getData().map((data, index) => {
          return (
            <Option key={index} value={data.code}>
              {data.name} <span>({data.code})</span>
            </Option>
          );
        })}
      </Select>
    </div>
  );
};
export default CountrySelector;
