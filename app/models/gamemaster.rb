class Gamemaster < ApplicationRecord
    validates :name, presence: true, uniqueness: true
end
