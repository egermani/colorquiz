class GuessesController < ApplicationController
  def index
    # @guesses = Guess.all.sort_by {|guess| guess.spot.lab[0]}
    @guesses = Guess.all.sort_by {|guess| guess.delta}
  end

  def stats
    # Rails.logger.info(request.env)
    respond_to do |format|
      format.html {  }
    end
  end

  def data
    respond_to do |format|
      format.json { render :json => Guess.all.order(created_at: :asc), :only => [:created_at, :delta] }
    end
  end
end
