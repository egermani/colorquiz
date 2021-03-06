class RoundsController < ApplicationController
  before_action :set_round, only: [:show, :destroy]
  load_and_authorize_resource
  skip_before_filter :verify_authenticity_token, :only => [:create] 

  def index
    @rounds = current_or_guest_user.rounds.sort_by(&:created_at).reverse!
  end

  def create
    @round = Round.new(round_params)
    @round.user = User.find(current_or_guest_user.id)
    set_next_question if @round.guesses.first.quiz_round_id
    respond_to do |format|
      if @round.save
        format.html { redirect_to @round, notice: 'Spot was successfully created.' }
        format.json { render :show, status: :created, location: @round }
        format.js { }
      else
        format.html { render :new }
        format.json { render json: @round.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @round.destroy
    respond_to do |format|
      format.html { redirect_to rounds_url, notice: 'Round was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private

  def set_round
    @round = Round.find(params[:id])
  end

  def round_params
    parameters = params.require(:round).permit(:image_id, :guesses_attributes => [:color, :spot_id, :format, :quiz_round_id])
    if current_or_guest_user
      parameters["guesses_attributes"].each { |key, value| value.merge!({"guesser_id" => current_or_guest_user.id})}
    end
    return parameters
  end
end
