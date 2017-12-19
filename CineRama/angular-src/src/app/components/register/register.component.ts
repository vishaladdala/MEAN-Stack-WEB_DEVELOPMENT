import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
//import { FlashMessagesService } from 'angular2-flash-messages';
import { FlashMessagesService } from 'ngx-flash-messages';
import { Router } from '@angular/router';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	//create a property for each field of the user.
	name: String;
	username: String;
	email: String;
	password: String;

	constructor(
		private validateService: ValidateService, 
		private _flashMessagesService: FlashMessagesService,
		private authService: AuthService,
		private router : Router 
	) { }

	ngOnInit() {
	}

	onRegisterSubmit(){
		//console.log("Submit event : called function - onRegisterSubmit() ");
		//console.log("Data received on submit: "+ this.name + " - "+ this.username + " - " + this.email);
		const user = {
			name : this.name,
			email : this.email,
			username : this.username,
			password: this.password 
		}

		/* //required fields
		if(!this.validateService.validateRegister(user)){
			this._flashMessagesService.show('please fill in all fields', {
				classes: ['alert', 'alert-danger'], // You can pass as many classes as you need
				timeout: 2000, // Default is 3000
			}); 
			return false;
		}

		//required email --- validation service
		if(!this.validateService.validateEmail(user.email)){
			// console.log('please fill in valid email '); 
			this._flashMessagesService.show('please fill in valid email ', {
				classes: ['alert', 'alert-danger'], // You can pass as many classes as you need
				timeout: 2000, // Default is 3000
			}); 
			return false;
		} */
		//===================== my modifications :
		//required fields
		//console.log(compareVariable);
		//console.log(user.name + " -- "+ user.email + " -- "+ user.username  + " -- "+ user.password);
		var mainFlag = false;
		var fieldFlag = false;
		var emailFlag = false;
		var pwdFlag = false;
		if(this.validateService.validateRegister(user) == false){
			this._flashMessagesService.show('All the fields are required to register. Please fill in.', {
				classes: ['alert', 'alert-danger'], // You can pass as many classes as you need
				timeout: 4000, // Default is 3000
			});
			//return false;
			fieldFlag = false;
		}else{
			fieldFlag = true;
		}
		if(this.validateService.validateEmail(user.email) == false){
			console.log('false');
			this._flashMessagesService.show('Please provide a valid email address', {
				classes: ['alert', 'alert-danger'], // You can pass as many classes as you need
				timeout: 4000, // Default is 3000
			});
			//return false;
			emailFlag = false;
		}else{
			emailFlag = true;
		}
		if(this.validateService.validatePassword(user.password) == false){
			this._flashMessagesService.show('Password must be minimum 5 characters long', {
				classes: ['alert', 'alert-danger'], // You can pass as many classes as you need
				timeout: 4000, // Default is 3000
			});
			//return false;
			pwdFlag = false;
		}else{
			pwdFlag = true;
		}
		if(fieldFlag && emailFlag && pwdFlag){
			mainFlag =true;
		}
		else{
			mainFlag = false;
		}
		//===================== my modifications end

		//register user
		if(mainFlag){
			this.authService.registerUser(user).subscribe(data => { 
				if(data.success){
					this._flashMessagesService.show('You are Registered and can log in ', {
						classes: ['alert', 'alert-success'], // You can pass as many classes as you need
						timeout: 4000, // Default is 3000
					});
					this.router.navigate(['/login']);
				}else{
					this._flashMessagesService.show('User already registered with this email or username ', {
						classes: ['alert', 'alert-danger'], // You can pass as many classes as you need
						timeout: 4000, // Default is 3000
					});
					this.router.navigate(['/register']);
				}
			});
		}
	}
}
