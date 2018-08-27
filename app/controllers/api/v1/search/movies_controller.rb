class Api::V1::Search::MoviesController < ApplicationController
  require 'open-uri'
  require 'wikipedia'

  protect_from_forgery unless: -> { request.format.json? }

  def create
    movie = params["movie"]

    tmdb_url = "https://api.themoviedb.org/3/search/movie?api_key=#{ENV["TMDB_API"]}&language=en-US&query=#{movie.gsub(' ', '%20')}&page=1&include_adult=false"

    tmdb_movie_data = JSON.parse(open(tmdb_url).read)

    if tmdb_movie_data["total_results"] >= 1
      movie_id = tmdb_movie_data["results"][0]["id"]
      movie_credits_url = "https://api.themoviedb.org/3/movie/#{movie_id}/credits?api_key=#{ENV["TMDB_API"]}"
      tmdb_cast_data = JSON.parse(open(movie_credits_url).read)

      cast = []
      cast_photos = []
      cast_index = 0
      while cast.length < 5 && (cast_index < tmdb_cast_data["cast"].length)
        actor_wiki_page = Wikipedia.find(tmdb_cast_data["cast"][cast_index]["name"])
        if actor_wiki_page.main_image_url
          cast_photos << actor_wiki_page.main_image_url
          cast << tmdb_cast_data["cast"][cast_index]["name"]
        end
        cast_index += 1
      end
      # Returns found events and results of user check
      render json: { movie: movie, actors: cast, actor_photos: cast_photos }
    else
      render json: { errorMessage: "No matching movie found" }
    end

  end
end
