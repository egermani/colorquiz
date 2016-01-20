class GameController < ApplicationController

  def splash
    @user = User.new
    # render :layout => false
    redirect_to play_quiz_path(Quiz.find_by(name: "The Beta Quiz"))
  end
end
