import classes from "./Spinner.module.css";
import { Spin } from "antd";

const Spinner = () => {
  return (
    <div className={classes.spinner}>
      <Spin />
    </div>
  );
};
export default Spinner;
