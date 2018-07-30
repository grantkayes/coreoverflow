import React from 'react'
import Dashboard from '../dashboard'
import { bindActionCreators } from '../../../node_modules/redux'
import { EmptyState } from '@procore/core-react'
import { connect } from 'react-redux'

class SearchResults extends React.Component {
  render() {
    return (this.props.searchData.length === 0) ? (
      <div>
        <EmptyState>
          <EmptyState.Image><img src="http://coreoverflow.s3.amazonaws.com/1/5c2398eb-488d-47ec-8b5b-8202a79aca19" alt='empty state img'/></EmptyState.Image>
          <EmptyState.Title>Sorry, No Search Results</EmptyState.Title>
          <EmptyState.Description>Please try to search again</EmptyState.Description>
        </EmptyState>        
      </div>
    ) : (
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