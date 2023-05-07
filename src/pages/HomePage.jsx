import { useEffect, useState } from "react";
import { getAllData } from "../service/service";

const HomePage = () => {
  const [ipAddress, setIpAddress] = useState();

  useEffect(() => {
    getAllData()
      .then((data) => setIpAddress(data.data))
      .catch((error) => console.log(error));
  }, []);

  const findData = () => {
    console.log("work");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-5">
          <table className="table border">
            <thead>
              <tr>
                <th>Num</th>
                <th>Ip address</th>
                <th>Date and time</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {ipAddress?.map((el, index) => {
                const dataFormat = new Date(el.createdAt).toLocaleString();
                return (
                  <tr key={el._id} onClick={findData}>
                    <td>{index + 1}</td>
                    <td>{el.ip}</td>
                    <td>{dataFormat}</td>
                    <td>
                      <button className="btn btn-sm btn-danger">Delete</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
