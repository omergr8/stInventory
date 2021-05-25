import { Select } from "antd";
import { minimalTimezoneSet } from "compact-timezone-list";
const { Option } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}

const TimeZoneSelector = (props) => {
  return (
    <Select
      key={`${Math.floor(Math.random() * 1000)}-min`}
      defaultValue={props.timeZone}
      onChange={handleChange}
    >
      {minimalTimezoneSet.map((data, index) => {
        return (
          <Option key={index} value={data.tzCode}>
            {data.label}
          </Option>
        );
      })}
    </Select>
  );
};
export default TimeZoneSelector;
