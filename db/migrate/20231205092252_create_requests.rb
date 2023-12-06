class CreateRequests < ActiveRecord::Migration[5.2]
  def change
    create_table :requests do |t|
      t.text :question
      t.text :reponse1
      t.text :reponse2
      t.text :reponse3
      t.text :reponse4
      t.text :bonne_reponse

      t.timestamps
    end
  end
end
