class CreateStatsobetsequipes < ActiveRecord::Migration[5.2]
  def change
    create_table :statsobetsequipes do |t|
      t.string "pv"
      t.string "force"
      t.string "vitesse"
      t.string "exp_joueur"
      t.string "user_id"

      t.timestamps
    end
  end
end
