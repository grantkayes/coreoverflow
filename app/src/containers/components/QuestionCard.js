import React from 'react'
import { Box, Card, Flex } from '@procore/core-react'
import './style.css'


const QuestionCard = (props) => {
  const {title, body, up, down, timestamp, user} = props.question
  const answerCount = props.answerCount

  let bodyText = body
  if (body.length > 250) {
    bodyText = body.substring(0, 250) + '...'
  }

  return (
    <Card className='card' level='30'>
      <Box padding='md'>
        <Flex>
          <Flex alignItems='center' direction='column' className='side-card-container'>
            <Box className='votes-container'>
              <Flex alignItems='center' direction='column'>
                <p className='card-vote-num'>{up-down}</p>
                <p className='card-vote-text'>votes</p>
              </Flex>
            </Box>
            <Box className='answer-container'>
              <Flex alignItems='center' direction='column'>
                <p className='answer-vote-num'>{4}</p>
                <p className='answer-vote-text'>answers</p>
              </Flex>
            </Box>
          </Flex>
          <Flex direction='column'>
            <Box>
              <p className='card-title'>{title}</p>
            </Box>
            <Box>
              <Flex>
                <p class='card-body'>{bodyText}</p>
              </Flex>
            </Box>
            <Flex className='question-user-info' direction='column'>
              <p className='subtext'>Asked by {user}</p>
              <p className='subtext'>on {timestamp.format('ll')}</p>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </Card>
  )
}

export default QuestionCard
