class CreatePnjzones < ActiveRecord::Migration[5.2]
  def change
    create_table :pnjzones do |t|
      t.text :pnj_id
      t.text :zone

      t.timestamps
    end
  end
end
