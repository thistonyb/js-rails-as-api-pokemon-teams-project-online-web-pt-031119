class PokemonsController < ApplicationController
    def index
        pokemons = Pokemon.all
        render json: pokemons, except: [:created_at, :updated_at]
    end

    def destroy
        pokemon = Pokemon.find_by(id: params[:id])
        pokemon.delete
        render json: pokemon, except: [:created_at, :updated_at]
    end

    def create
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        pokemon = Pokemon.create(nickname: name, species: species, trainer_id: params[:trainer_id])
        render json: pokemon, except: [:created_at, :updated_at]
    end
end
