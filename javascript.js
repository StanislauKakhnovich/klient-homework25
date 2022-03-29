let buttonSignUp = document.querySelector('#btn-sign-up');
let formSignUp = document.querySelector('.form-sign-up');
let formSignChange = document.querySelector('.form-sign-change');
let changeForm = document.querySelector('#change-form');
let btnChange = document.querySelector('#submit-change');
let textSuccess = document.querySelector('#sucсess1');

buttonSignUp.addEventListener('click', () => {
    formSignUp.classList.remove('hidden');
    formSignIn.classList.add('hidden');
    formSignChange.classList.add('hidden');
    textSuccess.classList.add('hidden');
   
});

let buttonSignIn = document.querySelector('#btn-sign-in');
let formSignIn = document.querySelector('.form-sign-in');

buttonSignIn.addEventListener('click', () => {
    formSignIn.classList.remove('hidden');
    formSignUp.classList.add('hidden');
    formSignChange.classList.add('hidden');
    textSuccess.classList.add('hidden');
});

let userId;

const USERS_URL = 'https://server-homework25.herokuapp.com/api/registration'


const postForm = async () => {

    const data = {};
    const formItems = document.querySelector('.form-sign-up').elements;
    console.log(formItems);

    for (let i=0; i < formItems.length - 1; i++){
        data[formItems[i].name] =  formItems[i].value;
    }
   
    const settings = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    }

    try{
        const response = await fetch (USERS_URL, settings);
        const data = await response.json();
        console.log(data);
        userId = data.id;
        sessionStorage.setItem('userId', userId);
        
    } catch (e) {
        console.log(e);
    }
}


let errorSignIn = document.querySelector('#error8');

const getDataUser = (event) => {
    
    let inputPassword = document.querySelector('#password-in').value; 
    let inputEmail = document.querySelector('#e-mail-in').value;
    let formChangeDataUser = document.querySelector('#change-form')

    fetch(USERS_URL).then(
        response => {
            return response.json();
        }
    ).then(
        data => {
            
                if (data.some(item => {return (item.password  == inputPassword && item.mail  == inputEmail)})) {
                    data.forEach(elem => {
                        if (elem.password == inputPassword) {
                            userId = elem.id;
                            sessionStorage.setItem('userId', elem.id);
                            changeForm.classList.remove('hidden');
                            btnChange.classList.remove('hidden');

                            formChangeDataUser.innerHTML = `
                            <form  action="#" novalidate class="form-sign-change">
                            <div class="clearfix">
                                <label for="name1">Измените ваше имя:</label>
                                <div class="registration"><input  id="name1" type="text" name="nameUser" value = ${elem.nameUser}>
                                </div>
                            </div>
                            <div class="clearfix">
                                <label for="country1">Измените страну:</label>
                                <div class="registration"><input  id="country1" type="text" name="country" value = ${elem.country}>
                                </div>
                            </div>
                            <div class="clearfix">
                                <label for="town1">Измените город:</label>
                                <div class="registration"><input  id="town1" type="text" name="town" value = ${elem.town}>
                                </div>
                            </div>
                            <div class="clearfix">
                                <label for="e-mail-up1">Измените ваш e-mail:</label>
                                <div class="registration"><input  id="e-mail-up1" type="text" name="mail" value = ${elem.mail}>
                                </div>
                            </div>
                            <div class="clearfix">
                                <label for="password-up1">Измените ваш пароль:</label>
                                <div class="registration"><input  id="password-up1" type="text" name="password" value = ${elem.password}>
                                </div>
                            </div>
                            </form>
                            `
                        }  
                    })
                } 
                if (data.every(item => {return (item.password != inputPassword || item.mail  != inputEmail)})) {
                    errorSignIn.style.display = 'block';
                }
        }
    )  
}
userId = sessionStorage.getItem('userId');
console.log(userId);

const postChangeDataUser = async () => {

    //userId = sessionStorage.getItem('userId');
    console.log(userId);

    let formItems1 = document.querySelector('.form-sign-change');
    
    let nameUserData = formItems1.elements.nameUser.value;
    let countryData = formItems1.elements.country.value;
    let townData = formItems1.elements.town.value;
    let mailData = formItems1.elements.mail.value;
    let passwordData = formItems1.elements.password.value;

    const settings = {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "nameUser": nameUserData,
            "country": countryData,
            "town": townData,
            "mail": mailData,
            "password": passwordData
        })
    }

    try{
        const fetchRes = await fetch(`${USERS_URL}/${userId}`, settings);
        const data = await fetchRes.json();
        formSignIn.classList.add('hidden');
        changeForm.classList.add('hidden');
        btnChange.classList.add('hidden');
        textSuccess.classList.remove('hidden');

        return data;
    } catch (e) {
        console.log(e);
    }
}

formSignUp.addEventListener('submit', function (event) {
    event.preventDefault();
    postForm();
});

formSignIn.addEventListener('submit', function (event) {
    event.preventDefault();
    getDataUser();
});

btnChange.addEventListener('click', postChangeDataUser);
