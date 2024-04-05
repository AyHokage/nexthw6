import React from 'react'
import { Event } from '../types'

interface Props {
  eventData: Event
}

const EventDetails = ({eventData}: Props) => {
  console.log(eventData)
  return (
    <div>
      <h1>{eventData.name}</h1>
      <h2>{eventData.description}</h2>
      <h2>{eventData.type}</h2>
    </div>
  )
}

export default EventDetails

export async function getServerSideProps(context: any) {
  const {params} = context
  const response = await fetch(`http://localhost:3000/api/events/${params.eventId}`)
  const data = await response.json()

  return {
    props: {
      eventData: data
    }
  }
}