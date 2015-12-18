# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20151218061119) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "guesses", force: :cascade do |t|
    t.integer  "spot_id"
    t.string   "color"
    t.integer  "round_id"
    t.integer  "guesser_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.float    "delta"
  end

  add_index "guesses", ["round_id"], name: "index_guesses_on_round_id", using: :btree
  add_index "guesses", ["spot_id"], name: "index_guesses_on_spot_id", using: :btree

  create_table "images", force: :cascade do |t|
    t.string   "artist"
    t.integer  "user_id"
    t.integer  "width"
    t.integer  "height"
    t.string   "path"
    t.string   "img_file_name"
    t.string   "img_content_type"
    t.integer  "img_file_size"
    t.datetime "img_updated_at"
    t.string   "name"
    t.string   "dimensions"
  end

  add_index "images", ["user_id"], name: "index_images_on_user_id", using: :btree

  create_table "rounds", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "image_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "rounds", ["image_id"], name: "index_rounds_on_image_id", using: :btree
  add_index "rounds", ["user_id"], name: "index_rounds_on_user_id", using: :btree

  create_table "spots", force: :cascade do |t|
    t.integer  "image_id"
    t.string   "color"
    t.integer  "x"
    t.integer  "y"
    t.integer  "radius"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "spots", ["image_id"], name: "index_spots_on_image_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "name"
    t.string   "email",                  default: "", null: false
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
  end

  add_foreign_key "guesses", "rounds"
  add_foreign_key "guesses", "spots"
  add_foreign_key "images", "users"
  add_foreign_key "rounds", "images"
  add_foreign_key "rounds", "users"
  add_foreign_key "spots", "images"
end
