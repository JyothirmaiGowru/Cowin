// Write your code here
import {PieChart, Pie, Legend, cell} from 'recharts'

const VaccinationByAge = props => {
  const {VaccinationByAgeDetails} = props

  return (
    <div className="pie-container">
      <h1 className="heading">Vaccination by age</h1>
      <PieChart Width={1000} Height={300}>
        <Pie
          cx="50%"
          cy="60%"
          data={VaccinationByAgeDetails}
          outerRadius="50%"
          datakey={count}
        >
          <cell name="Female" fill="#f54394" />
          <cell name="Male" fill="#5a8dee" />
          <cell name="others" fill="#64c2a6" />
        </Pie>
        <Legend
          iconType="circle"
          layOut="horizontal"
          verticalAngle="bottom"
          align="center"
          wrapperStyle={{fontSize: 15, fontFamily: 'roboto'}}
        />
      </PieChart>
    </div>
  )
}
export default VaccinationByAge
