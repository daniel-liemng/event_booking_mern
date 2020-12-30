const router = require("express").Router();
const eventController = require("../controllers/eventController");
const authProtect = require("../middleware/authMiddleware");

router.get("/", eventController.getAllEvents);
router.get("/:eventId", eventController.getSingleEvent);
router.post("/", authProtect, eventController.createEvent);
router.put("/:eventId", authProtect, eventController.updateEvent);
router.delete("/:eventId", authProtect, eventController.deleteEvent);

module.exports = router;
