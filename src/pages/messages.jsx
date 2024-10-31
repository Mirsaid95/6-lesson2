import React from "react";
import { request } from "../config/request";
import { loadState } from "../config/storage";

export const Messages = () => {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {

    request.get("/messages").then((res) => {
      setData(res.data);
    });
  }, []);
  return (
    <div className="mt-[30px]">
      <div className="max-w-[1240px] mx-auto">
        {data.map((item) => (
            <h1 key={item.id}>
                {item.id}{item.name}
            </h1>
            
        ))}
        
        </div>
    </div>
  );
};
