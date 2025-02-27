window.addEventListener('load', function()
 {
    const options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      };
      
      function success(pos) {
        const crd = pos.coords;
        activarMapa([crd.longitude, crd.latitude]);
        console.log("Your current position is:");
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);
      }
      
      function error(err) 
      {
        if(err.code == 1)
        {
          activarMapa([ 37.093144, -5.085277]);
        }
        console.warn(`ERROR (${err.code}): ${err.message}`);
        //confirm("Para continuar, por favor, permita que el navegador acceda a su ubicación.");
      }
      
      navigator.geolocation.getCurrentPosition(success, error, options);
 });
 function activarMapa(cords)
 {
   // Inicializar el mapa de Leaflet, centrado en una ubicación (ej. Madrid)
    var map = L.map('map').setView(cords, 10);

    // Añadir la capa base (por ejemplo, OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(map);

    // Inicializar el cliente SIGPAC
    // Supongamos que el constructor de SigpacClient acepta un objeto de configuración donde
    // se indica la instancia del mapa y, opcionalmente, otros parámetros (por ejemplo, URL de servicios)
    var sigpac = new SigpacClient({ 
        map: map,
        // Otros parámetros de configuración (consulta la documentación)
        // por ejemplo: serviceUrl: 'https://tu-servicio-sigpac/api'
    });

    // Cargar y renderizar las parcelas
    // Es posible que la librería ofrezca un método para cargar las parcelas, por ejemplo:
    sigpac.renderParcels({
      // Puedes pasar parámetros para filtrar o personalizar el renderizado
    });

        
   
 }