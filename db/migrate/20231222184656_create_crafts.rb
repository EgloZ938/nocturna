class CreateCrafts < ActiveRecord::Migration[5.2]
  def change
    create_table :crafts do |t|
      t.string :objet_id
      t.json :materials, default: {}
      t.string :quantite

      t.timestamps
    end
  end
end
