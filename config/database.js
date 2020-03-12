const mongoose = require('mongoose')
const configureDB = () => {
    mongoose.Promise = global.Promise
    const CONNECTION_URI =
        process.env.MONGODB_URI ||
        "mongodb://localhost:27017/react-asg";
    mongoose.connect(CONNECTION_URI, { useNewUrlParser: true })
        .then(() => {
            console.log('connected to db')
        })
        .catch(err => {
            console.log('error connecting to db', err)
        })
}

module.exports = configureDB