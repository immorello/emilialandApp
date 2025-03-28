import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FrontendService } from '../frontend.service';
import { Title } from '@angular/platform-browser';
import { MapAdvancedMarker } from '@angular/google-maps';
import { Capacitor } from '@capacitor/core';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
  standalone: false,
})
export class MapPage implements OnInit {
  @ViewChild('map', { static: true }) mapDiv!: ElementRef<HTMLDivElement>;
  private _locations: any[] = [
    {
      lat: 44.695476,
      lng: 10.621845,
      title: 'Prova 1',
      category: 'punto_amico',
      article_category: 'recipies',
      incipit: 'Lorem ipsum studiorum stocazzo',
      uuid: 'b9be0f45-8f1c-472d-a7a6-956cc58b875d',
      imageUrl:
        'https://scoprire-images-bucket-emi.s3.eu-central-1.amazonaws.com/Foto 1.jpg',
    },
    {
      lat: 44.69132,
      lng: 10.630939,
      title: 'Prova 1',
      category: 'punto_interesse',
      article_category: 'reggiani-illustri',
      incipit: 'Lorem ipsum studiorum stocazzo',
      uuid: '0A21A50D2C-190F-A2C6-7F02-14F08AF8AAD3',
      imageUrl:
        'https://scoprire-images-bucket-emi.s3.eu-central-1.amazonaws.com/Foto 2.jpg',
    },
    {
      lat: 44.705172,
      lng: 10.629351,
      title: 'Prova 1',
      category: 'punto_VR',
      article_category: 'storie-reggiane',
      incipit: 'Lorem ipsum studiorum stocazzo',
      uuid: '815d33dc-97b2-462a-90d8-dbf5f2716cd2',
      imageUrl:
        'https://scoprire-images-bucket-emi.s3.eu-central-1.amazonaws.com/Foto 3.jpg',
    },
  ];
  private _initPosition = { lat: 44.679045, lng: 10.613033 };
  private _mapLoaded: boolean;
  private _markersArray: any [];
  map: any;

  constructor(private frontend: FrontendService) {
    this._mapLoaded = true;
    this._markersArray = []
  }
  get mapLoaded(): boolean {
    return this._mapLoaded;
  }

  get locations(): any[] {
    return this._locations;
  }

  async ngOnInit(): Promise<void> {
    this.initMap();
  }

