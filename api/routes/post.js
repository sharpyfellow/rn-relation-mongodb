const express = require("express");
const router = express.Router();
const Post = require("../models/post"); // Import Post model

// Create a new post
router.post("/", async (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
    postedBy: req.body.postedBy, // Assuming postedBy is the User's ID
  });
  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("postedBy", "name country") // Populate the 'postedBy' field with user data
      .sort({ createdAt: -1 }); // Sort by createdAt in descending order
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single post by ID
router.get("/:id", getPost, (req, res) => {
  res.json(res.post);
});

// Update a post by ID
router.patch("/:id", getPost, async (req, res) => {
  if (req.body.title != null) {
    res.post.title = req.body.title;
  }
  if (req.body.description != null) {
    res.post.description = req.body.description;
  }
  try {
    const updatedPost = await res.post.save();
    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a post by ID
router.delete("/:id", getPost, async (req, res) => {
  try {
    await res.post.remove();
    res.json({ message: "Post Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware to get post by ID
async function getPost(req, res, next) {
  let post;
  try {
    post = await Post.findById(req.params.id);
    if (post == null) {
      return res.status(404).json({ message: "Cannot find post" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.post = post;
  next();
}

//Get posts by user ID

router.get("/user/:userId", async (req, res) => {
  try {
    const posts = await Post.find({ postedBy: req.params.userId })
      .populate("postedBy", "name country")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
