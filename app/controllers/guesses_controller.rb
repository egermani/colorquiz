class GuessesController < ApplicationController
  def index
    # @guesses = Guess.all.sort_by {|guess| guess.spot.lab[0]}
    @guesses = Guess.all.sort_by {|guess| guess.delta}
  end

  def stats
    # Rails.logger.info(request.env)
    respond_to do |format|
      format.html {  }
      format.json { render :json => Guess.all.order(created_at: :asc), :only => [:created_at, :delta] } 
      format.csv do
        headers['Content-Disposition'] = "attachment; filename=\"guesses.csv\""
        headers['Content-Type'] ||= 'text/csv'
      end
    end
  end

  def plm
    # Perceptual learning module
    respond_to do |format|
      format.html { }
      format.js { } 
    end
  end

  def create
    # Perceptual learning module
    @actual = params[:actual]
    respond_to do |format|
      format.js { } 
    end
  end
end
