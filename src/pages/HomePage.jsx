import { useEffect, useState } from "react";
import { getAllData } from "../service/service";

const HomePage = () => {
  const [ipAddress, setIpAddress] = useState();
  const [information, setInformation] = useState({
    country: "",
    city: "",
  });

  useEffect(() => {
    getAllData()
      .then((data) => setIpAddress(data.data))
      .catch((error) => console.log(error));
  }, []);

  const findData = (ip) => {
    fetch(`https://ipapi.co/${ip}/json/`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setInformation({ country: data.country_name, city: data.city });
      });
  };

  const delateRow = (id) => {
    fetch(`https://localhost:5050/api/items/${id}`, {
      method: "DELETE",
    });
  };

  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col-5">
          <table className="table border table-striped">
            <thead>
              <tr>
                <th>Num</th>
                <th>Ip address</th>
                <th>Date and time</th>
                <th>Delete</th>
                <th>View</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {ipAddress?.map((el, index) => {
                const dataFormat = new Date(el.createdAt).toLocaleString();
                return (
                  <tr key={el._id}>
                    <td>{index + 1}</td>
                    <td>{el.ip}</td>
                    <td>{dataFormat}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => delateRow(el._id)}
                      >
                        Delete
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-success "
                        onClick={() => findData(el.ip)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="col-5 offset-2">
          <table className="table border">
            <tbody>
              <tr>
                <th scope="row">Country</th>
                <td>{information.country}</td>
              </tr>
              <tr>
                <th scope="row">City</th>
                <td>{information.city}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
