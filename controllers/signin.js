const handleSignin = (db, bcryptjs) => (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return res.status(400).json('Incorrect form submition.');
    }
    db.select('email', 'hash')
        .from('login')
        .where('email', '=', email)
        .then(login => {
            const isValid = bcryptjs.compareSync(password, login[0].hash);
            // console.log('isValid', isValid);
            // console.log('user', login[0]);
            if (isValid) {
                return db.select('*').from('users')
                    .where('email', '=', email)
                    .then(user => {
                        //console.log(user[0]);
                        res.json(user[0]);
                    })
            } else {
                res.status(400).json('Wrong credentials!')
            }
        })
        .catch(() => res.status(400).json('Unable to fetch user.'));
}

module.exports = {
    handleSignin: handleSignin
}