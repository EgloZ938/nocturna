class DropVictoirePnjs < ActiveRecord::Migration[5.2]
  def change
    drop_table :victoire_pnjs
  end
end
