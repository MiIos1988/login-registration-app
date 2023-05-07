import { useEffect, useState } from "react"
import { getAllData } from "../service/service"

const HomePage = () => {
    const [ipAddress, setIpAddress] = useState()
        

        useEffect(() => {
            getAllData().then(data => setIpAddress(data.data))
            .catch( error => console.log(error))
        },[]
        )
    
return(
    <div className="container">
        <div className="row">
            <div className="col-3">
      <table className="table ">
        <thead>
            <tr><th>
            Ip address
                </th></tr>
           </thead>
           <tbody>
            {
                ipAddress?.map( el => {
                    return(
                        <tr key={el._id}>
                            <td>{el.ip}</td>
                        </tr>
                    )
                })
            }
           </tbody>

      </table>
      </div>
      </div>
    </div>
)
}

export default HomePage 