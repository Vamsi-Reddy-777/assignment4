require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Todos = require('./models/Todos');

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/',(req,res)=>{
    res.render('home');
})

app.get('/Todo', async (req,res)=>{
    const Todo = await Todos.find({});
    res.render('Todo/index',{Todo});
})


app.get('/Todo/new', (req,res)=>{
    res.render('Todo/new');
})

app.post('/Todo', async (req, res) => {
    const Todo = new Todos(req.body.Todolist);
    await Todo.save();
    res.redirect(`/Todo/${Todo._id}`)
})

app.get('/Todo/:id', async (req,res)=>{
    const Todoitem = await Todos.findById(req.params.id);
    res.render('Todo/show',{Todoitem});
})

app.put('/Todo/:id', async (req, res) => {
    const { id } = req.params;
    const Todoitem = await Todos.findByIdAndUpdate(id, { ...req.body.Todolist });
    res.redirect(`/Todo/${Todoitem._id}`)
});

app.get('/Todo/:id/edit', async (req, res) => {
    const Todo = await Todos.findById(req.params.id)
    res.render('Todo/edit', { Todo });
})

app.delete('/Todo/:id', async (req, res) => {
    const { id } = req.params;
    await Todos.findByIdAndDelete(id);
    res.redirect('/Todo');
})

app.listen(3000, ()=>{
    console.log("The server is listening");
})
