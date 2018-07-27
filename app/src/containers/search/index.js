import React from 'react'
import Dashboard from '../dashboard'
import { bindActionCreators } from '../../../node_modules/redux'
import { connect } from 'react-redux'
import { getMyQuestions } from '../../modules/actions/questions'

class SearchResults extends React.Component {
  componentWillMount() {
    // this.props.getMyQuestions()
  }

  render() {
    return (
      <div>
        <Dashboard title={"Search Results:"} questionData={this.props.data}/>
      </div>
    )
  }
}

const mapStateToProps = ({ question }) => {
  return {
    data: question.data,
    searchData: question.searchData
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getMyQuestions
    },
    dispatch
  )

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(SearchResults)