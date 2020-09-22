import ProductModel from "../models/product";

class ProductController {
    async create(req, res) {
        const product = new ProductModel({
            title: req.body.title,
            price: req.body.price,
            model: req.body.model,
            image: req.file.path,
            emblem: req.body.emblem,
            gender: req.body.gender,
            descript: req.body.descript,
            country: req.body.country,
            type: req.body.type,
            classific: req.body.classific,
            start_note: req.body.start_note,
            end_node: req.body.end_node
        })
        await product.save().then((product) => {
            res.status(200).json(product)
            console.log(product)
        }).catch((e) => {
            res.status(404).json({
                messange: e,
            })
        })
    }

    async update(req, res) {
        const updateData = {
            title: req.body.title,
            price: req.body.price,
            model: req.body.model,
            image: req.file ? req.file.path : '',
            emblem: req.body.emblem,
            gender: req.body.gender,
            charact: {
                descript: req.body.charact.descript,
                country: req.body.charact.country,
                type: req.body.charact.type,
                classific: req.body.charact.classific,
                start_note: req.body.charact.start_note,
                end_node: req.body.charact.end_node
            }
        }
        try {
            const product = await ProductModel.findOneAndUpdate({
                _id: req.param.id
            }, {$set: updateData}, {new: true})
            res.status(200).json(product)
        } catch (e) {
            res.status(404).json({
                message: "Error"
            })
        }

    }

    async get(req, res) {
        try {
            const products = await ProductModel.find()
            res.status(200).json(products)
        } catch (e) {
            res.status(404).json({
                message: "Error"
            })
        }
    }
    async getById(req, res) {
        try {
            const product = await ProductModel.findById(req.params.id)
            res.status(200).json(product)
        } catch (e) {
            res.status(404).json({
                message: "Error"
            })
        }
    }
    remove(req, res) {
        const id = req.params.id;
        ProductModel.findByIdAndDelete(id).then(product => {
            if (product) {
                res.status(200).json({
                    user: product.title + " remove"
                });
            } else {
                res.status(404).json({
                    message: "Error"
                });
            }
        }).catch(() => {
            res.status(404).json({
                messange: "not remove"
            })
        })


    }
}

export default ProductController