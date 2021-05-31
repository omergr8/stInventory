import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  getToken,
  getWarehouse,
} from "../../../../../../../../../Services/ListServices";
import { Table, Tag, Space } from "antd";

const columns = [
  {
    title: "Document Name",
    dataIndex: "documentname",
    key: "documentname",
    render: (text, row) => (
      <Link to={`/dashboard/documents-print/edit/${row.id}`}>{text}</Link>
    ),
  },
  {
    title: "Warehouse",
    dataIndex: "warehouse",
    key: "warehouse",
    render: (text) => getWarehouse(text),
  },
];

const DocumentsandPrintsTable = () => {
  const headers = getToken();
  const [documenttypes, setDocumentTypes] = useState([]);

  useEffect(() => {
    let unmounted = false;
    axios
      .get(
        "https://inventory-dev-295903.appspot.com/settings/documents/types/",
        {
          headers,
        }
      )
      .then((res) => {
        const document = res.data;
        if (!unmounted) {
          console.log(document);
          setDocumentTypes(document);
        }
      });
    return () => {
      unmounted = true;
    };
  }, []);
  const data = documenttypes.map((doc, index) => ({
    key: index,
    id: doc.id,
    documentname: doc.prefix,
    warehouse: doc.warehouse,
  }));

  return (
    <div>
      <Table pagination={false} bordered columns={columns} dataSource={data} />
    </div>
  );
};
export default DocumentsandPrintsTable;
