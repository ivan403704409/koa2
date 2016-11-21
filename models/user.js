// const mongoose = require('mongoose')
import mongoose from 'mongoose'
import UsersSchema from '../schemas/user.js'

export default mongoose.model('User', UsersSchema)