import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  imagePath(imgName) {
    return '/assets/images/' + imgName;
  }

  login(username, uuid) {
    localStorage.setItem('username', username);
    localStorage.setItem('uuid', uuid);
    setTimeout(function() {
      location.href = '/';
    }, 1000);
  }

  logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('uuid');
    location.href = '/';
  }

  getUsername() {
    return localStorage.getItem('username');
  }

  getUuid() {
    return localStorage.getItem('uuid');
  }
}
