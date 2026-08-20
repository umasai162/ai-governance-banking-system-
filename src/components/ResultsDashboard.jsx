function ResultsDashboard({data}){

return(

<div>

<h2>Policy Report</h2>

<h3>Safety Score: {data.safety_score}</h3>

<h3>Red Flags</h3>

<ul>
{data.red_flags.map((r,i)=>(
<li key={i}>{r}</li>
))}
</ul>

<h3>Recommendations</h3>

<ul>
{data.recommendations.map((r,i)=>(
<li key={i}>{r}</li>
))}
</ul>

</div>

)

}

export default ResultsDashboard