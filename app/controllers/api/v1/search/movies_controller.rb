class Api::V1::Search::MoviesController < ApplicationController
  require 'open-uri'
  require 'wikipedia'

  protect_from_forgery unless: -> { request.format.json? }

  def create
    movie = params["movie"]

    omdb_url = "http://www.omdbapi.com/?apikey=#{ENV["OMDB_API"]}&t=#{movie.gsub(' ', '+')}"

    movie_data = JSON.parse(open(omdb_url).read)

    actors = movie_data["Actors"].split(",")
    actor_photos = []
    actors.each do |actor|
      actor_wiki_page = Wikipedia.find(actor)
      actor_wiki_page.main_image_url
      actor_photos << actor_wiki_page.main_image_url
    end

    actor_photos.each_with_index do |photo, index|
      if photo == nil
        actors.delete_at(index)
        actor_photos.delete_at(index)
      end
    end
    # Returns found events and results of user check
    render json: { movie: movie, actors: actors, actor_photos: actor_photos }
  end
end
