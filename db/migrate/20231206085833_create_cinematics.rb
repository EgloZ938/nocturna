class CreateCinematics < ActiveRecord::Migration[5.2]
  def change
    create_table :cinematics do |t|
      t.string :token
      t.string :user_id

      t.timestamps
    end
  end
end
