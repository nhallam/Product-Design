export const revalidate = 1800 // 30 minutes

const BROOKLYN = { lat: 40.6782, lon: -74.006 }

const WMO: Record<number, { label: string; emoji: string }> = {
  0:  { label: 'Sunny',          emoji: '☀️' },
  1:  { label: 'Mainly Clear',   emoji: '🌤' },
  2:  { label: 'Partly Cloudy',  emoji: '⛅' },
  3:  { label: 'Overcast',       emoji: '☁️' },
  45: { label: 'Foggy',          emoji: '🌫' },
  48: { label: 'Foggy',          emoji: '🌫' },
  51: { label: 'Drizzle',        emoji: '🌦' },
  53: { label: 'Drizzle',        emoji: '🌦' },
  55: { label: 'Drizzle',        emoji: '🌦' },
  61: { label: 'Rainy',          emoji: '🌧' },
  63: { label: 'Rainy',          emoji: '🌧' },
  65: { label: 'Heavy Rain',     emoji: '🌧' },
  71: { label: 'Snowing',        emoji: '❄️' },
  73: { label: 'Snowing',        emoji: '❄️' },
  75: { label: 'Heavy Snow',     emoji: '❄️' },
  77: { label: 'Snow Grains',    emoji: '❄️' },
  80: { label: 'Showers',        emoji: '🌦' },
  81: { label: 'Showers',        emoji: '🌦' },
  82: { label: 'Heavy Showers',  emoji: '🌦' },
  85: { label: 'Snow Showers',   emoji: '🌨' },
  86: { label: 'Snow Showers',   emoji: '🌨' },
  95: { label: 'Thunderstorm',   emoji: '⛈' },
  96: { label: 'Thunderstorm',   emoji: '⛈' },
  99: { label: 'Thunderstorm',   emoji: '⛈' },
}

export interface WeatherData {
  tempC: number
  tempF: number
  label: string
  emoji: string
}

export async function GET() {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${BROOKLYN.lat}&longitude=${BROOKLYN.lon}&current=temperature_2m,weather_code&timezone=America%2FNew_York`
    const res = await fetch(url, { next: { revalidate: 1800 } })
    const json = await res.json()

    const tempC = Math.round(json.current.temperature_2m)
    const tempF = Math.round(tempC * 9 / 5 + 32)
    const code: number = json.current.weather_code
    const { label, emoji } = WMO[code] ?? { label: 'Clear', emoji: '🌤' }

    return Response.json({ tempC, tempF, label, emoji } satisfies WeatherData)
  } catch {
    return Response.json({ status: 'unknown' })
  }
}
