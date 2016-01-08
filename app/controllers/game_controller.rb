class GameController < ApplicationController

  def splash
    @user = User.new
    render :layout => false
  end
end
