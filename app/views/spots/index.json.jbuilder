json.array!(@spots) do |spot|
  json.extract! spot, :id, :image_id, :color, :x, :y, :radius
  json.url spot_url(spot, format: :json)
end
