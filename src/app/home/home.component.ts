import {Component, Input} from '@angular/core';
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isAdmin: boolean = false;

  title: string = environment.appName;
  logo: string = environment.appLogo;
  owner: string = environment.appOwner;

  // images
  imageSalesLeft: string = 'assets/left-card.png';
  imageSalesMiddle: string = 'assets/middle-card.png';
  imageSalesRight: string = 'assets/right-card.png';
  imageBackgroundHome: string = '../../assets/background-home.jpg';

  // menu items
  // items: Array<any> = [
  //   {
  //     title: 'Home',
  //     route: '/home',
  //   },
  //   {
  //     title: 'Admin',
  //     route: '/dashboard',
  //   },
  //   {
  //     title: 'Logout',
  //     route: '/auth',
  //   },
  // ];

  constructor(private router: Router, private userService: UserService) {
    const user = this.userService.getUser();

    if (user.userRole === 'ADMIN') {
      this.isAdmin = true;
    }
  }

  // onChangePage(page: any) {
  //   this.router.navigateByUrl(page.route);
  // }

  onLogout(): void {
    this.router.navigateByUrl('/auth')
  }


  onAdmin(): void {
    this.router.navigateByUrl('/dashboard')
  }
}
