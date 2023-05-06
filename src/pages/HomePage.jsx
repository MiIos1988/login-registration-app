import { useEffect } from "react"
import { getAllData } from "../service/service"

const HomePage = () => {
    useEffect(() => {
        console.log("work")
        getAllData().then(data => console.log(data))
        .catch( error => console.log(error))
    },[]
    )
return(
    <div className="container">
      <table className="table">
        <thead>
            <tr><th>
            Ip address
                </th></tr>
           </thead>
           <tbody>
            <tr>
                
               
                <td>1.1.1</td>
            </tr>
           </tbody>

      </table>
    </div>
)
}

export default HomePage 