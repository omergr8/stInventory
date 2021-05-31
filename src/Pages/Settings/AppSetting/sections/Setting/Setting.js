import Box from "../Box/Box";
import classes from "./Setting.module.css";
import { FiTruck } from "react-icons/fi";
import { AiFillSetting } from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  FaWarehouse,
  FaListUl,
  FaBoxes,
  FaBox,
  FaPrint,
  FaCubes,
  FaCube,
} from "react-icons/fa";
import { Row, Col } from "antd";

const Setting = () => {
  return (
    <div>
      <Box>
        <div className={classes.wrapper}>
          <Row>
            <Col lg={{ span: 7, offset: 1 }}>
              <Link className={classes.anchor} to="/dashboard/product-listing">
                <div className={classes.first}>
                  <div className={classes.icon}>
                    <FiTruck />
                  </div>

                  <div className={classes.iconText}>
                    <p className={classes.item1}> Product Listings</p>
                    <p className={classes.item2}>
                      Sumtracker products links <br /> with online products
                    </p>
                  </div>
                </div>
              </Link>
            </Col>
            <Col lg={{ span: 7, offset: 1 }}>
              <Link className={classes.anchor} to="/dashboard/default-setting">
                <div className={classes.first}>
                  <div className={classes.icon}>
                    <AiFillSetting />
                  </div>

                  <div className={classes.iconText}>
                    <p className={classes.item1}>Default App Settings</p>
                    <p className={classes.item2}>
                      Set the timezone and country
                    </p>
                  </div>
                </div>
              </Link>
            </Col>
            <Col lg={{ span: 7, offset: 1 }}>
              <Link className={classes.anchor} to="/dashboard/warehouses">
                <div className={classes.first}>
                  <div className={classes.icon}>
                    <FaWarehouse />
                  </div>

                  <div className={classes.iconText}>
                    <p className={classes.item1}>Warehouses</p>
                    <p className={classes.item2}>
                      Your warehouses list and their addresses
                    </p>
                  </div>
                </div>
              </Link>
            </Col>
            <Col lg={{ span: 7, offset: 1 }}>
              <Link className={classes.anchor} to="/dashboard/warehouselinks">
                <div className={classes.first}>
                  <div className={classes.icon}>
                    <FaWarehouse />
                  </div>

                  <div className={classes.iconText}>
                    <p className={classes.item1}>Warehouse Links</p>
                    <p className={classes.item2}>
                      Sumtracker warehouse links with Shopify locations
                    </p>
                  </div>
                </div>
              </Link>
            </Col>
            <Col lg={{ span: 7, offset: 1 }}>
              <Link className={classes.anchor} to="/dashboard/tax-list">
                <div className={classes.first}>
                  <div className={classes.icon}>
                    <FaListUl />
                  </div>

                  <div className={classes.iconText}>
                    <p className={classes.item1}>Tax list</p>
                    <p className={classes.item2}>List of taxes</p>
                  </div>
                </div>
              </Link>
            </Col>
            <Col lg={{ span: 7, offset: 1 }}>
              <Link className={classes.anchor} to="/dashboard/product-category">
                <div className={classes.first}>
                  <div className={classes.icon}>
                    <FaBoxes />
                  </div>

                  <div className={classes.iconText}>
                    <p className={classes.item1}>Product Category</p>
                    <p className={classes.item2}>Manage product categories</p>
                  </div>
                </div>
              </Link>
            </Col>
            <Col lg={{ span: 7, offset: 1 }}>
              <Link
                className={classes.anchor}
                to="/dashboard/product-pack-size"
              >
                <div className={classes.first}>
                  <div className={classes.icon}>
                    <FaBox />
                  </div>

                  <div className={classes.iconText}>
                    <p className={classes.item1}>Product Pack Sizes</p>
                    <p className={classes.item2}>
                      Manage pack sizes for products
                    </p>
                  </div>
                </div>
              </Link>
            </Col>
            <Col lg={{ span: 7, offset: 1 }}>
              <Link className={classes.anchor} to="/dashboard/documents-prints">
                <div className={classes.first}>
                  <div className={classes.icon}>
                    <FaPrint />
                  </div>

                  <div className={classes.iconText}>
                    <p className={classes.item1}>Document and Print Config</p>
                    <p className={classes.item2}>
                      Set document number, warehouse and print settings
                    </p>
                  </div>
                </div>
              </Link>
            </Col>
            <Col lg={{ span: 7, offset: 1 }}>
              <Link
                className={classes.anchor}
                to="/dashboard/archieved-product"
              >
                <div className={classes.first}>
                  <div className={classes.icon}>
                    <FaCube />
                  </div>

                  <div className={classes.iconText}>
                    <p className={classes.item1}>Archived Products</p>
                    <p className={classes.item2}>Manage archived products</p>
                  </div>
                </div>
              </Link>
            </Col>
          </Row>
        </div>
      </Box>
    </div>
  );
};
export default Setting;
