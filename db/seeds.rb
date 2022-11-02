# First fetch endpoint
# https://api.weather.gov/points/39.6542,-105.1881
# 
# Forecast
# https://api.weather.gov/gridpoints/BOU/55,57/forecast
# 
# Hourly
# https://api.weather.gov/gridpoints/BOU/55,57/forecast/hourly

Location.create!({
  name: "Morrison",
  state: "Colorado",
  coordinates: "39.654161,-105.188090",
  url: "https://api.weather.gov/gridpoints/BOU/55,57/forecast"
})

Location.create!({
  name: "Clear Creek Canyon",
  state: "Colorado",
  coordinates: "39.741328,-105.326352",
  url: "https://api.weather.gov/gridpoints/BOU/50,61/forecast"
})

Location.create!({
  name: "North Table Mountain",
  state: "Colorado",
  coordinates: "39.771145,-105.206126",
  url: "https://api.weather.gov/gridpoints/BOU/55,63/forecast"
})