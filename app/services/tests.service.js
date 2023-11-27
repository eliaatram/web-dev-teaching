const getTest = (req, res) => {
    return res.status(200).json("It works on test!")
}

const addTest = (req, res) => {
    console.log(req.body)

    const { name } = req.body

    if (!name && name == "") {
        return res.status(500).json('You have to give a name')
    }

    return res.status(200).json(`My name is ${name}`)
}

module.exports = {
    getTest,
    addTest
}