# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2023_12_19_162727) do

  create_table "cinematics", force: :cascade do |t|
    t.string "token"
    t.string "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "gamemasters", force: :cascade do |t|
    t.text "name"
    t.text "password"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "inventaires", force: :cascade do |t|
    t.string "objet_id"
    t.string "user_id"
    t.string "unique_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "jeus", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "objetequipes", force: :cascade do |t|
    t.text "objet_id"
    t.text "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "objets", force: :cascade do |t|
    t.text "image"
    t.text "nom"
    t.text "rarete"
    t.text "description"
    t.text "caracteristique"
    t.text "stack"
    t.text "data"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "personnages", force: :cascade do |t|
    t.string "avatar"
    t.string "avatar_unlock"
    t.string "force"
    t.string "exp_joueur"
    t.string "classe"
    t.string "sac_a_dos"
    t.string "argent"
    t.string "pv"
    t.string "vitesse"
    t.string "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "pnjs", force: :cascade do |t|
    t.text "name"
    t.text "classe"
    t.text "avatar"
    t.text "pv"
    t.text "vitesse"
    t.text "force"
    t.text "earn_xp"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "requests", force: :cascade do |t|
    t.text "question"
    t.text "reponse1"
    t.text "reponse2"
    t.text "reponse3"
    t.text "reponse4"
    t.text "bonne_reponse"
    t.text "pnj_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "statsobetsequipes", force: :cascade do |t|
    t.string "pv"
    t.string "force"
    t.string "vitesse"
    t.string "exp_joueur"
    t.string "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.text "name"
    t.text "password"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
