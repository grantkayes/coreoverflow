import React from 'react'
import Dashboard from '../dashboard'
import { bindActionCreators } from '../../../node_modules/redux'
import { connect } from 'react-redux'

class SearchResults extends React.Component {
  render() {
    return (
      <div>
        <Dashboard title={"Search Results:"} questionData={this.props.searchData}/>
      </div>
    )
  }
}

const mapStateToProps = ({ question }) => {
  return {
    searchData: question.searchData
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
    },
    dispatch
  )

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(SearchResults)