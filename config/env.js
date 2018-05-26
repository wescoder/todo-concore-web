import dotenv from 'dotenv'
import path from 'path'

dotenv.config()

export const {
  APP_ID,
  APP_KEY,
  NODE_ENV,
  SERVER_PORT,
  CONCORE_ADMIN_USER,
  CONCORE_ADMIN_PASSWORD
} = process.env

export const PROJECT_PATH = path.resolve('./')

export default {
  APP_ID,
  APP_KEY,
  NODE_ENV,
  SERVER_PORT,
  CONCORE_ADMIN_USER,
  CONCORE_ADMIN_PASSWORD,
  PROJECT_PATH
}
