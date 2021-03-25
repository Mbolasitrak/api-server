const express = require('express')
const router = express.Router()
const enquete = require('../controller/controller')
const m = require('../autres/middlewares')

/* All enquetes */
// tp-async-promise-async-await
router.get('/', async (req, res) => {
    await enquete.getEnquetes()
        .then(enquetes => res.json(enquetes))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            } else {
                res.status(500).json({ message: err.message })
            }
        })
})

/* A enquete by id */
// tp-async-promise-async-await
router.get('/:id', m.mustBeInteger, async (req, res) => {
    const id = req.params.id

    await enquete.getEnquete(id)
        .then(enquete => res.json(enquete))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            } else {
                res.status(500).json({ message: err.message })
            }
        })
})

/* Insert a new enquete */
// tp-async-promise-async-await
router.post('/', m.checkFieldsEnquete, async (req, res) => {
    await enquete.insertEnquete(req.body)
        .then(enquete => res.status(201).json({
            message: `l'enquete #${enquete.id} a été créer`,
            content: enquete
        }))
        .catch(err => res.status(500).json({ message: err.message }))
})

/* Update a enquete */
// tp-async-promise-async-await
router.put('/:id', m.mustBeInteger, m.checkFieldsEnquete, async (req, res) => {
    const id = req.params.id

    await enquete.updateEnquete(id, req.body)
        .then(enquete => res.json({
            message: `l'enquete #${id} a été modifier`,
            content: enquete
        }))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            }
            res.status(500).json({ message: err.message })
        })
})

/* Delete a enquete */
// tp-async-promise-async-await
router.delete('/:id', m.mustBeInteger, async (req, res) => {
    const id = req.params.id

    await enquete.deleteEnquete(id)
        .then(enquete => res.json({
            message: `l'enquete #${id} a été supprimer`
        }))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            }
            res.status(500).json({ message: err.message })
        })
})

module.exports = router
