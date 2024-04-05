import { NextApiRequest, NextApiResponse } from "next";
import { events } from "../../../../data/events";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET'){
        res.status(200).json(events)
    } if (req.method === 'POST'){
        const newEvent = {
            id: events.length+1,
            name: req.body.name,
            type: req.body.type,
            description: req.body.description,
        }

        events.push(newEvent)
        res.status(201).json(newEvent)
    }
}