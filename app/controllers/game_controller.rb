class GameController < ApplicationController

  def splash
    @user = User.new
    # redirect_to quiz_path(Quiz.find_by(name: "The Beta Quiz"))
    render :thanks, locals: {quiz_round = QuizRound.find()}
  end
end
