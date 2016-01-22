class QuizzesController < ApplicationController
  before_action :set_quiz, :only => [:show, :play]

  def show
    
  end

  def index
    
  end

  def play
    # No currently active quizround OR doesn't match quiz_id
    unless session[:quiz_id] == @quiz.id && session[:quiz_round_id]
      session[:quiz_id] = @quiz.id
      session[:current_question] = -1
      @quiz_round = QuizRound.create(user: current_or_guest_user, quiz: @quiz)
      session[:quiz_round_id] = @quiz_round.id
    end

    @question = Quiz.find(current_quiz).next_question(session[:current_question])
    session[:current_question] = @question.id

    unless @question
      session[:quiz_id] = nil
      session[:current_question] = nil
      session[:quiz_round_id] = nil
      render :thanks
    end

    if @question.questionable_type == "Image"
      @image = @question.questionable
      @round = Round.new()
      @image.spots.count.times { @round.guesses.build }
      @guesses = @round.guesses
      render 'images/play', locals: {next_link: true}
    end
  end

  private
    def set_quiz
      @quiz = Quiz.find(params[:id])
      session[:quiz_id] = params[:id]
    end
end