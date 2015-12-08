class RoundsController < ApplicationController
  before_action :set_round, only: [:show, :destroy]

  def index
    @rounds = Round.all
  end

  def create
    p params
    @round = Round.new(round_params)

    respond_to do |format|
      if @round.save
        format.html { redirect_to @round, notice: 'Spot was successfully created.' }
        format.json { render :show, status: :created, location: @round }
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
    params.require(:round).permit(:image_id, :guesses_attributes => [:color, :spot_id])
  end
end
