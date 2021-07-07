# se-mern-ecommerce-app

## Run Client/Server for Development

First, install all of the dependencies.  You should only need to do this once.

```
yarn install
```

```
yarn start
```

## Frontend

The client was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Backend

The server uses MongoDB, make sure you have it installed in your system.

Install MongoDB and start your server: [MongoDB instructions](https://docs.mongodb.com/manual/administration/install-community/)

Seed database with sample data:

```
yarn seed
```

---

## Student Challenges

### Implement Saved Cart on client

1. Update useCart hook to add cart state to localstorage.
2. Add actions for loading, updating, deleting
3. Update the reducer for each
4. Add useEffect to initialize saved cart on load

### Create Order on successful checkout

1. Update order post route on server to create new Order in db
2. Return Order ID
3. Display ID in successful order confirmation on client side

### Validate Form / Credit Card details before submitting order

1. Add handler to inputs [Consult React Payments README](https://github.com/medipass/react-payment-inputs#with-hooks)
2. Disable **Complete Order** button until valid
3. Validate before submitting in **handlePlaceOrder()**
