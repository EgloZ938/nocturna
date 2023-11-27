class CreateJeus < ActiveRecord::Migration[5.2]
  def change
    create_table :jeus do |t|

      t.timestamps
    end
  end
end
