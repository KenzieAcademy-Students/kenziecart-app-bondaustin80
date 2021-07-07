import { connect, disconnect } from 'mongoose'
import chalk from 'chalk'
import User from './models/user'
import Product from './models/product'
import keys from './config/keys'

async function seedDatabase() {
  try {
    await connect(keys.database.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    const users = await User.find({})
    const products = await Product.find({})
    if (users.length === 0 && products.length === 0) {
      console.log(
        chalk.yellow(
          'No users or products in the database, creating sample data...'
        )
      )
      const user = new User({ name: 'John Doe', age: 34 })
      await user.save()
      console.log(chalk.green('Sample user successfuly created!'))
      const newProducts = [
        {
          name: 'Unisex Perfume',
          description:
            'This is a small product description to explain the item…',
          price: 15,
          quantity: 50,
          category: 'wellness',
          productImage: 'perfume.png',
        },
        {
          name: 'Smart Watch',
          description:
            'This is a small product description to explain the item…',
          price: 120,
          quantity: 50,
          category: 'electronics',
          productImage: 'watch.png',
        },
        {
          name: 'Wireless Earbuds',
          description:
            'This is a small product description to explain the item…',
          price: 60,
          quantity: 50,
          category: 'electronics',
          productImage: 'earbuds.png',
        },
        {
          name: 'Action Camera',
          description:
            'This is a small product description to explain the item…',
          price: 75,
          quantity: 50,
          category: 'accessories',
          productImage: 'camera.png',
        },
        {
          name: 'Stainless Headphones',
          description:
            'This is a small product description to explain the item…',
          price: 150,
          quantity: 50,
          category: 'electronics',
          productImage: 'headphones.png',
        },
        {
          name: 'Vintage Polaroid',
          description:
            'This is a small product description to explain the item…',
          price: 30,
          quantity: 50,
          category: 'accessories',
          productImage: 'polaroid.png',
        },
        {
          name: 'Bluetooth Speaker',
          description:
            'This is a small product description to explain the item…',
          price: 30,
          quantity: 50,
          category: 'electronics',
          productImage: 'speaker.png',
        },
      ]
      await Product.insertMany(newProducts)
      console.log(
        chalk.green(`${newProducts.length} product(s) successfuly created!`)
      )
    } else {
      console.log(
        chalk.yellow('Database already initiated, skipping populating script')
      )
    }
  } catch (error) {
    console.log(chalk.red(error))
  }
}

module.exports = seedDatabase
