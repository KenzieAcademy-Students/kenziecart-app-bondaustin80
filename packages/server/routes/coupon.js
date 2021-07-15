import express from 'express'
import { Coupon } from '../models'

const router = express.Router()

router.get("/create", async (req, res) => {
    const couponCode = req.query.couponCode
    const discount = req.query.discount

    const coupon = new Coupon({
        couponCode,
        discount,
    })
    try {
        const result = await coupon.save()
        console.log(result)
        return res.json(result)
    } catch (error) {
        console.log(error)
    }
})

router.get("/verify", async (req, res) => {
    const couponCode = req.query.couponCode

    try {
        const code = await Coupon.findOne({ couponCode })
        const discount = code.discount
        console.log(discount)
        return res.json(discount)
    } catch (error) {
        res.status(400).send("Invalid Code")
    }

})

module.exports = router