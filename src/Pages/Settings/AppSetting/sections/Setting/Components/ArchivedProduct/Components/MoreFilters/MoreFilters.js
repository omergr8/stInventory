import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useHistory } from "react-router-dom";
import { Modal, Form, Input, Select, Radio } from "antd";
import { getCategory } from "../../../../../../../../../Services/ListServices";
import { appRoutes } from "../../../../../../../../../Constants/appRoutes";

const { Option } = Select;
const layout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 16,
  },
};
const label = (text) => <label style={{ fontWeight: "600" }}>{text}</label>;
const optionsWithDisabled = [
  { label: "All", value: "all" },
  { label: "Yes", value: "True" },
  { label: "No", value: "False" },
];

const MoreFilters = (props, ref) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isbundle, setIsBundle] = useState("all");
  const [category, setCategory] = useState();
  const [tags, setTags] = useState("");
  const [form] = Form.useForm();
  const history = useHistory();
  const showModal = () => {
    setIsModalVisible(true);
  };

  const setQueryParams = () => {
    let queryParams;
    if (isbundle !== "all" && category === undefined && tags === "") {
      queryParams = `&is_bundle=${isbundle}`;
    } else if (category !== undefined && isbundle === "all" && tags === "") {
      queryParams = `&group1=${category}`;
    } else if (tags !== "" && isbundle === "all" && category === undefined) {
      queryParams = "";
    } else if (tags !== "" && isbundle !== "all" && category === undefined) {
      queryParams = `&is_bundle=${isbundle}`;
    } else if (tags !== "" && isbundle === "all" && category !== undefined) {
      queryParams = `&group1=${category}`;
    } else if (tags === "" && isbundle !== "all" && category !== undefined) {
      queryParams = `&is_bundle=${isbundle}&group1=${category}`;
    } else if (tags !== "" && isbundle !== "all" && category !== undefined) {
      queryParams = `&is_bundle=${isbundle}&group1=${category}`;
    } else {
      queryParams = "";
    }
    if (props.productId !== undefined && props.searchInput === "") {
      queryParams = queryParams + `&${props.productId}`;
    } else if (props.searchInput !== "" && props.productId === undefined) {
      queryParams = queryParams + `&search=${props.searchInput}`;
    } else if (props.searchInput !== "" && props.productId !== undefined) {
      queryParams =
        queryParams + `&search=${props.searchInput}` + `&${props.productId}`;
    }
    history.push(appRoutes.ARCHIVED_PRODUCT + queryParams);
  };

  useImperativeHandle(
    ref,
    () => ({
      setFromOutside() {
        setIsBundle("all");
        setCategory();
      },
    }),
    []
  );
  const handleOk = () => {
    setIsModalVisible(false);
    setQueryParams();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  function onChange(value) {
    setCategory(value);
  }

  const onChange4 = (e) => {
    setIsBundle(e.target.value);
  };
  useEffect(() => {
    props.more_ref.current = showModal;
    props.archiveProductTableMethod_ref.current = setQueryParams;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  return (
    <>
      <Modal
        title="Filter"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form {...layout} form={form} name="basic">
          <Form.Item label={label("Category")}>
            <Select
              showSearch
              style={{ width: 311 }}
              placeholder="Select a person"
              optionFilterProp="children"
              value={category}
              onChange={onChange}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {getCategory().map((cat, index) => (
                <Option key={index} value={cat.id}>
                  {cat.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label={label("Bundle Product")}>
            <Radio.Group
              options={optionsWithDisabled}
              onChange={onChange4}
              value={isbundle}
              optionType="button"
              buttonStyle="solid"
            />
          </Form.Item>
          <Form.Item label={label("Product Tags")}>
            <Input value={tags} onChange={(e) => setTags(e.target.value)} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

//export default MoreFilters;
export default forwardRef(MoreFilters);
