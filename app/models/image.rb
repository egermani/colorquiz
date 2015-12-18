class Image < ActiveRecord::Base
  has_attached_file :img, styles: { full: "1024x800>", thumb: "100x100>" }, default_url: "/images/:style/missing.png"
  validates_attachment_content_type :img, content_type: /\Aimage\/.*\Z/
  after_save :extract_dimensions

  has_many :rounds
  has_many :spots

  def calculate_par
    if rounds.count > 0
      (rounds.map(&:avg_score).sum / rounds.count).round(2) 
    else
      "n/a"
    end
  end

  private

  # Retrieves dimensions for image assets
  # @note Do this after resize operations to account for auto-orientation.
  def extract_dimensions
    if width == nil && height == nil
      geometry = Paperclip::Geometry.from_file(img.path(:full))
      self.width, self.height = geometry.width.to_i, geometry.height.to_i
      self.save
    end
  end
end