class CreateObjetequipes < ActiveRecord::Migration[5.2]
  def change
    create_table :objetequipes do |t|
      t.text :objet_id
      t.text :user_id
      
      t.timestamps
    end
  end
end
