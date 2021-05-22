import React, { useState } from "react";
import { Table, Radio, Divider } from "antd";
const columns = [
  {
    title: "#",
    dataIndex: "number",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Function",
    dataIndex: "function",
  },
];
const data = [
  {
    key: "1",
    number: 1,
    function: "Can change stock levels",
  },
  {
    key: "2",
    number: 2,
    function: "Can change stock levels",
  },
]; // rowSelection object indicates the need for row selection

let rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  getCheckboxProps: (record) => ({
    disabled: true, // Column configuration not to be checked
    name: record.name,
  }),
};

const PermissionTable = (props) => {
  const [selectionType, setSelectionType] = useState("checkbox");
  //const [permission, setPermission] = useState(props.permission);
  const [isAdmin, setIsAdmin] = useState(props.isAdmin);

  if (isAdmin) {
    console.log(isAdmin);

    rowSelection = null;
  }
  return (
    <div>
      <Table
        pagination={false}
        rowSelection={{
          type: selectionType,
          hideSelectAll: true,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
      />
    </div>
  );
};

export default PermissionTable;
