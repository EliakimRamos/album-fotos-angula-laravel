import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-photo-create',
  templateUrl: './photo-create.component.html',
  styleUrls: ['./photo-create.component.css']
})
export class PhotoCreateComponent implements OnInit {
  name = '';
  album = null;
  file = null;
  photos:any = [];
  constructor( private http:HttpClient, private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
       this.getAlbum(params['album']);
       this.showPhotosAlbum(params['album']);
    })
  }

  getAlbum(albumId){
    this.http.get(`http://eliakimramos.com.br/teste/galeriaapi/api/albums/${albumId}`)
             .subscribe(dados => { this.album = dados;
                         // console.log(this.album);
                        });
  }

    handleFile(file){
      this.file = file;
    }
    upload(){
      const formData = new FormData();
      formData.append('name', this.name);
      formData.append('file_name', this.file);
      this.http.post(`http://eliakimramos.com.br/teste/galeriaapi/api/albums/${this.album.id}/photos`, formData)
                .subscribe(resposta => { alert("Upload de foto feito com sucesso!!!");
                                            this.showPhotosAlbum(this.album.id);
                                        });
    }

    showPhotosAlbum(albumId){
      this.http.get<any>(`http://eliakimramos.com.br/teste/galeriaapi/api/albums/${albumId}/photos`)
             .subscribe(dados =>{ this.photos = dados.data;
              console.log(this.photos);
             });
    }

    delete(albumId,photoId){
      const confirmacao = confirm("Deseja realmente deletar esse Registro ?");
      if(confirmacao){
          const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }), 
            body: { 
              "album_id" : albumId,
              "id" : photoId
            }
          };
          this.http.delete(`http://eliakimramos.com.br/teste/galeriaapi/api/albums/${albumId}/photos/${photoId}`,httpOptions)
                          .subscribe(dados =>{alert("Dados Excluidos com sucesso");
                                              this.showPhotosAlbum(albumId);
                                            });
      }
    }
}
