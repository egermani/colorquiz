class AddColumnsToUser < ActiveRecord::Migration
  def change
    add_column :users, :years_active, :integer
    add_column :users, :hours_per_week, :integer
    add_column :users, :preferred_medium, :string
  end
end
