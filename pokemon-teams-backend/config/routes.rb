Rails.application.routes.draw do
  get '/pokemons' => 'pokemons#index'
  get '/pokemons/:id' => 'pokemons#show'
  delete '/pokemons/:id' => 'pokemons#destroy'
  post '/pokemons' => 'pokemons#create'
  
  resources :trainers
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
