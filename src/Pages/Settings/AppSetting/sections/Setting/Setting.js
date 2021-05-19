import Box from "../Box/Box";
import { Row, Col } from "antd";
const Setting = () => {
  return (
    <div>
      <Box>
        <Row gutter={[16, 48]}>
          <Col xs={2} sm={4} md={6} lg={8} xl={10}>
            Col
          </Col>
          <Col xs={20} sm={16} md={12} lg={8} xl={4}>
            Col
          </Col>
          <Col xs={2} sm={4} md={6} lg={8} xl={10}>
            Col
          </Col>
          <Col xs={2} sm={4} md={6} lg={8} xl={10}>
            Col
          </Col>
          <Col xs={20} sm={16} md={12} lg={8} xl={4}>
            Col
          </Col>
          <Col xs={2} sm={4} md={6} lg={8} xl={10}>
            Col
          </Col>
        </Row>
      </Box>
    </div>
  );
};
export default Setting;
