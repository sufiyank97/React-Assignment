import React from 'react'

const EmployeeList = (props) => {
    const datas = props.empdata
    return (
        <React.Fragment>
            {datas.map((data, index) => {
                return (
                    <div key={data._id}>
                        <h2>Employee #{index + 1}</h2>
                        <table>
                            <tbody>
                                <tr>
                                    <th>Name:</th>
                                    <td>{data.name}</td>
                                </tr>
                                <tr>
                                    <th>Designation:</th>
                                    <td>{data.designation}</td>
                                </tr>
                                <tr>
                                    <th>Contact</th>
                                    <td>
                                        {data.Contact.map(con => {
                                            return (
                                                <table key={con._id}>
                                                    <tbody>
                                                        <tr>
                                                            <td>{con.type} - {con.number}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            )
                                        })}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Skills</th>
                                    <td>{data.skills.join(',').toUpperCase()}</td>
                                </tr>
                                <tr>
                                    <th>DOB</th>
                                    <td>{data.dob}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )
            })}
        </React.Fragment>
    )
}
export default EmployeeList