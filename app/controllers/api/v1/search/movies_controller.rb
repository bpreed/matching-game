class Api::V1::Search::MoviesController < ApplicationController
  require 'open-uri'
  protect_from_forgery unless: -> { request.format.json? }

  def create
    movie = params["movie"]

    binding.pry

    omdb_url = "http://www.omdbapi.com/?apikey=#{ENV["OMDB_API"]}&t=#{movie.gsub(' ', '+')}"
    binding.pry
    movie_data = JSON.parse(open(omdb_url).read)

    binding.pry

    actors = movie_data["Actors"]
    # Returns found events and results of user check
    render json: { movie: movie, actors: actors }
  end
end
