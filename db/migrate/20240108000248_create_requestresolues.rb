class CreateRequestresolues < ActiveRecord::Migration[5.2]
  def change
    create_table :requestresolues do |t|
      t.text :id_request
      t.text :id_user
      t.text :resolue

      t.timestamps
    end
  end
end
