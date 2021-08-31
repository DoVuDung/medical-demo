const {
  connect
} = require('getsream')
const bcrypt = require('bcrypt')
const StreamChat = require('stream-chat')
const crypto = require('crypto')

const api_key = process.env.STREAM_API_KEY
const api_secret = process.env.STREAM_API_SECRET
const api_id = process.env.STREAM_API_ID


const signup = async (req, res) => {
  try {
    const {
      fullName,
      username,
      password,
      phoneNumber
    } = req.body

    const userId = crypto.randomBytes(16).toString('hex')

    const serverClient = connect(apt_key, api_secret, app_id) //stream connect to server

    const hashedPassword = await bcrypt.hash(password, 10) //hash password to || use async await

    const token = serverClient.createUserToken(userId)

    res.status(200).json({
      token,
      fullName,
      username,
      userId,
      hashedPassword,
      phoneNumber
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: error
    })
  }
}
const login = async (req, res) => {
  try {
    const {username, password} = req.body

    const serverClient = connect(apt_key, api_secret, app_id) //stream connect to server

    const client = StreamChat.getInstance(api_key, api_secret)

    const{users} = await client.queryUsers({name: username})//query user from db
    if(!users.lenght) return res.status(400).json({message:"user not found"})
    const success = await bcrypt.compare(password, users[0].hashedPassword)

    const tokem = serverClient.createUserToken(users[0].id)

    if(success) {
      res.status(200).json({token, fullName: users[0].fullName,username,userId: users[o].id })
    }else{
      res.status(500).json({message:'Incorrect password'})
    }

  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: error
    })
  }
}
module.exports = {
  login,
  signup
}