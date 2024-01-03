class CreateVictoirePnjs < ActiveRecord::Migration[5.2]
  def change
    create_table :victoire_pnjs do |t|
      t.text :user_id
      t.text :pnj_id
      t.boolean :premiere_victoire

      t.timestamps
    end
  end
end