  async initMap(): Promise<void> {
    console.log('partito');
    this.locateUser();
    const { Map } = (await google.maps.importLibrary(
      'maps'
    )) as google.maps.MapsLibrary;

    const mapElement = this.mapDiv.nativeElement;
    this.map = new Map(mapElement, {
      center: this._initPosition,
      zoom: 12,
      mapId: 'dbd064246cd6634d',
    });

    this.addMarkers();
    
  }
  private locateUser(){
    if(!Capacitor.isPluginAvailable('Geolocation')){
      console.log("GEO NOT READY");
      return;
    }
    Geolocation.getCurrentPosition().then(
      (data)=>{
        let position = data.coords;
        let lat = position.latitude;
        let lon = position.longitude;
        this._initPosition.lat = lat;
        this._initPosition.lng = lon;
      }
    );
    
  }
  async addMarkers() {
    const { AdvancedMarkerElement } = (await google.maps.importLibrary(
      'marker'
    )) as google.maps.MarkerLibrary;
    const { PinElement } = (await google.maps.importLibrary(
      'marker'
    )) as google.maps.MarkerLibrary;
    const { InfoWindow } = (await google.maps.importLibrary(
      'maps'
    )) as google.maps.MapsLibrary;


    const myPositionImg = document.createElement('img');
    myPositionImg.src = 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
    const myPositionmarker = new AdvancedMarkerElement({
      position: this._initPosition,
      map: this.map,
      content: myPositionImg,
    })

    for (let location of this._locations) {
      let iconContent: HTMLElement;

      if (location.category == 'punto_amico') {
        const friendIcon = document.createElement('ion-icon');
        friendIcon.setAttribute('name', 'heart-outline');
        friendIcon.style.fontSize = '32px';
        iconContent = friendIcon;

        const glyphSvgPinElement = new PinElement({
          glyph: friendIcon,
          glyphColor: 'white',
          background: '#02C4BA',
          borderColor: 'black',
        });

        const marker = new AdvancedMarkerElement({
          position: { lat: location.lat, lng: location.lng },
          map: this.map,
          title: location.title,
          content: glyphSvgPinElement.element,
          gmpClickable: true,
        });
        let indicationLink = "https://www.google.com/maps/dir/?api=1&origin="+this._initPosition.lat+","+this._initPosition.lng+"&destination="+location.lat+","+location.lng+"&travelmode=driving"
        console.log(indicationLink);
        const contentString =
          '<ion-grid>' +
          '<ion-row class="ion-align-items-center">' +
          '<ion-col>' +
          '<ion-avatar><img alt="Silhouette of mountains" src="' +
          location.imageUrl +
          '" /></ion-avatar>' +
          '</ion-col><ion-col><h2>' +
          location.title +
          '</h2></ion-col></ion-row></ion-col><ion-row><ion-col><h3>' +
          location.incipit +
          '</h3></ion-row></ion-row></ion-col><ion-row><ion-col><h3>CATEGORIA: ' +
          location.category +
          '</h3></ion-row></ion-col><ion-row><ion-col><ion-button color="primary" style="width:20vw;"><a href="' +
          location.article_category +
          '/' +
          location.uuid +
          '"><h4 style="color:white;font-size:3vw;">' +
          location.title +
          '</h4></a></ion-button><ion-col><ion-button  style="width:20vw;"><a href='+indicationLink+'><h4 style="color:white;font-size:2vw;">Indicazioni stradali</h4></a></ion-button></ion-col></ion-row></ion-col><ion-row></ion-grid>';

        const infowindow = new google.maps.InfoWindow({
          content: contentString,
        });

        marker.addListener('gmp-click', () => {
          infowindow.open({
            anchor: marker,
          });
        });
        this._markersArray.push(marker);
      } else if (location.category == 'punto_interesse') {
        const friendIcon = document.createElement('ion-icon');
        friendIcon.setAttribute('name', 'star-outline');
        friendIcon.style.fontSize = '32px';
        iconContent = friendIcon;

        const glyphSvgPinElement = new PinElement({
          glyph: friendIcon,
          glyphColor: 'white',
          background: '#FF7F00',
          borderColor: 'black',
        });

        const marker = new AdvancedMarkerElement({
          position: { lat: location.lat, lng: location.lng },
          map: this.map,
          title: location.title,
          content: glyphSvgPinElement.element,
          gmpClickable: true,
        });

        let indicationLink = "https://www.google.com/maps/dir/?api=1&origin="+this._initPosition.lat+","+this._initPosition.lng+"&destination="+location.lat+","+location.lng+"&travelmode=driving"
        console.log(indicationLink);
        const contentString =
          '<ion-grid>' +
          '<ion-row class="ion-align-items-center">' +
          '<ion-col>' +
          '<ion-avatar><img alt="Silhouette of mountains" src="' +
          location.imageUrl +
          '" /></ion-avatar>' +
          '</ion-col><ion-col><h2>' +
          location.title +
          '</h2></ion-col></ion-row></ion-col><ion-row><ion-col><h3>' +
          location.incipit +
          '</h3></ion-row></ion-row></ion-col><ion-row><ion-col><h3>CATEGORIA: ' +
          location.category +
          '</h3></ion-row></ion-col><ion-row><ion-col><ion-button color="primary" style="width:20vw;"><a href="' +
          location.article_category +
          '/' +
          location.uuid +
          '"><h4 style="color:white;font-size:3vw;">' +
          location.title +
          '</h4></a></ion-button><ion-col><ion-button  style="width:20vw;"><a href='+indicationLink+'><h4 style="color:white;font-size:2vw;">Indicazioni stradali</h4></a></ion-button></ion-col></ion-row></ion-col><ion-row></ion-grid>';


        const infowindow = new google.maps.InfoWindow({
          content: contentString,
        });

        marker.addListener('gmp-click', () => {
          infowindow.open({
            anchor: marker,
          });
        });
        this._markersArray.push(marker);
      } else if (location.category == 'punto_VR') {
        const friendIcon = document.createElement('ion-icon');
        friendIcon.setAttribute('name', 'eye-outline');
        friendIcon.style.fontSize = '32px';
        iconContent = friendIcon;

        const glyphSvgPinElement = new PinElement({
          glyph: friendIcon,
          glyphColor: 'white',
          background: '#002D5E',
          borderColor: 'white',
        });

        const marker = new AdvancedMarkerElement({
          position: { lat: location.lat, lng: location.lng },
          map: this.map,
          title: location.title,
          content: glyphSvgPinElement.element,
          gmpClickable: true,
        });

        let indicationLink = "https://www.google.com/maps/dir/?api=1&origin="+this._initPosition.lat+","+this._initPosition.lng+"&destination="+location.lat+","+location.lng+"&travelmode=driving"
        console.log(indicationLink);
        const contentString =
          '<ion-grid>' +
          '<ion-row class="ion-align-items-center">' +
          '<ion-col>' +
          '<ion-avatar><img alt="Silhouette of mountains" src="' +
          location.imageUrl +
          '" /></ion-avatar>' +
          '</ion-col><ion-col><h2>' +
          location.title +
          '</h2></ion-col></ion-row></ion-col><ion-row><ion-col><h3>' +
          location.incipit +
          '</h3></ion-row></ion-row></ion-col><ion-row><ion-col><h3>CATEGORIA: ' +
          location.category +
          '</h3></ion-row></ion-col><ion-row><ion-col><ion-button color="primary" style="width:20vw;"><a href="' +
          location.article_category +
          '/' +
          location.uuid +
          '"><h4 style="color:white;font-size:3vw;">' +
          location.title +
          '</h4></a></ion-button><ion-col><ion-button  style="width:20vw;"><a href='+indicationLink+'><h4 style="color:white;font-size:2vw;">Indicazioni stradali</h4></a></ion-button></ion-col></ion-row></ion-col><ion-row></ion-grid>';


        const infowindow = new google.maps.InfoWindow({
          content: contentString,
        });

        marker.addListener('gmp-click', () => {
          infowindow.open({
            anchor: marker,
          });
        });
        this._markersArray.push(marker);
        
      }
      
    }

    
  }

  onScroll(event: CustomEvent) {
    this.frontend.setMessage(event);
    return;
  }

  handleFilter(event: CustomEvent) {
    let category = event.detail.value;
    console.log('EVENT=', category);
    
    for (let marker of this._markersArray){
      let marker_content = marker.content as HTMLElement;
      let icon = marker_content.querySelector('ion-icon')?.name;
      switch (category) {
        case 'punto_amico':
          if (icon != 'heart-outline'){
            marker.setMap(null);
          }else{
            marker.setMap(this.map)
          }
          break;
        case 'punto_interesse':
          if (icon != 'star-outline'){
            marker.setMap(null);
          }else{
            marker.setMap(this.map)
          }
          break;
        case 'storie-reggiane':
          if (icon != 'eye-outline'){
            marker.setMap(null);
          }else{
            marker.setMap(this.map)
          }
          break;
        default:
          continue
      }
    }
    
  }
}
