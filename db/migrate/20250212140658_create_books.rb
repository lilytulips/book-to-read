class CreateBooks < ActiveRecord::Migration[8.0]
  def change
    create_table :books do |t|
      t.string :title
      t.boolean :completed

      t.timestamps
    end
  end
end
