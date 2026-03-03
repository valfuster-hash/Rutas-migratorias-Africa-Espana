// ---------- STORYMAP FULLSCREEN with SNAKE + FLECHAS + PUNTOS + BOTONERA + NEW BASEMAP ----------
(function(){

  // ---------- MAP BASELAYERS: Terreno político + relieve (Stamen Terrain vía Stadia) ----------
  const map = L.map('map', { center:[27,-15], zoom:4, zoomControl:true });

  // Basemap principal (político + relieve + fronteras)
  const terrain = L.tileLayer(
    'https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}.jpg',
    {
      maxZoom: 17,
      attribution: 'Map tiles © Stamen · Data © OpenStreetMap contributors'
    }
  ).addTo(map);

  // Basemap oscuro
  const dark = L.tileLayer(
    'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    { attribution: '© OpenStreetMap · © CARTO' }
  );

  // Control de capas
  L.control.layers(
    { 'Terreno + fronteras': terrain, 'Oscuro': dark },
    null,
    { position:'topleft' }
  ).addTo(map);


  // ---------- BASE ROUTES with ANIMATED OPACITY ----------
  let baseOpacity = 0.35;

  const colorByRisk = val => {
    if (!val) return '#9ca3af';
    const v = String(val).toLowerCase();
    if (v.includes('extrema')) return '#8b0000';
    if (v.includes('muy alta')) return '#e34a33';
