Rails.application.routes.draw do
  resources :favorites, only: [:create, :destroy]
  resources :locations, only: [:index, :show]
  resources :users, only: [:show, :create]
  
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get '/me', to: 'users#show'
  post '/signup', to: 'users#create'
end
