class QuizRoundsController < ApplicationController
  before_action :set_quiz_round, only: [:show, :destroy]
  load_and_authorize_resource

  def show
    
  end

  def index
    @quiz_rounds = current_or_guest_user.quiz_rounds.sort_by(&:created_at).reverse!
  end

  def destroy
    @quiz_round.destroy
    respond_to do |format|
      format.html { redirect_to quiz_rounds_url, notice: 'Quiz Round was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private

  def set_quiz_round
    @quiz_round = QuizRound.find(params[:id])
  end
end
