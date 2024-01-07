class CreateProgressionquetes < ActiveRecord::Migration[5.2]
  def change
    create_table :progressionquetes do |t|
      t.text :progression
      t.text :accomplie
      t.text :quete_id
      t.text :user_id

      t.timestamps
    end
  end
end
