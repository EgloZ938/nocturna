class CreateObjets < ActiveRecord::Migration[5.2]
  def change
    create_table :objets do |t|
      t.text :image
      t.text :nom
      t.text :rarete
      t.text :description
      t.text :caracteristique
      t.text :stack
      t.text :data

      t.timestamps
    end
  end
end
