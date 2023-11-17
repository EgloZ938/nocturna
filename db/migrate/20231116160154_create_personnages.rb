class CreatePersonnages < ActiveRecord::Migration[5.2]
  def change
    create_table :personnages do |t|
      t.text :password_digest
      t.text :avatar
      t.text :avatar_unlock
      t.text :force
      t.text :experience
      t.text :classe
      t.text :inventaire
      t.text :sac_a_dos
      t.text :argent
      t.text :pv
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
