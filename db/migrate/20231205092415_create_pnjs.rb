class CreatePnjs < ActiveRecord::Migration[5.2]
  def change
    create_table :pnjs do |t|
      t.text :name
      t.text :classe
      t.text :avatar
      t.text :pv
      t.text :vitesse
      t.text :force
      t.text :earn_xp
      t.references :request, foreign_key: true

      t.timestamps
    end
  end
end
