class CreatePnjs < ActiveRecord::Migration[5.2]
  def change
    create_table :pnjs do |t|
      t.text :name
      t.text :avatar
      t.text :pv
      t.text :vitesse
      t.text :force
      t.text :earn_xp
      t.text :earn_money

      t.timestamps
    end
  end
end
