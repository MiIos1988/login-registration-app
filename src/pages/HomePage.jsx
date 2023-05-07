import { useEffect, useState } from "react";
import { deleteAddress, findInfoIp, getAllData } from "../service/service";

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
    findInfoIp(ip)
      .then((data) => {
        setInformation({ country: data.data.country_name, city: data.data.city });
      });
  };

  const deleteRow = (id) => {
    deleteAddress(id).then( res => getAllData()
    .then((data) => setIpAddress(data.data))
    .catch((error) => console.log(error)))
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
                        onClick={() => deleteRow(el._id)}
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
