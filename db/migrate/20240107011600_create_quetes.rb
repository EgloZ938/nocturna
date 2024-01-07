class CreateQuetes < ActiveRecord::Migration[5.2]
  def change
    create_table :quetes do |t|
      t.text :titre
      t.text :description
      t.text :recompenses
      t.text :progression
      t.text :objectif
      t.text :accomplie

      t.timestamps
    end
  end
end