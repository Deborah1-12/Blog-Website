import Blog from '../models/blog.js';

export const getHome =  async (req, res) => {
  // Check if the user is logged in
    if (!req.session.username) {
    return res.redirect('/login');
  }

  const searchTerm = req.query.q; // get search from URL like /?q=hailey
  let blogs;

  if (searchTerm) {
    blogs = await Blog.find({
      $or: [
        { title: { $regex: searchTerm, $options: 'i' } },
        { body: { $regex: searchTerm, $options: 'i' } }
      ]
    });
  } else {
    blogs = await Blog.find(); // show all blogs if no search
  }

  res.render('index', {
    title: "Home",
    username: req.session.username,
    blogs,
    searchTerm,
    });
};

export const get404 = (req, res) => {
  res.render('404', {username: req.session.username,})
}
export const getCreate = (req, res) => {
  res.render('create', { title: "Create New Blog", });
};
export const postCreate = async (req, res) => {
  const {title, image, content} = req.body

  const newPost = {
    title,
    image,
    content,
  };
  
  if (!req.session.blogs) {
    req.session.blogs = [];
  }

  const blog = new Blog(newPost);
  await blog.save();


  res.redirect('/post');
};


export const getPost = async (req, res) => {
  const blog = await Blog.findOne().sort({ createdAt: -1 });

  if (!blog) {
    return res.redirect('/create');
  }


  res.render('post', {
    title: blog.blogTitle,
    image: blog.image,
    content: blog.content,
    id: blog._id,
  });
};


export const getSinglePost = async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return res.redirect('/404');
  }

  res.render('post', {
    title: blog.blogTitle,
    image: blog.image,
    content: blog.content,
    id: blog._id,
  });
};

export const getPostById = async (req, res) => {

  const blog = await Blog.findById(req.params.id); 
  if (!blog) {
    return res.redirect('/404');
  }

  res.render('post', {
    title: blog.blogTitle,
    image: blog.image,
    content: blog.content,
    id: blog._id,
  });
};

export const getEditPost =  async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.render('edit', {
    title: blog.blogTitle,
    image: blog.image,
    content: blog.content,
    id: blog._id,
  });
}

export const updatePost = async (req, res) => {
  try {
    const { image, title, content } = req.body;
    await Blog.findByIdAndUpdate(req.params.id, { image, title, content });
    res.json({ redirect: '/' });
  } catch (error) {
    res.redirect('/404');
  }
};

export const deletePost = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ redirect: '/' });
  } catch (error) {
    res.redirect('/404');
  }
};