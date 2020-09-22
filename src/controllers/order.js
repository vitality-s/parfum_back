import ProductModel from "../models/product";
import OrderModel from "../models/order";
import UserModel from "../models/users";

class OrderController {
    async create(req, res) {
        const order = new OrderModel({
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            number: req.body.number,
            attachment: req.body.attachment,
            price: req.body.price,
        })

        await order.save().then((order) => {
            res.status(200).json(order)
            console.log(order)
        }).catch((e) => {
            res.status(404).json({
                messange: "Error"
            })
            console.log("hghh")
        })
    }

    async getOrders(req, res) {
        try {
            const orders = await OrderModel.find()
            res.status(200).json(orders)
        } catch (e) {
            res.status(404).json({
                message: "Error"
            })
        }


    }

    remove(req, res) {
        const id = req.params.id;
        OrderModel.findByIdAndDelete(id).then(order => {
            if (order) {
                res.status(200).json({
                    message: "Order was "
                });
            } else {
                res.status(404).json({
                    user: "Error"
                });
            }
        }).catch(() => {
            res.status(404).json({
                messange: "not remove"
            })
        })

    }
}

export default OrderController