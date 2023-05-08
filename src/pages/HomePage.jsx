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
    deleteAddress(id).then(res => getAllData()
      .then((data) => setIpAddress(data.data))
      .catch((error) => console.log(error)))
  };

  return (
    <div className="container">
      <div className="row mt-3  d-flex justify-content-center">
        <div className="col-xl-6 table-responsive ipAddress">
          <table className="table border table-striped table-hover">
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
                const dataObject = new Date(el.createdAt);
                const day = String(dataObject.getDate()).padStart(2, "0");
                const month = String(dataObject.getMonth() + 1).padStart(2, "0");
                const year = dataObject.getFullYear();
                const dataFormat = `${day}/${month}/${year}`;
                const localTime = dataObject.toLocaleTimeString("sr-RS", {
                  timeZone: "Europe/Belgrade",
                });

                return (
                  <tr key={el._id}>
                    <td>{index + 1}</td>
                    <td>{el.ip}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-success "
                        onClick={() => findData(el.ip)}
                      >
                        View
                      </button>
                    </td>
                    <td>{dataFormat + " " + localTime}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => deleteRow(el._id)}
                      >
                        Delete
                      </button>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="col-md-4 gap-5 mt-3">
          <table className="table border ">
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
