import { postRequest } from "../../core/requests.js";

    // auth.js - exportable functions
        export async function login(email, password) {
            const body ={
                email,
                password
            }

const response = await postRequest('/login', body);
if(response.user){
    saveT
}
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (email === 'admin@test.com' && password === 'password') {
                        resolve({ success: true, token: 'fake-token' });
                    } else {
                        reject(new Error('Invalid credentials'));
                    }
                }, 1500);
            });
        }
        

        export function saveUser(user) {
            localStorage.setItem('user', JSON.stringify(user));
        }

        export function getUser() {
            const user = JSON.parse( localStorage.getItem('user')||'');
            return user||null;
        }

        export function confirmIfPasswordsMatch(password, confirmPassword){
            return password === confirmPassword;
        }

           export function showLoading(show = true) {
            document.getElementById('btnText').style.display = show ? 'none' : 'inline';
            document.getElementById('btnLoading').style.display = show ? 'inline' : 'none';
            document.getElementById('auth-btn').disabled = show;
        }

       export  function getCurrentUser(){
            const user =  getUser();
            if(!user.firstName){
                window.location.href('/');
return null;
            } else{
                return user;
            }
        }



export async function createUser(user){
const  endpoint =  `/users/create`;
const response = await postRequest(endpoint, user);

}

export function startSession(user){
    saveUser(user);
    window.location.href('dashboard.html')
}