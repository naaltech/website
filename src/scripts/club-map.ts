import * as L from "leaflet"
import "leaflet/dist/leaflet.css"

interface Club {
  id: string
  name: string
  latitude: number
  longitude: number
  status: string
}

const container = document.getElementById("club-map")

if (container) {
  const clubs: Club[] = JSON.parse(container.dataset.clubs ?? "[]")

  const map = L.map(container).setView([39.9334, 32.8597], 2) // Dünya görünümü

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(map)

  // Özel Hack Club ikonu tanımla
  const hackClubIcon = L.icon({
    iconUrl: "https://assets.hackclub.com/icon-rounded.png",
    iconRetinaUrl: "https://assets.hackclub.com/icon-rounded.png",
    iconSize: [25, 25],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  })

  // Kulüp markerları ekle
  clubs.forEach((club) => {
    const popup = document.createElement("div")
    popup.className = "p-3 min-w-[200px]"

    const name = document.createElement("h3")
    name.className = "font-bold text-lg text-gray-900 mb-2"
    name.textContent = club.name

    const status = document.createElement("p")
    status.className = "text-xs text-green-600 font-semibold mt-2"
    status.textContent = club.status

    popup.append(name, status)
    L.marker([club.latitude, club.longitude], { icon: hackClubIcon }).addTo(map).bindPopup(popup)
  })
}
