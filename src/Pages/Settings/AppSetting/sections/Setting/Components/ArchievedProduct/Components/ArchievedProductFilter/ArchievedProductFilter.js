import { Form, Input, Button, Checkbox } from "antd";

const ArchievedProductFilter = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      <Form
        layout="inline"
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
              required: false,
              message: "Please input your username!",
            },
          ]}
        >
          <Input placeholder="Search product/sku" />
        </Form.Item>
        <Form.Item
          label="Search"
          name="search"
          rules={[
            {
              required: false,
              message: "Please input your username!",
            },
          ]}
        >
          <Input placeholder="Any part of product name/sku" />
        </Form.Item>
      </Form>
    </div>
  );
};
export default ArchievedProductFilter;
