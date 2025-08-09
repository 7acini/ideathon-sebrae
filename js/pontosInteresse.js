let map;
let servico;
let informacao;

function AbrirMapa(){
   const LocalizacaoPadrao = { lat: -22.7190, lng: -47.6344 }; // Parque Rua do Porto - Piracicaba-SP

     map = new google.maps.Map(document.getElementById("map"), {
        center: parkLocation,
        zoom: 15, // Nível de zoom inicial
    });

    infoWindow = new google.maps.InfoWindow();

    // Cria uma instância do serviço Places
    service = new google.maps.places.PlacesService(map);

    // Exemplo: Buscar restaurantes próximos ao parque
    searchNearbyPlaces(parkLocation, 'restaurant', 'Restaurantes Próximos');

    // Exemplo: Buscar hotéis próximos ao parque
    searchNearbyPlaces(parkLocation, 'lodging', 'Hotéis Próximos');
}

function searchNearbyPlaces(location, type, title) {
    const request = {
        location: location,
        radius: '1500', // Raio de busca em metros (1.5 km)
        type: [type] // Tipo de local a ser pesquisado (ex: 'restaurant', 'lodging')
    };

    service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            // Cria um marcador para o parque
            new google.maps.Marker({
                position: location,
                map: map,
                title: 'Parque X' // Nome do parque
            });

            // Adiciona marcadores para os locais encontrados
            for (let i = 0; i < results.length; i++) {
                createMarker(results[i]);
            }

            // Você pode adicionar um título ou lista dos resultados em algum lugar na sua página
            console.log(`${title}:`, results); 
            alert(`${title} encontrados: ${results.length}`); // Apenas para demonstração
        } else {
            console.error(`Erro ao buscar ${title}:`, status);
        }
    });
}

function createMarker(place) {
    if (!place.geometry || !place.geometry.location) return;

    const marker = new google.maps.Marker({
        map,
        position: place.geometry.location,
    });

    google.maps.event.addListener(marker, "click", () => {
        infoWindow.setContent(`
            <div>
                <strong>${place.name}</strong><br>
                Classificação: ${place.rating || 'N/A'}<br>
                Endereço: ${place.vicinity || 'N/A'}
            </div>
        `);
        infoWindow.open(map, marker);
    });
}