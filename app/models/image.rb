class Image < ActiveRecord::Base
  has_attached_file :img, styles: { full: "1024>", thumb: "100x100>" }, default_url: "/images/:style/missing.png"
  validates_attachment_content_type :img, content_type: /\Aimage\/.*\Z/

  has_many :rounds
  has_many :spots
end
