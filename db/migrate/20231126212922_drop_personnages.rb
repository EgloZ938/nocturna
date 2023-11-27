class DropPersonnages < ActiveRecord::Migration[5.2]
  def change
    drop_table :personnages
  end
end
