class CreatePersonnages < ActiveRecord::Migration[5.2]
  def change
    create_table :personnages do |t|
      t.string :avatar
      t.string :avatar_unlock
      t.string :force
      t.string :exp_joueur
      t.string :classe
      t.string :sac_a_dos
      t.string :argent
      t.string :pv
      t.string :vitesse
      t.string :user_id
      
      t.timestamps
    end
  end
end
