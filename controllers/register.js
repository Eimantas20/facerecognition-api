const handleRegister = (req, res, db, bcrypt) => {
    const { email, name, password } = req.body;
    if(!email || !name || !password) {
        return res.status(400).json('Incorect form submission');
    }
    const hash = bcrypt.hashSync(password);
    db.transaction(trx => {//We use transaction because we need to do more then one operation at once
        //so we change db to trx - use instead of it, to do these operations
        trx.insert({//inserting into login 
            hash: hash,
            email: email
        })
            .into('login')
            .returning('email')//returns an email
            .then(loginEmail => {//we used just returned loginEmail to return other trx transaction
                return trx('users') //may need a - return before trx('users')
                    //this is a second trx transaction to insert into the users table 
                    .insert({
                        email: loginEmail[0],
                        name: name,
                        joined: new Date()
                    })
                    .returning('*')
                    .then(user => {//responding with json
                        res.json(user[0]);
                    })
            })
            .then(trx.commit)//in order that all that gets added we need to commit
            .catch(trx.rollback)//in case anything fail we rollback
    })
        .catch(err => res.status(400).json('Unable to register'))
}

export default handleRegister