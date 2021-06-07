import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ContentBar from "../../../../../ContentBar/ContentBar";
import DocumentDetails from "./Components/DocumentDetails/DocumentDetails";
import PrintConfigs from "./Components/PrintConfigs/PrintConfigs";
import { getToken } from "../../../../../../../../../Services/ListServices";
import { Tabs, notification } from "antd";

const { TabPane } = Tabs;

const DocumentTypeEdit = () => {
  const { id } = useParams();
  const headers = getToken();
  const [document, setDocument] = useState([]);
  const [printconfig, setPrintConfig] = useState([]);

  const Alert = (placement, type, error) => {
    if (type === "success") {
      notification.success({
        message: `Settings Saved. `,
        placement,
      });
    } else if (type === "error")
      notification.error({
        message: `Error Code: ${error.status} `,
        description: [JSON.stringify(error.data.errors)],
        placement,
      });
  };
  const fetchDocument = () => {
    let unmounted = false;
    axios
      .get(
        `https://inventory-dev-295903.appspot.com/settings/documents/types/${id}/`,
        { headers }
      )
      .then((res) => {
        const documentData = res.data;
        if (!unmounted) {
          setDocument(documentData);
        }
      })
      .catch((err) => {
        Alert("bottomRight", "error", err.response);
      });
    return () => {
      unmounted = true;
    };
  };
  const fetchPrintConfig = () => {
    axios
      .get(
        `https://inventory-dev-295903.appspot.com/settings/documents/print/configs/${id}/`,
        { headers }
      )
      .then((res) => {
        const printConfigg = res.data;
        setPrintConfig(printConfigg);
      })
      .catch((err) => {
        Alert("bottomRight", "error", err.response);
      });
  };
  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      fetchDocument();
      fetchPrintConfig();
    }
    return () => {
      unmounted = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <ContentBar title={document.prefix} />
      <Tabs type="card">
        <TabPane tab="Document Details" key="1">
          <DocumentDetails
            fetchDocument={fetchDocument}
            documentData={document}
          />
        </TabPane>
        <TabPane tab="Print Configs" key="2">
          <PrintConfigs
            fetchDocument={fetchDocument}
            documentData={printconfig}
          />
        </TabPane>
      </Tabs>
    </div>
  );
};
export default DocumentTypeEdit;
