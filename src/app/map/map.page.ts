import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FrontendService } from '../frontend.service';
import { Title } from '@angular/platform-browser';
import { MapAdvancedMarker } from '@angular/google-maps';
import { Capacitor } from '@capacitor/core';
import { Geolocation } from '@capacitor/geolocation';
import { ApiGatewayService } from '../api-gateway.service';
import { Marker } from '../marker.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
  standalone: false,
})
export class MapPage implements OnInit {
  @ViewChild('map', { static: true }) mapDiv!: ElementRef<HTMLDivElement>;
  private _locations: Marker[] = [];
  private _initPosition = { lat: 44.679045, lng: 10.613033 };
  private _mapLoaded: boolean;
  private _markersArray: any [];
  map: any;
  private _categorySelected: string;
  private currentOpenInfoWindow: google.maps.InfoWindow | null = null;

  constructor(private frontend: FrontendService, private apiGw: ApiGatewayService) {
    this.apiGw.getAllMarkers().subscribe(
      (data)=>{
        
       this._locations = data;
       this.addMarkers();
      }
    );
    this._mapLoaded = true;
    this._markersArray = [];
    this._categorySelected = 'all';
  }

  get mapLoaded(): boolean {
    return this._mapLoaded;
  }
  get locations(): any[] {
    return this._locations;
  }
  
  async ngOnInit(): Promise<void> {
    this.initMap();
    this.addTouchHandlers();
  }

  private addTouchHandlers(){
    const mapElement = this.mapDiv.nativeElement;
    mapElement.addEventListener('touchstart', (e: TouchEvent) => {
      // Controlla se il click è sull'InfoWindow o suoi elementi
      const target = e.target as HTMLElement;
      if (target.closest('.gm-ui-hover-effect') || target.closest('.gm-style-iw')) {
        return; // Permetti l'evento di default per l'InfoWindow
      }
      
      if (e.cancelable) {
        e.preventDefault();
      }
    }, { passive: false });

    mapElement.addEventListener('touchmove', (e: TouchEvent) => {
      if (e.cancelable) {
        e.preventDefault();
      }
    }, { passive: false });
  }

  async initMap(): Promise<void> {
    this.locateUser();
    const { Map } = (await google.maps.importLibrary(
      'maps'
    )) as google.maps.MapsLibrary;

    const mapElement = this.mapDiv.nativeElement;
    this.map = new Map(mapElement, {
      center: this._initPosition,
      zoom: 12,
      mapId: 'dbd064246cd6634d',
      gestureHandling: 'greedy',
      scrollwheel: true,
      disableDoubleClickZoom: false,
    });
    
    this.map.addListener('idle', () => {
      this.updateVisibleMarkers();
    });
  }
  
