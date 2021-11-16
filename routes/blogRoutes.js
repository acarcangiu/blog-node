const express = require('express')
const Blog = require('../models/blog')


const router = express.Router();



//get all the blogs
router.get('/all-blogs', (req,res)=> {
    Blog.find()
        .then((result)=> {
            res.send(result)
        })
        .catch((err)=> {
            console.log(err)
        })
});

//get a single blog
router.get('/single-blog',(req,res)=> {
    Blog.findById('615438836214f81e114f526c')
        .then((result)=>{
            res.send(result)
        })
        .catch((err)=> {
            console.log(err)
        })
})


router.get('/', (req,res)=> {
    const blogs = [
        res.redirect('blogs')
    ];
   // res.send('<p>home page</p>');
   res.render('index', { title: 'Home', blogs: blogs })
});

router.get('/about', (req,res)=> {
   // res.send('<p>about</p>');
      res.render('about')

});

//blog routes
router.get('/blogs',(req,res)=>{
    Blog.find().sort({createdAt: -1})
        .then((result)=>{
            res.render('index',{ title: 'All Blogs',blogs: result})
        })
        .catch((err)=>{
            console.log(err)
        })
})

router.post('/blogs', (req,res)=>{
    const blog = new Blog(req.body);
    blog.save()
        .then((result)=>{
            res.redirect('/blogs')
        })
        .catch((err)=>{
            console.log(err)
        })
})


// router.get('/blogs/:id', (req, res) => {
//   const id = req.params.id;
//   Blog.findById(id)
//     .then(result => {
//       res.render('details', { blog: result, title: 'Blog Details' });
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });

router.get('/create', (req,res)=> {

    res.render('create');
})

module.exports = router;
