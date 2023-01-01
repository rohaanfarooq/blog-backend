import mongoose from "mongoose";
import Blog from "../models/Blog.js";
import User from "../models/User.js";

export const getAllBlogs = async (req, res, next) => {
  let blogs;
  try {
    blogs = await Blog.find().populate("user");
  } catch (error) {
    return console.log(error);
  }
  if (!blogs) {
    return res.status(404).json({ message: "No Blogs Found" });
  }
  return res.status(200).json({ blogs });
};

export const addBlog = async (req, res, next) => {
  const { title, description, image, category, date, user } = req.body;

  let existingUser;
  try {
    existingUser = await User.findById(user);
  } catch (error) {
    return console.log(error);
  }
  if (!existingUser) {
    return res
      .status(400)
      .json({ message: "Unable to find user with this ID" });
  }

  const newBlog = new Blog({
    title,
    description,
    image,
    category,
    date,
    user,
  });
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await newBlog.save({ session });
    existingUser.blogs.push(newBlog);
    await existingUser.save({ session });
    await session.commitTransaction();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
  return res.status(201).json({ newBlog });
};

export const updateBlog = async (req, res, next) => {
  const { title, description } = req.body;
  const blogId = req.params.id;
  let blog;

  try {
    blog = await Blog.findByIdAndUpdate(blogId, {
      title,
      description,
    });
  } catch (error) {
    return console.log(error);
  }
  if (!blog) {
    return res.status(500).json({ message: "Unable to update" });
  }
  return res.status(200).json({ blog });
};

export const getByID = async (req, res, next) => {
  const blogId = req.params.id;
  let blog;
  try {
    blog = await Blog.findById(blogId).populate("user");
  } catch (error) {
    return console.log(error);
  }
  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }
  return res.status(200).json({ blog });
};

export const deleteBlog = async (req, res, next) => {
  const blogId = req.params.id;
  let blog;
  try {
    blog = await Blog.findByIdAndRemove(blogId).populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
  } catch (error) {
    return console.log(error);
  }
  if (!blog) {
    return res.status(500).json({ message: "Unable to Delete" });
  }
  return res.status(200).json({ message: "Blog Deleted Successfuly" });
};

export const getByUserId = async (req, res, next) => {
  const userId = req.params.id;
  let userBlogs;
  try {
    userBlogs = await User.findById(userId).populate("blogs");
  } catch (error) {
    return console.log(error);
  }
  if (!userBlogs) {
    return res.status(404).json({ message: "No blogs Found" });
  }
  return res.status(200).json({ user: userBlogs });
};

// export const getrandomblogs = async (req, res, next) => {
//   let randomblogs = [];
//   const randno = req.params.randno;
//   try {
//     for (let i = 0; i < randno; i++) {
//       randomblogs.push(await Blog.findOne().skip(1).populate("user"));
//     }
//   } catch (error) {
//     return console.log(error);
//   }
//   if (!randomblogs) {
//     return res.status(404).json({ message: "No Blogs Found" });
//   }
//   return res.status(200).json({ randomblogs });
// };
// export const getrandomblogs = async (req, res, next) => {
//   let randomblogs;
//   const randno = req.params.randno;
//   Blog.aggregate([{ $sample: { size: 1 } }]);
//   // try {
//   //   randomblogs = Blog.aggregate([{ $sample: { size: randno } }]);
//   // } catch (error) {
//   //   return console.log(error);
//   // }
//   // if (!randomblogs) {
//   //   return res.status(404).json({ message: "No Blogs Found" });
//   // }
//   // return res.status(200).json({ randomblogs });
// };

export const getheadlines = async (req, res, next) => {
  let headline;
  try {
    headline = await Blog.find().limit(3).sort({ _id: -1 }).populate("user");
  } catch (error) {
    return console.log(error);
  }
  if (!headline) {
    return res.status(404).json({ message: "No Blogsasss Found" });
  }
  return res.status(200).json({ headline });
};

export const gettrending = async (req, res, next) => {
  let trending;
  try {
    trending = await Blog.find().limit(3).skip(3).sort({ _id: -1 });
  } catch (error) {
    return console.log(error);
  }
  if (!trending) {
    return res.status(404).json({ message: "No Blogsasss Found" });
  }
  return res.status(200).json({ trending });
};

export const getlistings = async (req, res, next) => {
  let listings;
  try {
    listings = await Blog.find().limit(6).skip(6).sort({ _id: -1 });
  } catch (error) {
    return console.log(error);
  }
  if (!listings) {
    return res.status(404).json({ message: "No Blogsasss Found" });
  }
  return res.status(200).json({ listings });
};

export const getpicks = async (req, res, next) => {
  let picks;
  try {
    picks = await Blog.find().limit(3).skip(12).sort({ _id: -1 });
  } catch (error) {
    return console.log(error);
  }
  if (!picks) {
    return res.status(404).json({ message: "No Blogsasss Found" });
  }
  return res.status(200).json({ picks });
};
