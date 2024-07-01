// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationCoverage from '../VaccinationCoverage'

import './index.css'

const apiStatusConstraints = {
  intial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
class CowinDashboard extends Component {
  state = {
    VAccnationData: [],
    apistatus: apiStatusConstraints.intial,
  }

  componentDidMount() {
    this.getvaccine()
  }

  getvaccine = async () => {
    this.setState({apistatus: apiStatusConstraints.inProgress})
    const apiUrl = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(apiUrl)
    const data = await response.json()
    const Updateddata = {
      last7DAysVaccination: data.last7daysvaccine.map(eachdata => ({
        vaccineDate: eachdata.vaccine_date,
        dose1: eachdata.dese_1,
        dose2: eachdata.dese_2,
      })),
      VaccinationByAge: data.vaccination_by_age.map(range => ({
        age: range.age,
        count: range.count,
      })),
      VaccinationByGender: data.vaccination_by_gender.map(genderType => ({
        gender: genderType.gender,
        count: genderType.count,
      })),
    }
    if (response.ok === true) {
      this.setstate({
        VAccnationData: Updateddata,
        apistatus: apiStatusConstraints.success,
      })
    } else {
      this.setState({apistatus: apiStatusConstraints.failure})
    }
  }

  renderFailureView = () => (
    <div className="failure-view">
      <img
        className="failure-image"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1 className="failure-text">Something went wrong</h1>
    </div>
  )

  renderLoadingView = () => (
    <div className="loading-view" data-testid="loader">
      <Loader color="#ffffff" height={80} type="ThreeDots" width={80} />
    </div>
  )

  renderVaccinationStats = () => {
    const {vaccinationData} = this.state

    return (
      <>
        <VaccinationCoverage
          vaccinationCoverageDetails={vaccinationData.last7DaysVaccination}
        />
        <VaccinationByGender
          vaccinationByGenderDetails={vaccinationData.vaccinationByGender}
        />
        <VaccinationByAge
          vaccinationByAgeDetails={vaccinationData.vaccinationByAge}
        />
      </>
    )
  }

  renderViewStatus = () => {
    const {apistatus} = this.state
    switch (apistatus) {
      case apiStatusConstraints.success:
        return this.renderVaccinationStats()
      case apiStatusConstraints.failure:
        return this.renderFailureView()
      case apiStatusConstraints.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="container">
        <div className="appcontainer">
          <div className="logo-container">
            <img src="" alt="" className="logo" />
            <h1 className="logo-heading">Co-Win</h1>
          </div>
          <h1 className="head">cowin Vaccination inindia</h1>
        </div>
      </div>
    )
  }
}
export default CowinDashboard
