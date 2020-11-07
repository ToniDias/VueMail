import { reactive } from 'vue'
import axios from 'axios'
import { localhost } from '@/utils.js'
const emails = reactive(new Set())

const updateEmail = (email) => {
  axios.put(localhost.emails + `/${email.id}`, email)
}

export const useEmailSelection = () => {
  const toggle = (email) => {
    if (emails.has(email)) {
      emails.delete(email)
    } else {
      emails.add(email)
    }
  }
  const clear = () => {
    emails.clear()
  }
  const addMultiple = (newEmails) => {
    newEmails.forEach((email) => {
      emails.add(email)
    })
  }

  const forSelected = (fn) => {
    emails.forEach((email) => {
      fn(email)
      updateEmail(email)
    })
  }
  const markRead = () => forSelected((e) => (e.read = true))
  const markUnread = () => forSelected((e) => (e.read = false))
  const archive = () => {
    forSelected((e) => (e.archived = true))
    clear()
  }
  return {
    emails,
    toggle,
    clear,
    addMultiple,
    markRead,
    markUnread,
    archive,
  }
}

export default useEmailSelection
