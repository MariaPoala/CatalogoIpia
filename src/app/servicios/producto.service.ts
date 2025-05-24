import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Producto {
  'ID': number,
  'IMAGEN': string | null;
  'DESCRIPCIÓN': string;
  'CATEGORIA': string;
  'UNIDAD DE MEDIDA': string;
  'PRECIO': number;
  'CATEGORIAGENERAL': string;
  'CODIGO':string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  // private jsonUrl = 'assets/productos.json';

  // constructor(private http: HttpClient) {}

  // getProductos(): Observable<Producto[]> {
  //   console.log("producto "+ this.http.get<Producto[]>(this.jsonUrl))
  //   return this.http.get<Producto[]>(this.jsonUrl);
  // }
  // private jsonUrl = 'assets/productos.json';
  private jsonUrl = 'assets/productos.json'

  constructor(private http: HttpClient) { }

  getProductos(): Observable<any> {
    const observable = this.http.get(this.jsonUrl);
    observable.subscribe(data => {
    });
    return this.http.get(this.jsonUrl);
  }

}
