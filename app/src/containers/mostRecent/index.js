import React from 'react'
import Dashboard from '../dashboard'
import { bindActionCreators } from '../../../node_modules/redux'
import { connect } from 'react-redux'
import { getQuestions } from '../../modules/actions/questions'
import { EmptyState } from '@procore/core-react'

class MostRecent extends React.Component {
  componentWillMount() {
    this.props.getQuestions()
  }

  render() {
    return (this.props.data.length === 0) ? (
      <div>
        <EmptyState>
          <EmptyState.Image><img src="http://coreoverflow.s3.amazonaws.com/1/5c2398eb-488d-47ec-8b5b-8202a79aca19" alt='empty state img'/></EmptyState.Image>
          <EmptyState.Title>Sorry, no questions available</EmptyState.Title>
          <EmptyState.Description>Please try using 'Post a Question' in the side bar</EmptyState.Description>
        </EmptyState>        
      </div>
    ) : (
      <div>
        <Dashboard title={"Most Recent Questions:"} questionData={this.props.data}/>
      </div>
    )
  }
}

const mapStateToProps = ({question}) => {
  return {
    data: question.data,
    busy: question.busy,
    error: question.error
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getQuestions
    },
    dispatch
  )

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(MostRecent)

