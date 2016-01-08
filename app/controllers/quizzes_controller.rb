class QuizzesController < ApplicationController
  before_action :set_quiz, :only => [:show, :play]

  def show
    
  end

  def index
    
  end

  def play
    @guess = Guess.new
    last_q = session.fetch(:last_q) { |id| session[:last_q] = Quiz.find(params[:id]).questions.pluck(:id).min - 1 }
    @spot = Question.next(last_q).first.try(:spot)
    unless @spot
      session[:last_q] = -1
      render :thanks
    end
  end

  def debug
    session[:last_q] = Quiz.find(params[:id]).questions.pluck(:id).max - 1
    redirect_to play_quiz_path(params[:id])
  end

  private
    def set_quiz
      @quiz = Quiz.find(params[:id])
      session[:quiz_id] = params[:id]
    end
end