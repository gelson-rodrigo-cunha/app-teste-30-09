import {Injectable, NgZone} from '@angular/core';
import {BackgroundGeolocation, BackgroundGeolocationConfig} from '@ionic-native/background-geolocation';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import 'rxjs/add/operator/map';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/filter';

let apiUrl = 'http://localhost:8000/api/localizations/';
@Injectable()
export class LocationTrackerProvider {

  public watch: any;
  public lat: number = 0;
  public lng: number = 0;
  dadosLocalizacao: any = '';
  jsonString:any = '';
  positionData = {"latitude":"22.5522", "longitude":"-58.8899",
  "idUser":"1"
  };
  
  constructor(
    public zone: NgZone,
    public backgroundGeolocation: BackgroundGeolocation,
    public geolocation: Geolocation,
	public http: Http
  ) {
//setInterval(this.startTracking(),1000);
  }

  public startTracking() {

    let config : BackgroundGeolocationConfig = {
      desiredAccuracy: 0,
      stationaryRadius: 20,
      distanceFilter: 10,
      debug: true,
      interval: 2000
    };

    this.backgroundGeolocation.configure(config).subscribe((location) => {

      console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);

      // Update inside of Angular's zone
      this.zone.run(() => {
        this.lat = location.latitude;
        this.lng = location.longitude;
	
      });
    }, (err) => {
      console.log(err);
      });

    this.backgroundGeolocation.start();

    // Background tracking
    let options = {
      frequency: 3000,
      enableHighAccuracy: true
    };

    this.watch = this.geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {
      console.log(position);

      this.zone.run(() => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });

	  
	/* this.authService.getCredentials()
                        .then(response => {
							*/
                          //  this.restService.sendLocation(response, coords)
                            //    .then(response => {
                                    //console.log(response);
                             //   });
                     //   });
	  
	  
	  //this.enviaLocal(position.coords);
	   const data = JSON.parse(localStorage.getItem('userData'));
 // console.log(data);
  	let header = new Headers();
   this.dadosLocalizacao = "latidude:"+this.lat+",longitude:"+this.lng+",idUser:"+1;
   this.jsonString = JSON.stringify(this.dadosLocalizacao);
   console.log(this.dadosLocalizacao);
    console.log(this.positionData);
	console.log(this.jsonString);
	console.log('latitude: '+this.lat);
    header.append('Accept', 'application/json');
    header.append('Authorization', 'Bearer ' + data);
	  return new Promise((resolve, reject) =>{
      //let headers = new Headers();
      this.http.post(apiUrl,this.jsonString, {headers: header}).
      subscribe(result =>{
        resolve(result.json());
      }, (err) =>{
        reject(err);
      });

    });
	  
    });
  }
 /*enviarPosicion(){
  //console.log('holaa');
  //console.log(this.local.get('token')._result);
  if (typeof this.latitude != 'undefined' && typeof this.longitude != 'undefined')
  {
    //console.log('adios');
    //console.log(this.local);
    var token=this.token;
    var id_usuario=this.id_usuario;
    console.log(id_usuario);
    console.log(token);
    var headers= new Headers();
    //console.log('latitud: '+this.latitude);
    datos="longitud_ciclista="+this.longitude+"&latitud_ciclista="+this.latitude+"&id_ciclista="+id_usuario;
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Token '+token);
    this.http.post('http://p02diada.pythonanywhere.com/usuarios/setPosicionCiclista/',datos,{
      headers:headers
    }).subscribe(success =>{
      console.log(success);
    }

  } 
  
  
  
  
  
/*enviaLocal(position){
     console.log(position.latitude);
    return new Promise((resolve, reject) =>{
      let headers = new Headers();
      this.http.post(apiUrl, this.positionData, {headers: headers}).
      subscribe(result =>{
        resolve(result.json());
      }, (err) =>{
        reject(err);
      });

    });

  //}*/
  public stopTracking() {
    console.log('stopTracking');

    this.backgroundGeolocation.finish();
    this.watch.unsubscribe();
  }
}
