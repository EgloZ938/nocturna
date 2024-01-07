class CreateQuetezones < ActiveRecord::Migration[5.2]
  def change
    create_table :quetezones do |t|
      t.text :quete_id
      t.text :zone

      t.timestamps
    end
  end
end
