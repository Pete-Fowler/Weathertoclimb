Rails.application.routes.draw do
  resources :favorites
  resources :locations
  resources :users
  
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
end
