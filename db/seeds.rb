# First fetch endpoint
# https://api.weather.gov/points/39.6542,-105.1881
# 
# Forecast
# https://api.weather.gov/gridpoints/BOU/55,57/forecast
# 
# Hourly
# https://api.weather.gov/gridpoints/BOU/55,57/forecast/hourly

puts 'seeding...'

User.create!(username: "admin", password: ENV['PASSWORD'], password_confirmation: ENV['PASSWORD'], admin: true)

# ===========Locations==============
Location.create!({
  name: "Black Canyon",
  state: "Colorado",
  coordinates: "38.577010,-107.732070",
  forecast_url: "https://api.weather.gov/gridpoints/GJT/121,76/forecast",
  popular: true
})

Location.create!({
  name: "Boulder Canyon",
  state: "Colorado",
  coordinates: "39.990531,-105.422562",
  forecast_url: "https://api.weather.gov/gridpoints/BOU/48,73/forecast",
})

Location.create!({
  name: "Carter Lake",
  state: "Colorado",
  coordinates: "40.320320,-105.213900",
  forecast_url: "https://api.weather.gov/gridpoints/BOU/56,87/forecast",
})

Location.create!({
  name: "Castlewood Canyon",
  state: "Colorado",
  coordinates: "39.354742,-104.766652",
  forecast_url: "https://api.weather.gov/gridpoints/BOU/69,43/forecast"
})

Location.create!({
  name: "Cathedral Spires - South Platte",
  state: "Colorado",
  coordinates: "39.412990,-105.267280",
  forecast_url: "https://api.weather.gov/gridpoints/BOU/51,46/forecast"
})

Location.create!({
  name: "Clear Creek Canyon",
  state: "Colorado",
  coordinates: "39.741328,-105.326352",
  forecast_url: "https://api.weather.gov/gridpoints/BOU/50,61/forecast"
  })

  Location.create!({
    name: "Colorado National Monument",
    state: "Colorado",
    coordinates: "39.101600,-108.734600",
    forecast_url: "https://api.weather.gov/gridpoints/GJT/88,103/forecast"
    })

  
Location.create!({
  name: "Eldorado Springs",
  state: "Colorado",
  coordinates: "39.932075,-105.288556",
  forecast_url: "https://api.weather.gov/gridpoints/BOU/52,70/forecast",
  popular: true
})

Location.create!({
  name: "Escalante Canyon",
  state: "Colorado",
  coordinates: "38.680250,-108.312270",
  forecast_url: "https://api.weather.gov/gridpoints/GJT/101,83/forecast",
  popular: false
})

Location.create!({
  name: "Indian Creek",
  state: "Utah",
  coordinates: "38.025740,-109.539870",
  forecast_url: "https://api.weather.gov/gridpoints/GJT/55,58/forecast",
  popular: true
})

Location.create!({
  name: "Moab",
  state: "Utah",
  coordinates: "38.576093,-109.563435",
  forecast_url: "https://api.weather.gov/gridpoints/GJT/57,83/forecast",
  popular: true
})

Location.create!({
  name: "Morrison",
  state: "Colorado",
  coordinates: "39.654161,-105.188090",
  forecast_url: "https://api.weather.gov/gridpoints/BOU/55,57/forecast"
})

Location.create!({
  name: "North Table Mountain",
  state: "Colorado",
  coordinates: "39.771145,-105.206126",
  forecast_url: "https://api.weather.gov/gridpoints/BOU/55,63/forecast"
})

Location.create!({
  name: "Rocky Mountain National Park",
  state: "Colorado",
  coordinates: "40.305141,-105.664787",
  forecast_url: "https://api.weather.gov/gridpoints/BOU/41,88/forecast"
})

Location.create!({
  name: "Mount Evans",
  state: "Colorado",
  coordinates: "39.632555,-105.621303",
  forecast_url: "https://api.weather.gov/gridpoints/BOU/40,57/forecast"
})

Location.create!({
  name: "Rifle",
  state: "Colorado",
  coordinates: "39.709849,-107.692765",
  forecast_url: "https://api.weather.gov/gridpoints/GJT/127,127/forecast",
  popular: true
})

Location.create!({
  name: "Shelf Road",
  state: "Colorado",
  coordinates: "38.631422,-105.227919",
  forecast_url: "https://api.weather.gov/gridpoints/PUB/74,82/forecast",
  popular: true
})

Location.create!({
  name: "Vedauwoo",
  state: "Wyoming",
  coordinates: "41.155301,-105.374888",
  forecast_url: "https://api.weather.gov/gridpoints/CYS/90,15/forecast",
  popular: true
})


puts 'done seeding!'


