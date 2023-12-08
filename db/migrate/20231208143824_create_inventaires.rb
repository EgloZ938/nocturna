class CreateInventaires < ActiveRecord::Migration[5.2]
  def change
    create_table :inventaires do |t|
      t.string :objet_id
      t.string :personnage_id

      t.timestamps
    end
  end
end
