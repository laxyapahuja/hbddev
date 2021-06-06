const express = require('express');
const router = express.Router();
const questions = require('../data/questions')
const answers = require('../data/answers')

let players = {}

router.get('/', (req, res) => {
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    if (players[ip]) {

    } else {
        players[ip] = 0
    }
    if (players[ip] == 3) {
        res.redirect('/play/fin')
    } else {
        if (req.query.type == 'wrong') {
            res.render('play', { level: players[ip], question: questions[players[ip]], message: 'wrong answer DEVJYOTI' })
        } else {
            res.render('play', { level: players[ip], question: questions[players[ip]], message: '' })
        }
    }
});

router.post('/submit', (req, res) => {
    let inputAnswer = req.body.answer
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    inputAnswer = inputAnswer.toLowerCase().replace(' ', '')
    if (answers[players[ip]] == inputAnswer) {
        players[ip] += 1
        res.redirect('/play')
    } else {
        res.redirect('/play?type=wrong')
    }
})

router.get('/fin', (req, res) => {
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    if (players[ip] == 3) {
        res.render('fin', { ip: ip })
    } else {
        res.redirect('/play')
    }
    res.render('fin', { ip: ip })
})

module.exports = router