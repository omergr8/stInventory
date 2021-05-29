//import React, { useState, useEffect } from "react";
const MetaFind = (props) => {
  const getMeta = JSON.parse(localStorage.getItem("meta-data"));
  //const [category, getCategory] = useState("");
  let data;
  if (props.incoming === "ArchievedProductTable") {
    const result = getMeta.group1s.filter((obj) => obj.id === props.id);
    data = <p>{result[0].name}</p>;
  } else if (
    props.incoming === "ProductTable" ||
    props.incoming === "WarehouseTableChannel"
  ) {
    const result = getMeta.channels.filter((obj) => obj.id === props.id);
    data = <p>{result[0].name}</p>;
  } else if (
    props.incoming === "WarehouseDetailsChannel" &&
    props.id !== undefined
  ) {
    console.log(props);
    const result = getMeta.channels.filter((obj) => obj.id === props.id);
    if (result[0] !== undefined) {
      data = result[0].name;
    }
  } else if (props.incoming === "WarehouseTableWarehouse") {
    const result = getMeta.warehouses.filter((obj) => obj.id === props.id);
    data = <p>{result[0].name}</p>;
  }
  return <div>{data}</div>;
};
export default MetaFind;
