import { useEffect, useState } from "react";
import axios from "axios";

function PredictionHistory() {

  const [data, setData] = useState([]);

  useEffect(() => {

    axios
      .get("http://localhost:5000/api/predictions")
      .then(res => setData(res.data))
      .catch(err => console.log(err));

  }, []);

  return (

<div style={{ marginLeft:"240px", padding:"40px", color:"white" }}>

<h2>Loan Prediction Audit Trail</h2>

<table border="1" cellPadding="10">

<thead>

<tr>
<th>Income</th>
<th>Credit Score</th>
<th>Loan Amount</th>
<th>Risk</th>
<th>Decision</th>
<th>Date</th>
</tr>

</thead>

<tbody>

{data.map((item,index)=>(
<tr key={index}>

<td>{item.income}</td>
<td>{item.credit_score}</td>
<td>{item.loan_amount}</td>
<td>{item.risk}</td>
<td>{item.decision}</td>
<td>{item.created_at}</td>

</tr>
))}

</tbody>

</table>

</div>

  );
}

export default PredictionHistory;