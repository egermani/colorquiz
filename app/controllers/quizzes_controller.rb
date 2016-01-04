class QuizzesController < ApplicationController
  before_action :set_quiz, :only => [:show]

  def show
    
  end

  def index
    
  end

  def play
    @guess = Guess.new
    last_q = session.fetch(:last_q) { |id| session[:last_q] = Quiz.id.questions.pluck(:id).min - 1 }
    @spot = Question.next(last_q).first.spot
  end

  private
    def set_quiz
      @quiz = Quiz.find(params[:id])
      session[:quiz_id] = params[:id]
    end
end