class AddNameColumnToImages < ActiveRecord::Migration
  def change
    add_column :images, :name, :string
  end
end
