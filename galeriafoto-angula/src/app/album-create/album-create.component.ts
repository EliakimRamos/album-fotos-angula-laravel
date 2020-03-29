import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-album-create',
  templateUrl: './album-create.component.html',
  styleUrls: ['./album-create.component.css']
})
export class AlbumCreateComponent implements OnInit {
  name = "";
  constructor(private http:HttpClient, private router:Router) { }

  ngOnInit() {
  }

  create(){
    this.http.post("http://eliakimramos.com.br/teste/galeriaapi/api/albums",{"name": this.name})
             .subscribe(retorno => this.router.navigate(['albums'])
            );
  }

}
