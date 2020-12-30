const { create } = require("../models/Event");
const Event = require("../models/Event");

const getAllEvents = async (req, res) => {
  try {
    const allEvents = await Event.find();

    res.json(allEvents);
  } catch (err) {
    throw new Error("Server Error");
  }
};

const getSingleEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);

    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ message: "Event Not Found" });
    }
  } catch (err) {
    throw new Error("Server Error");
  }
};

const createEvent = async (req, res) => {
  const { title, imageUrl, price, date, description } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }
  if (!imageUrl) {
    return res.status(400).json({ message: "Image URL is required" });
  }
  if (!price) {
    return res.status(400).json({ message: "Price is required" });
  }
  if (!date) {
    return res.status(400).json({ message: "Date is required" });
  }
  if (!description) {
    return res.status(400).json({ message: "Description is required" });
  }

  const newEvent = new Event({
    title,
    imageUrl,
    price,
    date,
    description,
    creator: req.user.id,
  });

  const createdEvent = await newEvent.save();

  res.status(201).json(createdEvent);
};
const updateEvent = async (req, res) => {
  const { title, imageUrl, price, date, description } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }
  if (!imageUrl) {
    return res.status(400).json({ message: "Image URL is required" });
  }
  if (!price) {
    return res.status(400).json({ message: "Price is required" });
  }
  if (!date) {
    return res.status(400).json({ message: "Date is required" });
  }
  if (!description) {
    return res.status(400).json({ message: "Description is required" });
  }

  try {
    const event = await Event.findById(req.params.eventId);

    if (event) {
      if (event.creator.toString() !== req.user.id.toString()) {
        res.status(401).json({ message: "Not Authorize" });
      } else {
        event.title = title;
        event.imageUrl = imageUrl;
        event.price = price;
        event.date = date;
        event.description = description;
        event.creator = req.user.id;

        const updatedEvent = await event.save();

        res.json(updatedEvent);
      }
    } else {
      res.status(404).json({ message: "Event Not Found" });
    }
  } catch (err) {
    throw new Error("Server Error");
  }
};

const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);

    if (event) {
      if (event.creator.toString() !== req.user.id.toString()) {
        res.status(401).json({ message: "Not Authorize" });
      } else {
        await event.remove();

        res.json({ message: "Event deleted successfully" });
      }
    } else {
      res.status(404).json({ message: "Event Not Found" });
    }
  } catch (err) {
    throw new Error("Server Error");
  }
};

module.exports = {
  getAllEvents,
  getSingleEvent,
  createEvent,
  updateEvent,
  deleteEvent,
};
