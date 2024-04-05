import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Event } from "./types";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [events, setEvents] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/events');
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addEvent = async () => {
    const newEvent = {
      id: 0,
      name: name,
      description: description,
      type: type
    };

    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newEvent)
      });
      
      const data = await response.json();
      console.log(data);
      fetchProducts();
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  const editEvent = async (id: number) => {
    const newEvent = {
      id: 0,
      name: name,
      description: description,
      type: type
    }

    try {
      const response = await fetch(`/api/events/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEvent)
      })
      const data = await response.json();
      console.log(data);
      fetchProducts();
    } 
    catch (error){
      console.error('Error editing event:', error)
    }
  }

  const deleteEvent = async (id: number) => {
    try {
      const response = await fetch(`/api/events/${id}`, {
        method: 'DELETE'
      })
      const data = await response.json()
      console.log(data)
      fetchProducts()
    } catch (error){
      console.error('Error deleting event:', error)
    }
  }
  
  return (
    <div>
      <h1>My Events</h1>
      <input placeholder="Name" onChange={e => setName(e.target.value)}/>
      <input placeholder="Description" onChange={e => setDescription(e.target.value)}/>
      <input placeholder="Type" onChange={e => setType(e.target.value)}/>
      <button onClick={addEvent}>Add new event</button>
      {events.length > 0 ? events.map((ev: Event) => (
        <div key={ev.id}>
          <Link href={`/${ev.id}`}>{ev.name}</Link>
          <button onClick={() => editEvent(ev.id)}>Edit</button>
          <button onClick={() => deleteEvent(ev.id)}>Delete</button>
        </div>
      )) : <></>}
    </div>
  );
}
