class CreateExperiences < ActiveRecord::Migration[5.2]
  def change
    create_table :experiences do |t|
      t.integer :points, default: 0
      t.text :user_id

      t.timestamps
    end
  end
end
