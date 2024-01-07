class CreateQuetes < ActiveRecord::Migration[5.2]
  def change
    create_table :quetes do |t|

      t.timestamps
    end
  end
end
