coordenadas=""
window.addEventListener('load', function() {
  // Verificar si la geolocalización está disponible en el navegador
  if (!navigator.geolocation) {
    console.error("La geolocalización no es soportada por tu navegador");
    return;
  }

  const options = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0,
  };

  function success(pos) {
    const crd = pos.coords;
    coordenadas={
      longitude:crd.latitude,
      latitude:crd.longitude
    }
    console.log("Tu posición actual es:");
    console.log(`Latitud: ${crd.latitude}`);
    console.log(`Longitud: ${crd.longitude}`);
    console.log(`Con una precisión de aproximadamente ${crd.accuracy} metros.`);
  }

  function error(err) {
    console.error(`ERROR(${err.code}): ${err.message}`);
  }

  // Solicitar la posición actual
  navigator.geolocation.getCurrentPosition(success, error, options);
});
