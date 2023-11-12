import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeroeModel } from '../models/heroe.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://crud-4cf36-default-rtdb.firebaseio.com';

  constructor( private http: HttpClient ) { }

  crearHeroe ( heroe: HeroeModel){

    return this.http.post(`${ this.url }/heroes.json`, heroe)
    .pipe(
      map((resp:any) => {
        heroe.id= resp.name;
        return heroe;
      })
    );
  }

  actualizarHeroe( heroe: HeroeModel){

   const heroeTemp = {
    id: heroe.id,
    nombre: heroe.nombre,
    poder: heroe.poder,
    vivo: heroe.vivo
   };


    return this.http.put(`${ this.url}/heroes/${heroe.id}.json`, heroeTemp);

  }

  borrarHeroe( id: string){
    return this.http.delete(`${ this.url }/heroes/${ id }.json`);

  }

  getHeroe( id:string|null){
    return this.http.get(`${ this.url }/heroes/${ id }.json`);
  }

  getHeroes(){
    return this.http.get(`${ this.url }/heroes.json`)
    .pipe(
      map( this.crearArreglo)
    );

  }

  private crearArreglo(heroesObj: { [key: string]: HeroeModel } | any): HeroeModel[] {

    const heroes: HeroeModel[]= [];

    if (heroesObj === null ){return [];}

    Object.keys (heroesObj).forEach( key =>{
      const heroe: HeroeModel = heroesObj[key];
      heroe.id = key;

      heroes.push(heroe);
    })


    return heroes;
}


}
