const router = require('express').Router();
const Anegdot = require('../models/anegdot');

// desc: GET all anegdots
router.get('/', async (req, res) => {
    const anegdots = await Anegdot.find();
    if (anegdots) {
        res.status(200).json(anegdots);
    } else {
        res.status(404).json({ error: 'anegdots cannot be retreived' });
    }
});

// desc: POST/CREATE new article
router.post('/', async (req, res) => {
    const body = req.body;

    // create anegdot object
    // @keys (text, category, likes)
    const anegdot = new Anegdot({
        text: body.text,
        category: body.category,
        likes: body.likes
    });

    // save anegdot
    const savedAnegodt = await anegdot.save();

    if (savedAnegodt) {
        res.status(201).json(savedAnegodt);
    } else {
        res.status(400).json({ error: 'anegdot cannot be created' });
    }
});

// desc: PUT/UPDATE anegdot
router.put('/:id', async (req, res) => {
    const body = req.body;

    // create anegdot object
    const anegdot = {
        text: body.text,
        category: body.category,
        likes: body.likes
    };

    // update anegdot object
    const updatedAnegdot = await Anegdot.findByIdAndUpdate(req.params.id, anegdot, { new: true });

    if (updatedAnegdot) {
        res.status(201).end();
    } else {
        res.status(400).json({ error: 'anegdot cannot be updated' });
    }
});

module.exports = router;