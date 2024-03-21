function calcularCentroide(poligono) {
    let totalX = 0;
    let totalY = 0;

    for (let i = 0; i < poligono.length; i++) {
        const puntoActual = poligono[i];
        const puntoSiguiente = poligono[(i + 1) % poligono.length];

        const factor = (puntoActual.lat * puntoSiguiente.lng - puntoSiguiente.lat * puntoActual.lng);
        totalX += (puntoActual.lat + puntoSiguiente.lat) * factor;
        totalY += (puntoActual.lng + puntoSiguiente.lng) * factor;
    }

    const area = calcularArea(poligono);
    const centroX = totalX / (6 * area);
    const centroY = totalY / (6 * area);

    return { lat: centroX, lng: centroY };
}

function calcularArea(poligono) {
    let area = 0;

    for (let i = 0; i < poligono.length; i++) {
        const puntoActual = poligono[i];
        const puntoSiguiente = poligono[(i + 1) % poligono.length];
        area += (puntoSiguiente.lat - puntoActual.lat) * (puntoSiguiente.lng + puntoActual.lng);
    }

    return Math.abs(area / 2);
}