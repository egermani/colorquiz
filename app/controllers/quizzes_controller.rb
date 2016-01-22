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

    if @question.questionable_type == "Image"
      @image = @question.questionable
      @round = Round.new()
      @image.spots.count.times { @round.guesses.build }
      @guesses = @round.guesses
      @next_link = true
      render 'images/play', layout: true
    end
  end

  private
    def set_quiz
      @quiz = Quiz.find(params[:id])
      session[:quiz_id] = params[:id]
    end
end