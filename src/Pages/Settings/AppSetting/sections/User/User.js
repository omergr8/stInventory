import Box from "../Box/Box";
import classes from "../Setting/Setting.module.css";
import { NavLink, Link } from "react-router-dom";
import { RiUserSettingsLine } from "react-icons/ri";

import { Row, Col } from "antd";

const Setting = () => {
  let userr = JSON.parse(localStorage.getItem("user-info"));
  const id = userr.user.id;
  return (
    <div>
      <Box>
        <div className={classes.wrapper}>
          <Row>
            <Col lg={{ span: 7, offset: 1 }}>
              <Link to={`/dashboard/user/${id}`}>
                <a href="!" className={classes.anchor}>
                  <div className={classes.first}>
                    <div className={classes.icon}>
                      <RiUserSettingsLine />
                    </div>

                    <div className={classes.iconText}>
                      <p className={classes.item1}>User Profile</p>
                      <p className={classes.item2}>Manage your settings</p>
                    </div>
                  </div>
                </a>
              </Link>
            </Col>
          </Row>
        </div>
      </Box>
    </div>
  );
};
export default Setting;
