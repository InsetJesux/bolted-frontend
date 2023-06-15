import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'bolted-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  providers: [MessageService]
})
export class LoginPageComponent implements OnInit {
  myForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  isLoading = false;
  
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly authService: AuthenticationService,
    private readonly messageService: MessageService,
  ) { }

  ngOnInit() {}

  onLogin() {
    this.isLoading = true;
    
    const { email, password } = this.myForm.value

    this.authService.login(email, password).subscribe((success) => {
      if (success) {
        this.router.navigateByUrl('/');
      } else {
        this.myForm.reset();
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Las credenciales no son válidas' });
      }
      
      this.isLoading = false;
    });
  }

  isValid(inputName: string) {
    return this.myForm.controls[inputName].errors && this.myForm.controls[inputName].touched;
  }
}
