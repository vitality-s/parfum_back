import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose"
import UserController from "./src/controllers/users";
import cors from 'cors'
import {fileValid, storage} from "./src/middleware/upload";
import ProductController from "./src/controllers/product";
import multer from  'multer'
import OrderController from "./src/controllers/order";

const app = express();
mongoose.connect("mongodb://localhost:27017/back", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(multer({storage: storage, fileFilter: fileValid}).single('image'));
app.use('/uploads', express.static('uploads'));

const User = new UserController();
const Product = new ProductController();
const Order = new OrderController();

app.post('/api/login', User.login);
app.get('/api/verify', User.verify);
app.post('/api/register', User.create);
app.delete('/api/user/delete/:id', User.delete)

app.get('/api/product/:id', Product.getById)
app.post('/api/new/product', Product.create);
app.get('/api/products', Product.get);
app.delete('/api/product/delete/:id', Product.remove);

app.get('/api/orders', Order.getOrders)
app.post('/api/new/order', Order.create);
app.delete('/api/orders/:id', Order.remove);

app.listen(3012, function () {
    console.log('Example app listening on port 3001!');
});
console.log('Example app listening on port 3001!');