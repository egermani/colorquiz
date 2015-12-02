class ImageController < ApplicationController
  before_action :set_image, only: [:show, :edit, :update, :destroy]

  def index
  end

  def show
  end

  def new
  end

  def edit
  end

  def create
  end

  def destroy
  end
  def update
  end

  def destroy
  end

  private

    def set_image
      @image = Image.first
    end
end
