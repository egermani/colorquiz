class GuessesController < ApplicationController
  load_and_authorize_resource
  skip_before_filter :verify_authenticity_token, :only => [:create] 
  
  def index
    # @guesses = Guess.all.sort_by {|guess| guess.spot.lab[0]}
    @guesses = Guess.all.sort_by {|guess| guess.delta}
  end

  def stats
    # Rails.logger.info(request.env)
    if params[:type] == "value"
      @guesses = current_or_guest_user.guesses.value.order(created_at: :asc).as_json(:only => [:created_at, :delta], methods: :l_delta)
      @guesses.each {|node| node["delta"] = node.delete "l_delta"}
    else
      @guesses = current_or_guest_user.guesses.color.order(created_at: :asc).as_json(:only => [:created_at, :delta])
    end
    respond_to do |format|
      format.html {  }
      format.json { render :json => @guesses  } 
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
    @guess = Guess.new(guess_params)
    # @guess.guesser = User.find(current_user.id) if current_user
    @guess.guesser = current_or_guest_user
    if guess_params[:quiz_round_id]
      set_next_question
    end
    respond_to do |format|
      if @guess.save
        session[:last_q] = session[:last_q].to_i + 1
        format.html { redirect_to play_quiz_path(session[:quiz_id])}
        format.json { render :show, status: :created, location: @guess }
        format.js { }
      else
        format.html { render :new }
        format.json { render json: @guess.errors, status: :unprocessable_entity }
      end
    end
  end

  private

    def guess_params
      params.require(:guess).permit(:color, :spot_id, :format, :quiz_round_id)
    end
end
