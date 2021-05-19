import classes from "./Box.module.css";

const Box = (props) => {
  return <div className={classes.box}>{props.children}</div>;
};
export default Box;
