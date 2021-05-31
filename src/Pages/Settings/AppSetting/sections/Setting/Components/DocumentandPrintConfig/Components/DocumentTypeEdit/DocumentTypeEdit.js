import React, { useState, useReducer, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  getDocumentPrefix,
  getToken,
} from "../../../../../../../../../Services/ListServices";
import ContentBar from "../../../../../ContentBar/ContentBar";
import DocumentDetails from "./Components/DocumentDetails/DocumentDetails";
import { Tabs } from "antd";

const { TabPane } = Tabs;

function callback(key) {
  //console.log(key);
}
const DocumentTypeEdit = () => {
  const { id } = useParams();
  const headers = getToken();
  const [document, setDocument] = useState([]);
  const [printconfig, setPrintConfig] = useState([]);
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
      });
    return () => {
      unmounted = true;
    };
  };
  const fetchPrintConfig = () => {
    let unmounted = false;
    axios
      .get(
        `https://inventory-dev-295903.appspot.com/settings/documents/print/configs/${id}/`,
        { headers }
      )
      .then((res) => {
        const printConfig = res.data;
        if (!unmounted) {
          setPrintConfig(printConfig);
          console.log(printConfig);
        }
      });
    return () => {
      unmounted = true;
    };
  };
  useEffect(() => {
    fetchDocument();
    fetchPrintConfig();
  }, []);
  return (
    <div>
      <ContentBar title={document.prefix} />
      <Tabs onChange={callback} type="card">
        <TabPane tab="Document Details" key="1">
          <DocumentDetails
            fetchDocument={fetchDocument}
            documentData={document}
          />
        </TabPane>
        <TabPane tab="Print Configs" key="2">
          Content of Tab Pane 2
        </TabPane>
      </Tabs>
    </div>
  );
};
export default DocumentTypeEdit;
