class CreateGamemasters < ActiveRecord::Migration[5.2]
  def change
    create_table :gamemasters do |t|
      t.text :name
      t.text :password

      t.timestamps
    end
  end
end