  private updateVisibleMarkers() {
    const bounds = this.map.getBounds();
    
    for (let marker of this._markersArray) {
      const position = marker.position;
      
      if (bounds.contains(position)) {
        // Il marker è dentro i bounds della mappa
        marker.setMap(this.map);
      } else {
        // Il marker è fuori dai bounds della mappa
        marker.setMap(null);
        
      }
    }
    if (this._categorySelected != 'all'){
      this.handleFilter(this._categorySelected);
    }
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
        //console.log(indicationLink);
        const contentString =
          '<ion-grid>' +
          '<ion-row class="ion-align-items-center">' +
          '<ion-col>' +
          '<ion-avatar><img alt="Silhouette of mountains" src="' +
          location.image_url +
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
          location.article_uuid +
          '"><h4 style="color:white;font-size:3vw;">' +
          location.title +
          '</h4></a></ion-button><ion-col><ion-button  style="width:20vw;"><a href='+indicationLink+'><h4 style="color:white;font-size:2vw;">Indicazioni stradali</h4></a></ion-button></ion-col></ion-row></ion-col><ion-row></ion-grid>';

        const infowindow = new google.maps.InfoWindow({
          content: contentString,
        });

        marker.addListener('gmp-click', () => {
          if (this.currentOpenInfoWindow) {
            this.currentOpenInfoWindow.close();
          }
          infowindow.open({
            anchor: marker,
          });
          this.currentOpenInfoWindow = infowindow;
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
        //console.log(indicationLink);
        const contentString =
          '<ion-grid>' +
          '<ion-row class="ion-align-items-center">' +
          '<ion-col>' +
          '<ion-avatar><img alt="Silhouette of mountains" src="' +
          location.image_url +
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
          location.article_uuid +
          '"><h4 style="color:white;font-size:3vw;">' +
          location.title +
          '</h4></a></ion-button><ion-col><ion-button  style="width:20vw;"><a href='+indicationLink+'><h4 style="color:white;font-size:2vw;">Indicazioni stradali</h4></a></ion-button></ion-col></ion-row></ion-col><ion-row></ion-grid>';


        const infowindow = new google.maps.InfoWindow({
          content: contentString,
        });

        marker.addListener('gmp-click', () => {
          if (this.currentOpenInfoWindow) {
            this.currentOpenInfoWindow.close();
          }
          infowindow.open({
            anchor: marker,
          });
          this.currentOpenInfoWindow = infowindow;
        });
        this._markersArray.push(marker);
      } else if (location.category == 'punto_esperienza') {
        //console.log("ESP=",location);
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
        
        const contentString =
          '<ion-grid>' +
          '<ion-row class="ion-align-items-center">' +
          '<ion-col>' +
          '<ion-avatar><img alt="Silhouette of mountains" src="' +
          location.image_url +
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
          location.article_uuid +
          '"><h4 style="color:white;font-size:3vw;">' +
          location.title +
          '</h4></a></ion-button><ion-col><ion-button  style="width:20vw;"><a href='+indicationLink+'><h4 style="color:white;font-size:2vw;">Indicazioni stradali</h4></a></ion-button></ion-col></ion-row></ion-col><ion-row></ion-grid>';


        const infowindow = new google.maps.InfoWindow({
          content: contentString,
        });

        marker.addListener('gmp-click', () => {
          if (this.currentOpenInfoWindow) {
            this.currentOpenInfoWindow.close();
          }
          infowindow.open({
            anchor: marker,
          });
          this.currentOpenInfoWindow = infowindow;
        });
        this._markersArray.push(marker);
        
      }
      
    }

    this.updateVisibleMarkers();
  }

  onScroll(event: CustomEvent) {
    this.frontend.setMessage(event);
    return;
  }

  handleFilter(event: CustomEvent | string) {
    let category = "";
    if (event instanceof CustomEvent){
      category = event.detail.value;
    }else{
      category = this._categorySelected;
    }
    if (this.currentOpenInfoWindow) {
      this.currentOpenInfoWindow.close();
      this.currentOpenInfoWindow = null;
    }

    const bounds = this.map.getBounds();
  
    for (let marker of this._markersArray) {
      let marker_content = marker.content as HTMLElement;
      let icon = marker_content.querySelector('ion-icon')?.name;
      const position = marker.position;
      const isInBounds = bounds.contains(position);
  
      switch (category) {
        case 'all':
          this._categorySelected = 'all';
          marker.setMap(isInBounds ? this.map : null);
          break;
        case 'punto_amico':
          this._categorySelected = 'punto_amico';
          marker.setMap((icon === 'heart-outline' && isInBounds) ? this.map : null);
          break;
        case 'punto_interesse':
          this._categorySelected = 'punto_interesse';
          marker.setMap((icon === 'star-outline' && isInBounds) ? this.map : null);
          break;
        case 'punto_esperienza':
          this._categorySelected = 'punto_esperienza';
          marker.setMap((icon === 'eye-outline' && isInBounds) ? this.map : null);
          break;
        default:
          continue;
      }
    }
  }
}
