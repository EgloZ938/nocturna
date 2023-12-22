class CreateNarrationpnjs < ActiveRecord::Migration[5.2]
  def change
    create_table :narrationpnjs do |t|
      t.string "count"
      t.string "user_id"
      
      t.timestamps
    end
  end
end
