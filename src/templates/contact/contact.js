import React, { useState } from "react"
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo';

import Layout from '../../components/Layout'

const CONTACT_MUTATION = gql`
  mutation CreateSubmissionMutation($clientMutationId: String!, $firstName: String!, $lastName: String!, $favouriteFood: String!, $message: String!){
    createSubmission(input: {clientMutationId: $clientMutationId, firstName: $firstName, lastName: $lastName, favouriteFood: $favouriteFood, message: $message}) {
      success
      data
    }
  }
`

const IndexPage = () => {

  const [firstNameValue, setFirstNameValue] = useState('')
  const [lastNameValue, setLastNameValue] = useState('')
  const [favouriteFoodValue, setfavouriteFoodValue] = useState('')
  const [messageValue, setMessageValue] = useState('')

  return (
    <Layout>
      <h1>Contact Form Submission to WordPress with GraphQL</h1>
      <Mutation mutation={CONTACT_MUTATION}>
        {(createSubmission, { loading, error, data }) => (
          <React.Fragment>
          <form
            onSubmit={async event => {
              event.preventDefault()
              createSubmission({
                variables: {
                  clientMutationId: 'example',
                  firstName: firstNameValue,
                  lastName: lastNameValue,
                  favouriteFood: favouriteFoodValue,
                  message: messageValue
                }
              })
            }}
          >

            <label htmlFor='firstNameInput'>First Name: </label>
            <input id='firstNameInput' value={firstNameValue}
              onChange={event => {
                setFirstNameValue(event.target.value)
              }}
            />

            <br /><br />

            <label htmlFor='lastNameInput'>Last Name: </label>
            <input id='lastNameInput' value={lastNameValue}
              onChange={event => {
                setLastNameValue(event.target.value)
              }}
            />

            <br /><br />

            <label htmlFor='favouriteFoodInput'>favourite Food: </label>
            <select id='favouriteFoodNameInput' value={favouriteFoodValue}
              onChange={event => {
                setfavouriteFoodValue(event.target.value)
              }}
            >
              <option>Select one...</option>
              <option>Chicken</option>
              <option>Lamb</option>
              <option>Rice</option>
              <option>Yogurt</option>
            </select>

            <br /><br />

            <label htmlFor='messageInput'>Message: </label>
            <textarea id='messageInput' value={messageValue}
              onChange={event => {
                setMessageValue(event.target.value)
              }}
            >
            </textarea>

            <br /><br />

            <button type="submit">Send it!</button>

          </form>

          <div style={{ padding: '20px' }}>

            {loading && <p>Loading...</p>}
            {error && (
              <p>An unknown error has occured, please try again later...</p>
            )}
            {data && <p>yeah boi</p>}
          </div>
          </React.Fragment>
        )}
      </Mutation>
    </Layout>
  )

}

export default IndexPage;