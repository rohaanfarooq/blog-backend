import express from "express";
import {
  addBlog,
  deleteBlog,
  getAllBlogs,
  getByID,
  getByUserId,
  updateBlog,
  // getrandomblogs,
  getheadlines,
  gettrending,
  getlistings,
  getpicks,
} from "../controllers/blog-controller.js";

const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs);
blogRouter.post("/add", addBlog);
blogRouter.put("/update/:id", updateBlog);
blogRouter.get("/:id", getByID);
blogRouter.delete("/:id", deleteBlog);
blogRouter.get("/user/:id/", getByUserId);
// blogRouter.get("/getrandom/:randno/", getrandomblogs);
blogRouter.get("/get/headlines", getheadlines);
blogRouter.get("/get/trending", gettrending);
blogRouter.get("/get/listings", getlistings);
blogRouter.get("/get/picks", getpicks);

export default blogRouter;
