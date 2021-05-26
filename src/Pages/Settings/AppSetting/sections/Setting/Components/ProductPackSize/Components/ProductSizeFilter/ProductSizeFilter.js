import { Form, Input, Button, Checkbox } from "antd";

const layout = {
  wrapperCol: {
    span: 6,
  },
};
const ProductSizeFilter = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Product"
          name="product"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input placeholder="Search product/sku" />
        </Form.Item>
      </Form>
    </div>
  );
};
export default ProductSizeFilter;
