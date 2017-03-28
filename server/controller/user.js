const express = require('express')
const router = express.Router()
const sha1 = require('sha1')
const moment = require('moment')

const createToken = require('../middleware/checkToken')
const checkToken = require('../middleware/checkToken')

const Login = (req, res) => {
  let userLogin = {
    username: req.body.username,
    password: sha1(req.body.password),
    token: createToken(this.username)
  } 
  router.post('/login', userLogin, (req, res) {
    
  })
}