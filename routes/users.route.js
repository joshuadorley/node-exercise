import express from "express";
import db from "../mockdb/index.js"; // Adjust the path to your mock database

const router = express.Router();

// GET: Fetch one user by ID or all users
router.get("/:id?", async (req, res, next) => {
  try {
    const { id } = req.params; // Destructure ID from params
    let data;

    if (id) {
      data = await db.getOne(id); // Fetch single user
    } else {
      data = await db.getAll(); // Fetch all users
    }

    res.json(data); // Send response
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
});

// POST: Add a new user
router.post("/", async (req, res, next) => {
  try {
    const newUser = req.body; // Extract new user data from request body
    const data = await db.add(newUser); // Add new user to the database
    res.status(201).json(data); // Send response with 201 status
  } catch (error) {
    next(error);
  }
});

// PUT: Update an existing user by ID
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params; // Destructure ID from params
    const updatedUser = req.body; // Extract updated user data from request body
    const data = await db.update(id, updatedUser); // Update user in database
    res.json(data); // Send updated user data as response
  } catch (error) {
    next(error);
  }
});

// DELETE: Remove a user by ID
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params; // Destructure ID from params
    const data = await db.remove(id); // Remove user from database
    res.json(data); // Send response confirming deletion
  } catch (error) {
    next(error);
  }
});

export default router;
