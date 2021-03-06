import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  /* validateRegister(user){
    if(user.name == undefined || user.email == undefined ||
      user.username == undefined || user.password  == undefined ){
        return false;
    }
    else{
        return true;
    }
  }

  validateEmail(email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  } */
  // my modifications ----------------------------------------
  validateRegister(user){
    if(user.name == undefined || user.email == undefined ||
      user.username == undefined || user.password  == undefined
      || user.name.length == 0 || user.email.length == 0 ||
      user.username.length == 0 || user.password.length  == 0 ){
      return false;
    }
    else{
      return true;
    }
  }

  validateEmail(email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(email)){
      return true;
    }
    else{
      return false;
    }
  }
  validatePassword(pwd){
    if(pwd.length < 5){
      return false;
    }
    else{
      return true;
    }
  }
  //my modifications ends ----------------------------------------
}
