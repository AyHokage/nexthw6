import { NextApiRequest, NextApiResponse } from "next";
import { events } from "../../../../data/events";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {eventId} = req.query;
    const event = events.find(ev => Number(eventId) === ev.id)
    const eventIndex = events.findIndex(ev => Number(eventId) === ev.id)

    if (typeof eventId === 'string'){
        if (req.method === 'GET'){
            res.status(202).json(event)
        }
        if (req.method === 'PUT'){
            const editEvent = {
                id: req.body.id,
                name: req.body.name,
                description: req.body.description,
                type: req.body.type
            }

            events[Number(eventIndex)] = editEvent
            res.status(200).json(event)
        }
        if (req.method === 'DELETE'){
            events.splice(Number(eventIndex), 1)
            res.status(200).json(event)
        }
    }
}