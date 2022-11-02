# First fetch endpoint
# https://api.weather.gov/points/39.6542,-105.1881
# 
# Forecast
# https://api.weather.gov/gridpoints/BOU/55,57/forecast
# 
# Hourly
# https://api.weather.gov/gridpoints/BOU/55,57/forecast/hourly


Location.create!({
  name: "Boulder Canyon",
  state: "Colorado",
  coordinates: "39.990531,-105.422562",
  forecast_url: "https://api.weather.gov/gridpoints/BOU/48,73/forecast"
})

Location.create!({
  name: "Castlewood Canyon",
  state: "Colorado",
  coordinates: "39.354742,-104.766652",
  forecast_url: "https://api.weather.gov/gridpoints/BOU/69,43/forecast"
})

Location.create!({
  name: "Clear Creek Canyon",
  state: "Colorado",
  coordinates: "39.741328,-105.326352",
  forecast_url: "https://api.weather.gov/gridpoints/BOU/50,61/forecast"
})

Location.create!({
  name: "Eldorado Springs",
  state: "Colorado",
  coordinates: "39.932075,-105.288556",
  forecast_url: "https://api.weather.gov/gridpoints/BOU/52,70/forecast"
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
  name: "Shelf Road",
  state: "Colorado",
  coordinates: "38.631422,-105.227919",
  forecast_url: "https://api.weather.gov/gridpoints/PUB/74,82/forecast"
})



