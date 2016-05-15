class GameController < ApplicationController

  def splash
    @user = User.new
    redirect_to quiz_path(Quiz.find_by(name: "The Beta Quiz"))
  end

  def tile
    respond_to do |format|
      format.html { render layout: false }
      format.js { } 
    end
  end
end
