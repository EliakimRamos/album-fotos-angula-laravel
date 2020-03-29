import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css']
})
export class AlbumListComponent implements OnInit {
  albums:any = [];
  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.showListaAlbums();
  }
  showListaAlbums(){
    this.http.get('http://eliakimramos.com.br/teste/galeriaapi/api/albums').subscribe(dados =>this.albums = dados);
  }
  delete(albumId){
    const confirmacao = confirm("Deseja realmente deletar esse Registro ?");
    if(confirmacao){
        const httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }), 
          body: { 
            "id" : albumId
          }
        };
      
        this.http.delete(`http://eliakimramos.com.br/teste/galeriaapi/api/albums/${albumId}`,httpOptions)
                        .subscribe(dados =>{alert("Dados Excluidos com sucesso");
                                            this.showListaAlbums();
                                          });
    }
  }

}
